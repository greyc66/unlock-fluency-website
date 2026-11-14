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

// Escapes text typed into the form before it goes into an email
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

    // Notification email for the site owner (new look, 14 Nov 2026)
    const field = (label, value) => `<p style="margin:16px 0 2px 0; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#B23A48; font-weight:700;">${label}</p><p style="margin:0; line-height:1.5;">${value}</p>`;
    const ownerEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F7F0EC;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F0EC;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="width:100%; max-width:560px;">
  <tr><td style="background-color:#221F2E; border-radius:12px 12px 0 0; padding:22px 28px; font-family:'DM Sans', Arial, Helvetica, sans-serif;">
    <p style="margin:0; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#86D2F5; font-weight:700;">The Unlock Fluency Method</p>
    <h1 style="margin:6px 0 0 0; font-family:'DM Serif Display', Georgia, serif; font-weight:normal; font-size:24px; color:#FCF8F4;">New newsletter subscriber</h1>
  </td></tr>
  <tr><td style="background-color:#FFFFFF; padding:8px 28px 22px 28px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:15px; color:#221F2E;">
    ${name ? field('Name', esc(name)) : ''}
    ${field('Email', esc(email))}
    ${field('Signed up', new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))}
  </td></tr>
  <tr><td style="background-color:#FCF8F4; border-top:1px solid #E8DFDF; border-radius:0 0 12px 12px; padding:16px 28px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:13px; line-height:1.5; color:#6E6878;">They've been added to your Resend audience and sent the welcome email with the free PDF.</td></tr>
</table>
</td></tr></table>
</body>
</html>`;

    // Welcome email for the subscriber, with the free PDF attached (new look, approved 14 Nov 2026).
    // Preview copy: Newsletter_html_templates/UFM_welcome_email.html in the main folder.
    const font = `font-family:'DM Sans', Arial, Helvetica, sans-serif;`;
    const subscriberEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Welcome to The Unlock Fluency Method</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
  a { text-decoration: none; }
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 28px !important; }
    .just { text-align: left !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#F7F0EC;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">Your free guide is attached, and here's what to expect from me each month.</div>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F0EC;">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px; max-width:600px;">

  <tr><td class="px" style="background-color:#221F2E; border-radius:14px 14px 0 0; padding:28px 40px 34px 40px;">
    <p style="margin:0; ${font} font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#86D2F5; font-weight:700; white-space:nowrap;"><img src="${SITE_URL}/images/logo.png" width="38" alt="" style="display:inline-block; width:38px; height:auto; vertical-align:middle; margin-right:8px; border:0;">The Unlock Fluency Method</p>
    <p style="margin:26px 0 0 0; ${font} font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#D46A76; font-weight:700;">Welcome</p>
    <h1 class="h1" style="margin:8px 0 0 0; font-family:'DM Serif Display', Georgia, 'Times New Roman', serif; font-weight:normal; font-size:34px; line-height:1.2; color:#FCF8F4;">Lovely to have you here</h1>
  </td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:32px 40px 8px 40px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="vertical-align:top; width:84px;"><img src="${SITE_URL}/images/christina-portrait.jpg" width="68" alt="Christina" style="display:block; width:68px; height:auto; border-radius:10px;"></td>
        <td style="vertical-align:top; ${font} font-size:15px; line-height:1.65; color:#221F2E;">
          <p style="margin:0 0 10px 0;">Hi there,</p>
          <p class="just" style="margin:0 0 10px 0; text-align:justify;">Thank you for signing up, I'm so glad you're here! I'm writing from Cambridge, which is a bit of a bubble: once you're in, you never leave. My newsletter is much easier to leave, but I hope you'll stay. As promised, your free guide is attached. It has the podcasts, websites, and habits I recommend to my students, and a small talk starter kit to get you chatting.</p>
          <p style="margin:0; font-family:'DM Serif Display', Georgia, serif; font-size:20px; color:#B23A48;">Christina</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:24px 40px 8px 40px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FCF8F4; border-left:3px solid #B23A48; border-radius:0 8px 8px 0;">
      <tr><td style="padding:16px 18px; ${font} font-size:14px; line-height:1.6; color:#221F2E;">
        <p style="margin:0; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#B23A48; font-weight:700;">Your free guide</p>
        <p style="margin:4px 0 4px 0; font-family:'DM Serif Display', Georgia, serif; font-size:20px; line-height:1.3;">English learning resources</p>
        <p style="margin:0;">It's attached to this email as a PDF. If you can't see it, <a href="${SITE_URL}/${PDF_FILENAME}" style="text-decoration:none; color:#B23A48; font-weight:700;">download it here</a>.</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:32px 40px 8px 40px;">
    <p style="margin:0; ${font} font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#B23A48; font-weight:700;">Every month</p>
    <h2 style="margin:6px 0 14px 0; font-family:'DM Serif Display', Georgia, serif; font-weight:normal; font-size:26px; line-height:1.25; color:#221F2E;">What to expect from me</h2>
    <p class="just" style="margin:0; ${font} font-size:15px; line-height:1.65; color:#221F2E; text-align:justify;">Once a month, I'll send you a newsletter built around one theme, with a TED talk to watch, a podcast episode to listen to, and a UK accent to try, each with a few questions to get you talking. You'll also hear about my courses and offers. I only write when I have something useful to share! &#x1F60A;</p>
  </td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:28px 40px 0 40px;"><div style="border-top:1px solid #E8DFDF; font-size:0; line-height:0;">&nbsp;</div></td></tr>

  <tr><td class="px" style="background-color:#FFFFFF; padding:28px 40px 36px 40px;">
    <p class="just" style="margin:0 0 18px 0; ${font} font-size:15px; line-height:1.65; color:#221F2E; text-align:justify;">If you have any questions, or you'd like to know which course would suit you best, just reply to this email. It comes straight to me. And if you'd like something smaller every week (a word or an idiom, and the story behind it), join my WhatsApp community too.</p>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr><td style="background-color:#B23A48; border-radius:8px;"><a href="${SITE_URL}/courses" style="text-decoration:none; display:inline-block; padding:11px 22px; ${font} font-size:14px; font-weight:700; color:#FFFFFF;">See my courses &rarr;</a></td></tr>
    </table>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      <tr><td style="border:2px solid #B23A48; border-radius:8px;"><a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" style="text-decoration:none; display:inline-block; padding:9px 20px; ${font} font-size:14px; font-weight:700; color:#B23A48;">Join on WhatsApp &rarr;</a></td></tr>
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
    <p style="margin:0; font-size:12px; line-height:1.6; color:#A8A1B0;">You're receiving this email because you signed up at unlockfluency.co.uk. <a href="${unsubscribeUrl}" style="text-decoration:none; color:#86D2F5;">Unsubscribe</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    // Send both emails in parallel (exactly 2 requests — within Resend's 2 req/sec limit)
    const [ownerResult, subscriberResult] = await Promise.all([
      // 1. Notify the site owner
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'The Unlock Fluency Method <noreply@unlockfluency.co.uk>',
          to: env.CONTACT_EMAIL || 'contact@unlockfluency.co.uk',
          reply_to: email,
          subject: 'New newsletter subscription',
          html: ownerEmailHtml
        })
      }),

      // 2. Confirmation email to the subscriber with PDF attached
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Dr Christina Grey <contact@unlockfluency.co.uk>',
          to: email,
          subject: 'Welcome! Your free English learning resources',
          html: subscriberEmailHtml,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:contact@unlockfluency.co.uk?subject=Unsubscribe>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
          },
          attachments: [
            { filename: PDF_DISPLAY_NAME, path: `${SITE_URL}/${PDF_FILENAME}` }
          ]
        })
      })
    ]);

    // Check both responses
    if (!ownerResult.ok || !subscriberResult.ok) {
      const ownerError = !ownerResult.ok ? await ownerResult.text() : null;
      const subscriberError = !subscriberResult.ok ? await subscriberResult.text() : null;
      console.error('Resend API errors:', { ownerError, subscriberError });

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to process subscription. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add contact to Resend Audience in the background (after response is sent)
    // so it doesn't count against the rate limit or slow down the response
    context.waitUntil(
      new Promise(resolve => setTimeout(resolve, 1500)).then(() =>
        fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
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
        })
      ).catch(err => console.error('Resend Audience error:', err))
    );

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
