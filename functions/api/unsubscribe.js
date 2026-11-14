/**
 * Cloudflare Pages Function for Newsletter Unsubscription
 * Handles both browser clicks (GET) and one-click unsubscribe from email clients (POST).
 *
 * Required environment variables:
 *   RESEND_API_KEY       - Resend API key
 *   RESEND_AUDIENCE_ID   - Resend Audience ID
 *   UNSUBSCRIBE_SECRET   - Secret used to sign/verify unsubscribe tokens
 */

async function verifyToken(email, token, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const tokenBytes = new Uint8Array(
    token.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  );
  return crypto.subtle.verify('HMAC', key, tokenBytes, encoder.encode(email));
}

async function markUnsubscribed(email, audienceId, apiKey) {
  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ email, unsubscribed: true })
  });
  return response.ok;
}

// The page people see after unsubscribing (website look, 14 Nov 2026)
function page(title, heading, body) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${title} | The Unlock Fluency Method</title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=DM+Serif+Display&display=swap">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', Arial, Helvetica, sans-serif; background: #FCF8F4; color: #221F2E; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px 16px; }
    .card { background: #FFFFFF; border: 1px solid #E8DFDF; border-radius: 16px; padding: 40px 32px; max-width: 480px; width: 100%; text-align: center; }
    .brand { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; color: #221F2E; margin-bottom: 28px; }
    .brand img { width: 34px; height: auto; }
    h1 { font-family: 'DM Serif Display', Georgia, serif; font-weight: normal; font-size: 30px; line-height: 1.2; margin-bottom: 16px; }
    p { font-size: 16px; line-height: 1.6; color: #46425A; margin-bottom: 12px; }
    a { color: #B23A48; font-weight: 700; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main class="card">
    <a class="brand" href="https://www.unlockfluency.co.uk" style="color:#221F2E;"><img src="/images/logo.png" alt="">The Unlock Fluency Method</a>
    <h1>${heading}</h1>
    ${body}
  </main>
</body>
</html>`;
}

const successHtml = page(
  'Unsubscribed',
  "You've been unsubscribed",
  `<p>You won't get my newsletter any more. Thank you for reading it!</p>
    <p>If you change your mind, you can sign up again on my <a href="https://www.unlockfluency.co.uk/newsletter">newsletter page</a>.</p>`
);

function errorHtml(message) {
  return page(
    'Something went wrong',
    'Something went wrong',
    `<p>${message}</p>
    <p>Please <a href="mailto:contact@unlockfluency.co.uk">email me</a> and I'll take you off the list myself.</p>`
  );
}

async function handleUnsubscribe(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !token) {
    return new Response(errorHtml('This unsubscribe link is incomplete. Please use the link in your email.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Verify the HMAC token to ensure the link is legitimate
  let isValid = false;
  try {
    isValid = await verifyToken(email, token, env.UNSUBSCRIBE_SECRET);
  } catch {
    isValid = false;
  }

  if (!isValid) {
    return new Response(errorHtml("This unsubscribe link isn't valid."), {
      status: 403,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Mark as unsubscribed in Resend Audience
  const success = await markUnsubscribed(email, env.RESEND_AUDIENCE_ID, env.RESEND_API_KEY);

  if (!success) {
    return new Response(errorHtml("I couldn't process your request just now. Please try again in a few minutes."), {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response(successHtml, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}

// GET: user clicks unsubscribe link in their email client
export const onRequestGet = handleUnsubscribe;

// POST: one-click unsubscribe triggered automatically by email clients (Gmail, Apple Mail)
export const onRequestPost = handleUnsubscribe;
