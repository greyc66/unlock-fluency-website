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
    const { name, email, enquiry_type, message, current_english_level, course_level } = formData;

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

    if (enquiry_type === 'Unlock Fluency for Organisations' && !course_level) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Course level is required for organisation enquiries'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Build email content
    let emailBody = `
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
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Enquiry Type:</div>
        <div class="value">${enquiry_type}</div>
      </div>

      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>

      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>
`;

    if (enquiry_type === '1-to-1 Personalised Coaching' && current_english_level) {
      emailBody += `
      <div class="field">
        <div class="label">Current English Level:</div>
        <div class="value">${current_english_level}</div>
      </div>
`;
    }

    if (enquiry_type === 'Unlock Fluency for Organisations' && course_level) {
      emailBody += `
      <div class="field">
        <div class="label">Required Course Level:</div>
        <div class="value">${course_level}</div>
      </div>
`;
    }

    emailBody += `
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>

    <div class="footer">
      <p>This email was sent from your website contact form.</p>
      <p>Reply directly to this email to respond to ${name}.</p>
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
        subject: `Contact Form: ${enquiry_type}`,
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
