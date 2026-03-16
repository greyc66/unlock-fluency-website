/**
 * Cloudflare Pages Function for Retreat Registration Form Submissions
 * Handles retreat registration submissions and sends emails via Resend
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Parse the incoming form data
    const formData = await request.json();

    // Validate required fields
    const { 
      name, 
      email, 
      country, 
      phone,
      profession, 
      english_level, 
      motivation,
      dietary_requirements,
      dietary_other,
      agreement
    } = formData;

    // Phone is now required
    if (!name || !email || !country || !phone || !profession || !english_level || !motivation || !dietary_requirements) {
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

    if (!agreement) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'You must agree to the deposit terms'
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

    // If dietary requirement is "Other" make sure dietary_other is provided
    if (dietary_requirements === 'Other (please specify)' && !dietary_other) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please specify your dietary requirements'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Determine final dietary requirements text
    const finalDietaryRequirements = dietary_requirements === 'Other (please specify)' 
      ? dietary_other 
      : dietary_requirements;

    // Build email content
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1f2937; }
    .value { margin-top: 5px; color: #4b5563; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px; }
    .highlight { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🌟 New Summer Retreat Registration</h2>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Personal Details</div>
        
        <div class="field">
          <div class="label">Full Name:</div>
          <div class="value">${name}</div>
        </div>

        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${email}</div>
        </div>

        <div class="field">
          <div class="label">Country of Residence:</div>
          <div class="value">${country}</div>
        </div>

        <div class="field">
          <div class="label">Phone Number:</div>
          <div class="value">${phone}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Professional Background</div>
        
        <div class="field">
          <div class="label">Current Profession / Industry:</div>
          <div class="value">${profession}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">English Level</div>
        
        <div class="field">
          <div class="label">Current English Level:</div>
          <div class="value">${english_level}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Motivation</div>
        
        <div class="field">
          <div class="label">What would you most like to improve about your spoken English?</div>
          <div class="value">${motivation.replace(/\n/g, '<br>')}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Dietary Requirements</div>
        
        <div class="field">
          <div class="value">${finalDietaryRequirements}</div>
        </div>
      </div>

      <div class="highlight">
        <strong>✓ Deposit Agreement:</strong><br>
        The applicant understands that a non-refundable 50% deposit (£750) is required to secure their place once accepted.
      </div>
    </div>

    <div class="footer">
      <p>This registration was submitted from The Unlock Fluency Method website.</p>
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
        subject: `Summer Retreat Registration: ${name}`,
        html: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send registration. Please try again later.'
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
        message: 'Your registration has been submitted successfully!',
        id: resendData.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Retreat registration error:', error);

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
