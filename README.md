# The Unlock Fluency Method website

The website for The Unlock Fluency Method Ltd (www.unlockfluency.co.uk): a React site built with Vite and Tailwind CSS, hosted on Cloudflare Pages. Pushing to `main` on GitHub publishes it.

## Run and build

```bash
npm install
npm run dev      # local preview at the address it prints
npm run build    # builds into dist/ and pre-renders every page for search engines
```

## Where things are

| What | Where |
|---|---|
| Pages | `src/pages/` (routes in `src/pages/index.jsx`; menu, footer, and page titles in `src/pages/Layout.jsx`) |
| Course cards and course details pages | `src/data/courses.json` (one entry per course; each gets a page at `/courses/<slug>`) |
| Shared pieces | `src/components/` (booking buttons, newsletter form and popup, "What makes it different") |
| Colours and fonts | `tailwind.config.js` (`brand` and `gray` scales) and `index.html` (Google Fonts) |
| Photos | `public/images/` |
| Text search engines read | `scripts/prerender.cjs`, the structured data in `index.html`, and `public/sitemap.xml` |
| Redirects | `public/_redirects` (for example `/corporate` to `/business`) |
| Form and payment handlers | `functions/api/` (Cloudflare Pages Functions; emails are sent through Resend) |

When you change page text, update `scripts/prerender.cjs` too, and add new pages to `public/sitemap.xml`. Adding a form is described in `HOW_TO_CREATE_A_NEW_FORM.md`.

## Settings

The functions need the settings listed in `.env.example`. Set them in Cloudflare Pages (Settings, Environment variables) and, for local testing, in a `.dev.vars` file that is never committed.

## History

`HANDOFF_redesign.md` records the 2026 redesign: decisions, open questions, and an update log.
