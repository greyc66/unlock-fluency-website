/**
 * Cloudflare Pages Function — Stripe Webhook Handler
 * Listens for successful Stripe payments and automatically emails the buyer their PDF
 *
 * Required environment variables:
 *   STRIPE_WEBHOOK_SECRET  - whsec_... signing secret from Stripe webhook dashboard
 *   R2_ACCESS_KEY_ID       - R2 API token access key ID
 *   R2_SECRET_ACCESS_KEY   - R2 API token secret access key
 *   R2_ENDPOINT            - https://<accountid>.r2.cloudflarestorage.com
 *   RESEND_API_KEY         - Resend API key
 */

const SITE_URL = 'https://www.unlockfluency.co.uk';
const R2_BUCKET = 'handouts';

// Map of Stripe buy-button IDs → R2 file details and email content
const PRODUCTS = {
  'buy_btn_1TEDqS9rCOr3Bkkr2VWFDHhm': {
    filename: 'germanisms.pdf',
    subject: 'Your Germanisms Handout — The Unlock Fluency Method',
    title: 'Your Germanisms Handout',
    description: 'Thank you for your purchase! Your <strong>Germanisms</strong> handout is attached below. It covers 20 common mistakes German speakers make in English, with psycholinguistic explanations, exercises, and a full answer key.',
  },
  'buy_btn_1TEFCf9rCOr3Bkkro9t31iGD': {
    filename: 'business-english-essentials.pdf',
    subject: 'Your Business English Essentials Handout — The Unlock Fluency Method',
    title: 'Your Business English Essentials Handout',
    description: 'Thank you for your purchase! Your <strong>Business English Essentials</strong> handout is attached below. It covers 13 key business English areas with exercises and a full answer key.',
  },
};

// ── AWS Sig V4 — generates a temporary signed URL to access the private R2 file ──

async function generatePresignedUrl(endpoint, bucket, key, accessKeyId, secretAccessKey) {
  const region = 'auto';
  const service = 's3';
  const now = new Date();
  const encoder = new TextEncoder();

  const dateStr = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const dateShort = dateStr.slice(0, 8);
  const host = new URL(endpoint).hostname;
  const path = `/${bucket}/${key}`;
  const credentialScope = `${dateShort}/${region}/${service}/aws4_request`;

  const params = new URLSearchParams([
    ['X-Amz-Algorithm', 'AWS4-HMAC-SHA256'],
    ['X-Amz-Credential', `${accessKeyId}/${credentialScope}`],
    ['X-Amz-Date', dateStr],
    ['X-Amz-Expires', '3600'],
    ['X-Amz-SignedHeaders', 'host'],
  ]);

  const canonicalRequest = [
    'GET', path, params.toString(),
    `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD',
  ].join('\n');

  const sha256 = async (data) => {
    const buf = await crypto.subtle.digest('SHA-256', encoder.encode(data));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const hmac = async (key, data) => {
    const k = key instanceof Uint8Array ? key : encoder.encode(key);
    const cryptoKey = await crypto.subtle.importKey(
      'raw', k, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    return new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data)));
  };

  const stringToSign = ['AWS4-HMAC-SHA256', dateStr, credentialScope, await sha256(canonicalRequest)].join('\n');

  const kDate = await hmac(`AWS4${secretAccessKey}`, dateShort);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, 'aws4_request');
  const sigBytes = await hmac(kSigning, stringToSign);
  const signature = Array.from(sigBytes).map(b => b.toString(16).padStart(2, '0')).join('');

  params.set('X-Amz-Signature', signature);
  return `${endpoint}/${bucket}/${key}?${params.toString()}`;
}

// ── Stripe webhook signature verification ────────────────────────────────────

async function verifyStripeSignature(payload, sigHeader, secret) {
  const encoder = new TextEncoder();
  const parts = sigHeader.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).slice(2);
  const expectedSig = parts.find(p => p.startsWith('v1=')).slice(3);

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    throw new Error('Webhook timestamp too old — possible replay attack');
  }

  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${payload}`));
  const actualSig = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');

  if (actualSig !== expectedSig) {
    throw new Error('Invalid Stripe signature');
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.text();
  } catch (err) {
    console.error('[webhook] Failed to read request body:', err);
    return new Response('Bad request', { status: 400 });
  }

  const stripeSignature = request.headers.get('stripe-signature');
  console.log('[webhook] Received. Has stripe-signature:', !!stripeSignature);

  if (!stripeSignature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  try {
    await verifyStripeSignature(payload, stripeSignature, env.STRIPE_WEBHOOK_SECRET);
    console.log('[webhook] Signature verified OK');
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err.message);
    return new Response(`Webhook verification failed: ${err.message}`, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (err) {
    console.error('[webhook] Failed to parse payload JSON:', err);
    return new Response('Invalid JSON', { status: 400 });
  }

  console.log('[webhook] Event type:', event.type);

  // Only act on completed checkouts
  if (event.type !== 'checkout.session.completed') {
    console.log('[webhook] Ignoring event type:', event.type);
    return new Response('OK', { status: 200 });
  }

  const session = event.data.object;
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || '';

  console.log('[webhook] Customer email:', customerEmail);
  console.log('[webhook] Session ID:', session.id);

  if (!customerEmail) {
    console.error('[webhook] No customer email in session:', session.id);
    return new Response('No customer email found', { status: 400 });
  }

  const buyButtonId = session.metadata?.buy_button_id || 'buy_btn_1TEDqS9rCOr3Bkkr2VWFDHhm';
  const product = PRODUCTS[buyButtonId] || PRODUCTS['buy_btn_1TEDqS9rCOr3Bkkr2VWFDHhm'];
  console.log('[webhook] Product:', product.title, '| File:', product.filename);

  // Generate a 1-hour temporary download link from R2
  let pdfUrl;
  try {
    pdfUrl = await generatePresignedUrl(
      env.R2_ENDPOINT, R2_BUCKET, product.filename,
      env.R2_ACCESS_KEY_ID, env.R2_SECRET_ACCESS_KEY
    );
    console.log('[webhook] Presigned URL generated OK');
  } catch (err) {
    console.error('[webhook] Failed to generate R2 presigned URL:', err);
    return new Response('Failed to generate download link', { status: 500 });
  }

  const greeting = customerName ? `Hi ${customerName.split(' ')[0]},` : 'Hi,';

  const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0c4a6e; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header p { color: #bae6fd; margin: 8px 0 0; font-size: 15px; }
    .content { background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
    .content p { color: #374151; margin: 0 0 16px; }
    .btn { display: inline-block; background-color: #0ea5e9; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 8px 0 24px; }
    .note { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0; font-size: 14px; color: #0c4a6e; }
    .footer { background-color: #1f2937; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; }
    .footer p { color: #9ca3af; font-size: 13px; margin: 4px 0; }
    .footer a { color: #38bdf8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${product.title}</h1>
      <p>The Unlock Fluency Method</p>
    </div>
    <div class="content">
      <p>${greeting}</p>
      <p>${product.description}</p>
      <p>Click the button below to download your handout:</p>
      <p style="text-align: center;">
        <a href="${pdfUrl}" class="btn">Download Your Handout</a>
      </p>
      <div class="note">
        <strong>Note:</strong> This download link is valid for 1 hour. If it expires, simply reply to this email and I'll send you a fresh one.
      </div>
      <p>I hope you find it genuinely useful. If you have any questions or feedback, just reply to this email — I'd love to hear from you.</p>
      <p>Best,<br><strong>Dr Christina Grey</strong><br>The Unlock Fluency Method</p>
    </div>
    <div class="footer">
      <p><a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a></p>
      <p style="margin-top: 12px;">© ${new Date().getFullYear()} The Unlock Fluency Method Ltd. Registered in England &amp; Wales.</p>
    </div>
  </div>
</body>
</html>
`;

  const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #0c4a6e;">New Sale 🎉</h2>
    <p><strong>Product:</strong> ${product.title}</p>
    <p><strong>Buyer:</strong> ${customerName || '(no name)'}</p>
    <p><strong>Email:</strong> ${customerEmail}</p>
    <p><strong>Session ID:</strong> ${session.id}</p>
    <p style="color: #6b7280; font-size: 13px;">A download link has been automatically sent to the buyer.</p>
  </div>
</body>
</html>
`;

  console.log('[webhook] Sending emails via Resend. API key set:', !!env.RESEND_API_KEY);

  // Send both emails in parallel
  const [customerRes, ownerRes] = await Promise.all([
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'Dr Christina Grey <contact@unlockfluency.co.uk>',
        to: customerEmail,
        subject: product.subject,
        html: customerEmailHtml,
      })
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'The Unlock Fluency Method <noreply@unlockfluency.co.uk>',
        to: env.CONTACT_EMAIL || 'contact@unlockfluency.co.uk',
        subject: `New Sale: ${product.title}`,
        html: ownerEmailHtml,
      })
    })
  ]);

  console.log('[webhook] Customer email response status:', customerRes.status);
  console.log('[webhook] Owner email response status:', ownerRes.status);

  if (!customerRes.ok) {
    const err = await customerRes.text();
    console.error('[webhook] Failed to send customer email:', err);
    return new Response('Failed to send email to customer', { status: 500 });
  }

  console.log(`[webhook] Sale processed: ${product.title} → ${customerEmail}`);
  return new Response('OK', { status: 200 });
}
