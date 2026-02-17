/**
 * Cloudflare Pages Function for Newsletter Subscriptions
 * Handles newsletter signup submissions and sends emails via Resend:
 *   1. Adds subscriber to Resend Audience (for list management and unsubscribes)
 *   2. Notification email to the site owner
 *   3. Confirmation email to the subscriber with PDF learning resources attached
 *
 * Required environment variables:
 *   RESEND_API_KEY       - Resend API key
 *   RESEND_AUDIENCE_ID   - Resend Audience ID (from Resend dashboard → Audiences)
 *   UNSUBSCRIBE_SECRET   - A long random string used to sign unsubscribe tokens
 *   CONTACT_EMAIL        - (optional) override for the owner notification recipient
 */

const PDF_FILENAME = 'learning_resources.pdf';
const PDF_DISPLAY_NAME = 'Unlock Fluency Learning Resources.pdf';
const SITE_URL = 'https://www.unlockfluency.co.uk';

// Generate an HMAC-SHA256 token for a given email — used in unsubscribe links
async function generateUnsubscribeToken(email, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(email));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Parse the incoming form data
    const formData = await request.json();
    const { email, name } = formData;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email address is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a signed unsubscribe URL for this subscriber
    const unsubscribeToken = await generateUnsubscribeToken(email, env.UNSUBSCRIBE_SECRET);
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

    // Build notification email for site owner
    const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1f2937; }
    .value { margin-top: 5px; color: #4b5563; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h2>New Newsletter Subscription</h2></div>
    <div class="content">
      ${name ? `<div class="field"><div class="label">Name:</div><div class="value">${name}</div></div>` : ''}
      <div class="field"><div class="label">Email:</div><div class="value">${email}</div></div>
      <div class="field"><div class="label">Subscription Date:</div><div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</div></div>
    </div>
    <div class="footer">
      <p>This subscriber has been added to your Resend Audience. A confirmation email with the learning resources PDF has been sent to them automatically.</p>
    </div>
  </div>
</body>
</html>
`;

    // Build confirmation email for the subscriber (includes unsubscribe link)
    const subscriberEmailHtml = `
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
    .highlight-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0; }
    .highlight-box p { margin: 0; color: #0c4a6e; font-weight: 500; }
    .footer { background-color: #1f2937; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; }
    .footer p { color: #9ca3af; font-size: 13px; margin: 4px 0; }
    .footer a { color: #38bdf8; text-decoration: none; }
    .social-links { margin: 16px 0 8px; }
    .social-links a { color: #9ca3af; text-decoration: none; margin: 0 8px; font-size: 13px; }
    .unsubscribe { margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151; }
    .unsubscribe a { color: #6b7280; font-size: 12px; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to The Unlock Fluency Method!</h1>
      <p>Thank you for subscribing</p>
    </div>

    <div class="content">
      <p>Hi${name ? ` ${name}` : ''},</p>

      <p>Thank you for joining The Unlock Fluency Method community! I'm so glad you're here.</p>

      <p>As promised, I've attached your free <strong>Learning Resources</strong> guide to this email. I've included a number of practical tips and resources to start building your English fluency right away.</p>

      <div class="highlight-box">
        <p>📎 Your free learning resources guide is attached to this email.</p>
      </div>

      <p>Going forward, you'll receive monthly exclusive English learning resources and course updates delivered to your inbox. I only send emails when I have something genuinely useful to share.</p>

      <p>In the meantime, feel free to explore:</p>
      <ul style="color: #374151; padding-left: 20px; margin: 0 0 24px;">
        <li style="margin-bottom: 8px;"><a href="${SITE_URL}/themethod" style="color: #0ea5e9;">The Unlock Fluency Method</a> — learn how my method works</li>
        <li style="margin-bottom: 8px;"><a href="${SITE_URL}/courses" style="color: #0ea5e9;">Upcoming Courses</a> — find the right course for your level and schedule</li>
        <li style="margin-bottom: 8px;"><a href="${SITE_URL}/testimonials" style="color: #0ea5e9;">Success Stories</a> — hear from students who've transformed their English</li>
      </ul>

      <p>If you have any questions or want to find out which course is right for you, just reply to this email — I'd love to hear from you.</p>

      <p>Best,<br><strong>Dr Christina Grey</strong><br>The Unlock Fluency Method</p>
    </div>

    <div class="footer">
      <div class="social-links">
        <a href="https://www.facebook.com/share/1BYLcyoiMe/?mibextid=wwXIfr">Facebook</a>
        <a href="https://www.instagram.com/theunlockfluencymethod">Instagram</a>
      </div>
      <p><a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a></p>
      <p style="margin-top: 12px;">© ${new Date().getFullYear()} The Unlock Fluency Method Ltd. Registered in England &amp; Wales.</p>
      <p>You received this email because you signed up at unlockfluency.co.uk.</p>
      <div class="unsubscribe">
        <a href="${unsubscribeUrl}">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

    // Send all three Resend requests sequentially to stay within the
    // 2 requests-per-second rate limit (parallel requests were triggering 429s)

    // 1. Add contact to Resend Audience
    const audienceResult = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        email,
        ...(name && { first_name: name }),
        unsubscribed: false
      })
    });

    if (!audienceResult.ok) {
      console.error('Resend Audience error:', await audienceResult.text());
    }

    // 2. Notify the site owner
    const ownerResult = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'The Unlock Fluency Method <noreply@unlockfluency.co.uk>',
        to: env.CONTACT_EMAIL || 'contact@unlockfluency.co.uk',
        reply_to: email,
        subject: 'New Newsletter Subscription',
        html: ownerEmailHtml
      })
    });

    if (!ownerResult.ok) {
      console.error('Resend owner email error:', await ownerResult.text());
    }

    // 3. Confirmation email to the subscriber with PDF attached
    const subscriberResult = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Dr Christina Grey <contact@unlockfluency.co.uk>',
        to: email,
        subject: 'Welcome! Here are your free learning resources 🎉',
        html: subscriberEmailHtml,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:contact@unlockfluency.co.uk?subject=Unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        },
        attachments: [
          { filename: PDF_DISPLAY_NAME, path: `${SITE_URL}/${PDF_FILENAME}` }
        ]
      })
    });

    if (!subscriberResult.ok) {
      const subscriberError = await subscriberResult.text();
      console.error('Resend subscriber email error:', subscriberError);

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to process subscription. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for subscribing! Check your inbox for your free learning resources.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
