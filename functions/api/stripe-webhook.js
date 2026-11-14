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
    name: 'Germanisms',
    subject: 'Your Germanisms handout from The Unlock Fluency Method',
    about: 'It covers 24 common mistakes German speakers make in English, each with a short explanation of why it happens, plus exercises and a full answer key.',
  },
  'buy_btn_1TEFCf9rCOr3Bkkro9t31iGD': {
    filename: 'business-english-essentials.pdf',
    name: 'Business English Essentials',
    subject: 'Your Business English Essentials handout from The Unlock Fluency Method',
    about: 'It covers 13 key areas of business English, with exercises and a full answer key.',
  },
  'buy_btn_1TEWwy9rCOr3BkkrIUcfAeOh': {
    filename: 'english-email-essentials.pdf',
    name: 'English Email Essentials',
    subject: 'Your English Email Essentials handout from The Unlock Fluency Method',
    about: 'It shows you how to write clear, polite, and professional emails in English, with exercises and a full answer key.',
  },
};

// Escapes text from Stripe (the buyer's name) before it goes into an email
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
    ['X-Amz-Expires', '86400'],
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
  console.log('[webhook] Product:', product.name, '| File:', product.filename);

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

  const greeting = customerName ? `Hi ${esc(customerName.split(' ')[0])},` : 'Hi there,';
  const font = `font-family:'DM Sans', Arial, Helvetica, sans-serif;`;

  // Email to the buyer with the download link (new look, 14 Nov 2026)
  const customerEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>${product.name}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
  a { text-decoration: none; }
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 28px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#F7F0EC;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">Your download link is inside. It works for 24 hours.</div>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F0EC;">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px; max-width:600px;">

  <tr><td class="px" style="background-color:#221F2E; border-radius:14px 14px 0 0; padding:28px 40px 34px 40px;">
    <p style="margin:0; ${font} font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#86D2F5; font-weight:700; white-space:nowrap;"><img src="${SITE_URL}/images/logo.png" width="38" alt="" style="display:inline-block; width:38px; height:auto; vertical-align:middle; margin-right:8px; border:0;">The Unlock Fluency Method</p>
    <p style="margin:26px 0 0 0; ${font} font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#D46A76; font-weight:700;">Your handout</p>
    <h1 class="h1" style="margin:8px 0 0 0; font-family:'DM Serif Display', Georgia, 'Times New Roman', serif; font-weight:normal; font-size:34px; line-height:1.2; color:#FCF8F4;">${product.name}</h1>
  </td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:32px 40px 36px 40px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="vertical-align:top; width:84px;"><img src="${SITE_URL}/images/christina-portrait.jpg" width="68" alt="Christina" style="display:block; width:68px; height:auto; border-radius:10px;"></td>
        <td style="vertical-align:top; ${font} font-size:15px; line-height:1.65; color:#221F2E;">
          <p style="margin:0 0 10px 0;">${greeting}</p>
          <p style="margin:0 0 18px 0;">Thank you for buying ${product.name}! ${product.about}</p>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:#B23A48; border-radius:8px;"><a href="${pdfUrl}" style="text-decoration:none; display:inline-block; padding:11px 22px; ${font} font-size:14px; font-weight:700; color:#FFFFFF;">Download your handout &rarr;</a></td></tr>
          </table>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px; background-color:#FCF8F4; border-left:3px solid #B23A48; border-radius:0 8px 8px 0;">
            <tr><td style="padding:12px 16px; ${font} font-size:14px; line-height:1.6; color:#221F2E;">The link works for 24 hours. If it runs out, just reply to this email and I'll send you a new one.</td></tr>
          </table>
          <p style="margin:18px 0 10px 0;">I hope you find it useful. If you have any questions or feedback, reply to this email and it comes straight to me.</p>
          <p style="margin:0; font-family:'DM Serif Display', Georgia, serif; font-size:20px; color:#B23A48;">Christina</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td class="px" align="center" style="background-color:#221F2E; border-radius:0 0 14px 14px; padding:30px 40px; ${font}">
    <p style="margin:0 0 12px 0; font-size:13px;">
      <a href="https://www.instagram.com/theunlockfluencymethod" style="text-decoration:none; color:#86D2F5;">Instagram</a> &nbsp;&nbsp;&nbsp;
      <a href="https://www.linkedin.com/company/unlock-fluency-method" style="text-decoration:none; color:#86D2F5;">LinkedIn</a> &nbsp;&nbsp;&nbsp;
      <a href="https://www.facebook.com/share/1BYLcyoiMe/?mibextid=wwXIfr" style="text-decoration:none; color:#86D2F5;">Facebook</a> &nbsp;&nbsp;&nbsp;
      <a href="${SITE_URL}" style="text-decoration:none; color:#86D2F5;">Website</a>
    </p>
    <p style="margin:0 0 10px 0; font-size:12px; line-height:1.6; color:#A8A1B0;">&copy; ${new Date().getFullYear()} The Unlock Fluency Method Ltd. All rights reserved.</p>
    <p style="margin:0 0 10px 0; font-size:12px; line-height:1.6; color:#A8A1B0;">The Unlock Fluency Method Ltd | 182-184 High Street North, Office 14834 | East Ham, London | E6 2JA UK<br>Registered in England &amp; Wales | Company No. 16740967</p>
    <p style="margin:0; font-size:12px; line-height:1.6; color:#A8A1B0;">You're receiving this email because you bought a handout at unlockfluency.co.uk.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  // Notification email for the site owner (new look, 14 Nov 2026)
  const field = (label, value) => `<p style="margin:16px 0 2px 0; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#B23A48; font-weight:700;">${label}</p><p style="margin:0; line-height:1.5;">${value}</p>`;
  const ownerEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F7F0EC;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F0EC;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="width:100%; max-width:560px;">
  <tr><td style="background-color:#221F2E; border-radius:12px 12px 0 0; padding:22px 28px; ${font}">
    <p style="margin:0; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#86D2F5; font-weight:700;">The Unlock Fluency Method</p>
    <h1 style="margin:6px 0 0 0; font-family:'DM Serif Display', Georgia, serif; font-weight:normal; font-size:24px; color:#FCF8F4;">New sale</h1>
  </td></tr>
  <tr><td style="background-color:#FFFFFF; padding:8px 28px 22px 28px; ${font} font-size:15px; color:#221F2E;">
    ${field('Handout', product.name)}
    ${field('Buyer', customerName ? esc(customerName) : '(no name)')}
    ${field('Email', esc(customerEmail))}
    ${field('Stripe session', esc(session.id))}
  </td></tr>
  <tr><td style="background-color:#FCF8F4; border-top:1px solid #E8DFDF; border-radius:0 0 12px 12px; padding:16px 28px; ${font} font-size:13px; line-height:1.5; color:#6E6878;">The buyer has been sent their download link automatically.</td></tr>
</table>
</td></tr></table>
</body>
</html>`;

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
        subject: `New sale: ${product.name}`,
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

  console.log(`[webhook] Sale processed: ${product.name} → ${customerEmail}`);
  return new Response('OK', { status: 200 });
}
