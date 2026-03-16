# How to Create a New Form

This guide explains how to add a brand new form page to the Unlock Fluency website — from the frontend form to the backend email handler.

---

## Overview

Every form on this site has three parts:
1. **A React page** (`src/pages/yourform.jsx`) — the UI the user fills in
2. **A Cloudflare Function** (`functions/api/your-form.js`) — the backend that sends you an email
3. **A route entry** (`src/pages/index.jsx`) — connects the URL to the page

---

## Step 1 — Create the Form Page

Create a new file at `src/pages/yourform.jsx`.

Use the retreat registration form as a template: `src/pages/retreatregistration.jsx`

Key things to customise:
- The `formData` state — add/remove fields to match your form
- The section headings (Personal Details, etc.)
- The `requiredFields` array in `handleSubmit` — list every field that must be filled in
- The success message text
- The submit button label
- The `fetch('/api/your-endpoint')` URL — must match the function you create in Step 2

### Field types available
| Field type | Component | Example |
|---|---|---|
| Text input | `<Input>` | Name, phone, country |
| Email input | `<Input type="email">` | Email address |
| Dropdown | `<Select>` + `<SelectItem>` | English level, dietary needs |
| Long text | `<Textarea>` | Motivation, message |
| Checkbox | `<Checkbox>` | Agreement tick |
| Conditional field | Wrap in `{formData.field === "value" && (...)}` | "Other, please specify" |

---

## Step 2 — Create the Backend Function

Create a new file at `functions/api/your-form.js`.

Use the retreat registration handler as a template: `functions/api/retreat-registration.js`

Key things to customise:
- The fields destructured from `formData` at the top
- The `if (!field1 || !field2 || ...)` validation check — list all required fields
- The HTML email body — add a `<div class="field">` block for each field you want in the email
- The email `subject` line (e.g. `Summer Retreat Registration: ${name}`)

The function automatically:
- Uses your Resend API key (stored as `env.RESEND_API_KEY`)
- Sends to `contact@unlockfluency.co.uk` (or `env.CONTACT_EMAIL`)
- Sets `reply_to` to the user's email so you can reply directly

---

## Step 3 — Register the Route

Open `src/pages/index.jsx` and make two additions:

**At the top, add the import:**
```jsx
import YourForm from "./yourform.jsx";
```

**In the `PAGES` object, add:**
```jsx
yourform: YourForm,
```

**In the `<Routes>` section, add:**
```jsx
<Route path="/yourform" element={<YourForm />} />
```

---

## Step 4 — Link to the Form

To link a button to the new form from anywhere on the site:
```jsx
<Link to="/yourform">
  <Button>Go to form</Button>
</Link>
```

The form is also directly accessible at: `https://unlockfluency.co.uk/yourform`

---

## Step 5 — Test Locally

Run the dev server and visit `http://localhost:5173/yourform` to check the form renders correctly.

To test the email sending locally, you'll need Wrangler (the Cloudflare CLI):
```
npx wrangler pages dev dist --binding RESEND_API_KEY=your_key_here
```

---

## Checklist

- [ ] Created `src/pages/yourform.jsx`
- [ ] Created `functions/api/your-form.js`
- [ ] Added import to `src/pages/index.jsx`
- [ ] Added to `PAGES` object in `src/pages/index.jsx`
- [ ] Added `<Route>` in `src/pages/index.jsx`
- [ ] Linked the button/link on the relevant page
- [ ] Tested form locally
- [ ] Pushed live

---

## Existing forms for reference

| Form | Page file | API function | URL |
|---|---|---|---|
| General contact | `src/pages/contact.jsx` | `functions/api/contact.js` | `/contact` |
| Newsletter signup | `src/pages/contact.jsx` | `functions/api/newsletter.js` | `/contact` |
| Summer Retreat | `src/pages/retreatregistration.jsx` | `functions/api/retreat-registration.js` | `/retreatregistration` |
