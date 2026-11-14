/**
 * Cloudflare Pages Function for Contact Form Submissions
 * Handles contact form submissions and sends emails via Resend
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Parse the incoming form data
    const formData = await request.json();

    // Validate required fields
    const { name, email, enquiry_type, message, current_english_level, organisation, team_size } = formData;

    if (!name || !email || !enquiry_type || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Additional validation for specific enquiry types
    if (enquiry_type === '1-to-1 Personalised Coaching' && !current_english_level) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Current English level is required for coaching enquiries'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (enquiry_type === 'Unlock Fluency for Business' && (!organisation || !team_size)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Organisation and number of participants are required for business enquiries'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Notification email for the site owner (new look, 14 Nov 2026)
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const font = `font-family:'DM Sans', Arial, Helvetica, sans-serif;`;
    const field = (label, value) => `<p style="margin:16px 0 2px 0; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#B23A48; font-weight:700;">${label}</p><p style="margin:0; line-height:1.5;">${value}</p>`;
    const notification = (heading, fields, note) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#F7F0EC;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F0EC;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="width:100%; max-width:560px;">
  <tr><td style="background-color:#221F2E; border-radius:12px 12px 0 0; padding:22px 28px; ${font}">
    <p style="margin:0; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#86D2F5; font-weight:700;">The Unlock Fluency Method</p>
    <h1 style="margin:6px 0 0 0; font-family:'DM Serif Display', Georgia, serif; font-weight:normal; font-size:24px; color:#FCF8F4;">${heading}</h1>
  </td></tr>
  <tr><td style="background-color:#FFFFFF; padding:8px 28px 22px 28px; ${font} font-size:15px; color:#221F2E;">
    ${fields}
  </td></tr>
  <tr><td style="background-color:#FCF8F4; border-top:1px solid #E8DFDF; border-radius:0 0 12px 12px; padding:16px 28px; ${font} font-size:13px; line-height:1.5; color:#6E6878;">${note}</td></tr>
</table>
</td></tr></table>
</body>
</html>`;

    let fields = field('Enquiry', esc(enquiry_type)) + field('Name', esc(name)) + field('Email', esc(email));
    if (enquiry_type === '1-to-1 Personalised Coaching' && current_english_level) {
      fields += field('Current English level', esc(current_english_level));
    }
    if (enquiry_type === 'Unlock Fluency for Business') {
      fields += field('Company or organisation', esc(organisation)) + field('Number of participants', esc(team_size));
    }
    fields += field('Message', esc(message).replace(/\n/g, '<br>'));
    const emailBody = notification('New message from the contact form', fields, `Sent from your website's contact form. Reply to this email to answer ${esc(name)}.`);

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'The Unlock Fluency Method <noreply@unlockfluency.co.uk>',
        to: env.CONTACT_EMAIL || 'contact@unlockfluency.co.uk',
        reply_to: email,
        subject: `Contact form: ${enquiry_type}`,
        html: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again later.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const resendData = await resendResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully!',
        id: resendData.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
