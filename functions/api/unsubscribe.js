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

const successHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribed – The Unlock Fluency Method</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #111827; color: #d1d5db; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; }
    .icon { width: 64px; height: 64px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; }
    h1 { color: #ffffff; font-size: 22px; margin-bottom: 16px; }
    p { color: #9ca3af; line-height: 1.6; margin-bottom: 12px; }
    a { color: #38bdf8; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>You've been unsubscribed</h1>
    <p>You've been successfully removed from The Unlock Fluency Method newsletter.</p>
    <p>Changed your mind? <a href="https://www.unlockfluency.co.uk">Visit the website</a> to sign up again.</p>
  </div>
</body>
</html>`;

function errorHtml(message) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Error – The Unlock Fluency Method</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #111827; color: #d1d5db; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; }
    h1 { color: #ffffff; font-size: 22px; margin-bottom: 16px; }
    p { color: #9ca3af; line-height: 1.6; margin-bottom: 12px; }
    a { color: #38bdf8; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Something went wrong</h1>
    <p>${message}</p>
    <p>Please <a href="mailto:contact@unlockfluency.co.uk">email us directly</a> to be removed from the list.</p>
  </div>
</body>
</html>`;
}

async function handleUnsubscribe(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !token) {
    return new Response(errorHtml('This unsubscribe link is incomplete. Please use the link from your email.'), {
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
    return new Response(errorHtml('This unsubscribe link is invalid or has already been used.'), {
      status: 403,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Mark as unsubscribed in Resend Audience
  const success = await markUnsubscribed(email, env.RESEND_AUDIENCE_ID, env.RESEND_API_KEY);

  if (!success) {
    return new Response(errorHtml('We were unable to process your request. Please try again or contact us directly.'), {
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
