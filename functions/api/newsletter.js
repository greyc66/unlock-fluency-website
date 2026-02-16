/**
 * Cloudflare Pages Function for Newsletter Subscriptions
 * Handles newsletter signup submissions and sends emails via Resend:
 *   1. Notification email to the site owner
 *   2. Confirmation email to the subscriber with PDF learning resources attached
 */

const PDF_FILENAME = 'learning_resources.pdf';
const PDF_DISPLAY_NAME = 'Unlock Fluency Learning Resources.pdf';

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

    // Fetch the PDF from the site's own public folder and encode as base64
    const siteOrigin = new URL(request.url).origin;
    const pdfResponse = await fetch(`${siteOrigin}/${PDF_FILENAME}`);

    if (!pdfResponse.ok) {
      console.error(`Failed to fetch PDF: ${pdfResponse.status} ${pdfResponse.statusText}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to prepare your resources. Please try again later.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const pdfArrayBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = btoa(
      String.fromCharCode(...new Uint8Array(pdfArrayBuffer))
    );

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
      <p>A confirmation email with the learning resources PDF has been sent to the subscriber automatically.</p>
    </div>
  </div>
</body>
</html>
`;

    // Build confirmation email for the subscriber
    const subscriberEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0c4a6e; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header img { width: 60px; height: 60px; margin-bottom: 16px; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header p { color: #bae6fd; margin: 8px 0 0; font-size: 15px; }
    .content { background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
    .content p { color: #374151; margin: 0 0 16px; }
    .highlight-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0; }
    .highlight-box p { margin: 0; color: #0c4a6e; font-weight: 500; }
    .cta-button { display: inline-block; background-color: #0ea5e9; color: white !important; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: bold; font-size: 15px; margin: 8px 0; }
    .footer { background-color: #1f2937; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; }
    .footer p { color: #9ca3af; font-size: 13px; margin: 4px 0; }
    .footer a { color: #38bdf8; text-decoration: none; }
    .social-links { margin: 16px 0 8px; }
    .social-links a { color: #9ca3af; text-decoration: none; margin: 0 8px; font-size: 13px; }
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
        <li style="margin-bottom: 8px;"><a href="https://www.unlockfluency.co.uk/themethod" style="color: #0ea5e9;">The Unlock Fluency Method</a> — learn how my method works</li>
        <li style="margin-bottom: 8px;"><a href="https://www.unlockfluency.co.uk/courses" style="color: #0ea5e9;">Upcoming Courses</a> — find the right course for your level and schedule</li>
        <li style="margin-bottom: 8px;"><a href="https://www.unlockfluency.co.uk/testimonials" style="color: #0ea5e9;">Success Stories</a> — hear from students who've transformed their English</li>
      </ul>

      <p>If you have any questions or want to find out which course is right for you, just reply to this email — I'd love to hear from you.</p>

      <p>Best,<br><strong>Dr Christina Grey</strong><br>The Unlock Fluency Method</p>
    </div>

    <div class="footer">
      <div class="social-links">
        <a href="https://www.facebook.com/share/1BYLcyoiMe/?mibextid=wwXIfr">Facebook</a>
        <a href="https://www.instagram.com/theunlockfluencymethod">Instagram</a>
      </div>
      <p><a href="https://www.unlockfluency.co.uk">www.unlockfluency.co.uk</a></p>
      <p style="margin-top: 12px;">© ${new Date().getFullYear()} The Unlock Fluency Method Ltd. Registered in England &amp; Wales.</p>
      <p>You received this email because you signed up at unlockfluency.co.uk.</p>
    </div>
  </div>
</body>
</html>
`;

    // Send both emails in parallel
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
          subject: 'New Newsletter Subscription',
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
          subject: 'Welcome! Here are your free learning resources 🎉',
          html: subscriberEmailHtml,
          attachments: [
            {
              filename: PDF_DISPLAY_NAME,
              content: pdfBase64
            }
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

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for subscribing! Check your inbox for your free learning resources.'
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
