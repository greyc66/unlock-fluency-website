# Setup Instructions for Form Submissions

This project uses **Cloudflare Pages Functions** with **Resend** for handling form submissions.

## Prerequisites

1. A Cloudflare Pages account (free)
2. A Resend account (free tier: 3,000 emails/month)
3. A verified domain or email with Resend

## Setup Steps

### 1. Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Create a free account
3. Verify your email address

### 2. Verify Your Domain or Email

**Option A: Verify Domain (Recommended for production)**
1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Add `unlockfluency.co.uk`
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

**Option B: Verify Email (Quick testing)**
1. Go to **Domains** in Resend dashboard
2. Use the default sandbox domain for testing
3. Only allows sending to verified email addresses

### 3. Get Your API Key

1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Unlock Fluency Production")
4. Select **Full Access** permissions
5. Copy the API key (starts with `re_`)
6. **Important:** Save this key securely - you won't be able to see it again!

### 4. Configure Cloudflare Pages

1. Go to your Cloudflare dashboard
2. Navigate to **Pages** → Your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   **For Production:**
   - Variable name: `RESEND_API_KEY`
   - Value: `re_your_actual_api_key_here`
   - Environment: **Production**

   - Variable name: `CONTACT_EMAIL`
   - Value: `contact@unlockfluency.co.uk`
   - Environment: **Production**

   **For Preview (optional but recommended):**
   - Add the same variables for **Preview** environment
   - You can use a different email for testing (e.g., `test@unlockfluency.co.uk`)

5. Click **Save**

### 5. Deploy Your Site

1. Push your changes to the repository
2. Cloudflare Pages will automatically deploy
3. The Functions will be available at:
   - `/api/contact` - Contact form submissions
   - `/api/newsletter` - Newsletter subscriptions

### 6. Test the Forms

1. Visit your deployed site
2. Try submitting the contact form at `/contact`
3. Check if you receive an email at the configured `CONTACT_EMAIL`
4. Test the newsletter popup or footer button
5. Verify emails are being delivered

## Local Development (Optional)

To test locally with Wrangler:

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Create a `.dev.vars` file in the project root:
   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=contact@unlockfluency.co.uk
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Test the forms at `http://localhost:5173`

**Note:** The `.dev.vars` file is already in `.gitignore` to prevent accidentally committing secrets.

## Troubleshooting

### Forms not sending emails

1. **Check Cloudflare Pages logs:**
   - Go to Cloudflare Pages → Your project → Functions
   - Check the real-time logs for errors

2. **Verify environment variables:**
   - Ensure `RESEND_API_KEY` is set correctly
   - No extra spaces or quotes around the values

3. **Check Resend dashboard:**
   - Go to **Logs** to see if emails were sent
   - Check for any errors or bounces

4. **Domain verification:**
   - Ensure your domain is fully verified in Resend
   - Check DNS records are correctly configured

### Email deliverability issues

1. **Check spam folder:** Emails might be filtered as spam initially
2. **SPF/DKIM records:** Ensure DNS records are correctly set up in Resend
3. **Test with different email providers:** Try Gmail, Outlook, etc.

### CORS errors in browser console

- The Functions should automatically handle CORS
- If you see CORS errors, check that the Functions are deployed correctly
- Ensure the request is going to `/api/contact` or `/api/newsletter` (not an external URL)

## Security Notes

- ✅ API keys are stored securely in Cloudflare environment variables
- ✅ Never commit API keys to the repository
- ✅ The Functions validate all form inputs server-side
- ✅ Email addresses are validated before sending
- ✅ Rate limiting is handled by Cloudflare (100,000 requests/day free tier)

## Costs

- **Cloudflare Pages Functions:** Free tier includes 100,000 requests/day
- **Resend:** Free tier includes 3,000 emails/month, then $20/month for 50,000 emails
- **Total:** $0/month for typical usage (unless you exceed 3,000 emails/month)

## Support

- Resend documentation: [https://resend.com/docs](https://resend.com/docs)
- Cloudflare Pages Functions docs: [https://developers.cloudflare.com/pages/functions/](https://developers.cloudflare.com/pages/functions/)
- Need help? Contact your developer or create an issue in the repository

## Next Steps

After forms are working:

1. Monitor email delivery rates in Resend dashboard
2. Consider adding email templates for auto-responders
3. Set up a mailing list service (Mailchimp, ConvertKit) for newsletter subscribers
4. Add analytics to track form conversion rates
