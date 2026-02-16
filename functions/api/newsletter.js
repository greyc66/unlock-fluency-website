/**
 * Cloudflare Pages Function for Newsletter Subscriptions
 * Handles newsletter signup submissions and sends emails via Resend
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Parse the incoming form data
    const formData = await request.json();

    // Validate required fields
    const { email, name } = formData;

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email address is required'
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

    // Build email content for notification
    const emailBody = `
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
    <div class="header">
      <h2>New Newsletter Subscription</h2>
    </div>
    <div class="content">
      ${name ? `
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>

      <div class="field">
        <div class="label">Subscription Date:</div>
        <div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</div>
      </div>
    </div>

    <div class="footer">
      <p>This subscriber should be added to your newsletter mailing list.</p>
    </div>
  </div>
</body>
</html>
`;

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
        subject: 'New Newsletter Subscription',
        html: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to process subscription. Please try again later.'
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
        message: 'Thank you for subscribing to our newsletter!',
        id: resendData.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);

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
