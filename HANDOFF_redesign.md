# Website redesign handoff

**Status:** Whole site redesigned in the copy; organisations page is now "For Business" at /business. Checkpoint commits on branch `redesign`; the previous photo layout is kept for comparison on branch `redesign-photos-v1` (folder `../unlock-fluency-website-redesign-photos-v1`). Next: owner compares the two photo layouts, decides on newsletter page and enquiry subjects, adds Setmore dates, then merge into `main`.

## Where things are
- **Live site:** `../unlock-fluency-website` (branch `main`). Don't edit it for redesign work.
- **Experimental copy:** this folder, branch `redesign` (a git worktree of the same repo). Nothing here goes live until it's merged into `main` and pushed.
- Run locally: `npm run dev` in this folder.
- **Look Book** (palette, font, layout and message previews): https://claude.ai/artifact/LCmbWNooZEMkqUfCVBCh9v
- Colours: `tailwind.config.js` defines `gray` (navy-tinted neutrals, 900 = navy #10233A) and `brand` (300 = logo sky #86D2F5, 600 = button blue #1F6FA3). Use only these, except green for success and WhatsApp, red for errors, amber for star ratings and the retreat form's warning box.
- Buttons: main is `bg-brand-600 text-white` on light sections and `bg-brand-300 text-brand-900` on navy sections. Secondary is a 2px outline (`border-brand-900` on light, `border-brand-300` on navy).
- Fonts: DM Serif Display for h1 and h2 (`font-display`), DM Sans for everything else; loaded in `index.html`.
- Images live in `public/images/`. Nothing references Base44 storage any more; leave the Base44 files in place for a few weeks after going live.
- Course data lives in one file, `src/data/courses.json`: the cards, the course details pages (`/courses/<slug>`, `src/pages/coursedetail.jsx`), Google's pre-rendered pages and page titles all read from it. A new course is one entry there plus a `<url>` in `public/sitemap.xml`.
- "What makes it different" (You do the talking / Real topics, not textbooks / Confidence first) is one component, `src/components/WhatsDifferent.jsx`, used on Home and The Method.
- Photos in `public/images/` (EXIF and GPS stripped), each used exactly once: headshot (Home hero), cafe (Home, Meet Christina), about (About hero), graduation, research-poster, award (About, scientist), presenting (About, performer), classroom (About, teacher), tea and berlin (About, fun facts), office (The Method, science), conference (For Organisations hero), cambridge (retreat registration header). Home "Ways to work with me" cards use icons, not photos.
- Booking buttons: always use `src/components/BookingLink.jsx` (it calls Setmore's global `setmorePopup` on click, so buttons work on every page). `DISCOVERY_CALL_URL` lives there too.
- Session times on the course pages come from the Setmore listings (e.g. Unlock English Fluency: Monday to Friday, 8am–2pm UK time). Setmore still names it "Unlock Fluency Signature"; rename it there to match.
- Shared form-control colours are defined in `src/pages/Layout.jsx` as HSL values in the brand palette (they were previously RGB values, which rendered as random colours).
- Every copy change must also be made in `scripts/prerender.cjs` (the text Google reads) and, for courses, in the JSON-LD in `index.html`.

## Decisions
- The About page quotes are correct; they come from the owner's offline records.
- Experience is stated as "15 years of research and teaching" everywhere (teaching officially since 2012).
- The method is for B1/B2 and above; the current online courses are all B2 and above. The FAQs say both.
- Google prices: online courses from £220, 1-to-1 coaching from £75.
- No em or en dashes in visitor-facing text, including the automated emails. The Germanisms handout source is out of scope.
- Keep the carousels on the Home and About pages.
- Courses page is now "Online Courses" (URL still /courses): individuals and 1-to-1 only, with a banner linking to For Organisations.
- Look Book choice: Sky & Ink, DM Serif + DM Sans, Split layout, "Already yours" message. The owner likes the navy tones, so dark sections are navy. A navy "Spotlight" look (coral or sky buttons, no yellow) may be implemented later.
- Next to the owner's name the home page mentions online courses, 1-to-1 coaching, and corporate training.
- Stats: keep the current wording for now (owner declined corrections on 2026-10-09).
- PhD is from the University of Cambridge (confirmed).
- The Signature course is renamed "Unlock English Fluency" (no "Morning"; timing details will go on its course details page).
- Group courses: 6 to 12 participants; typical intensive length 30 hours (6 hours daily). Book Club: 2 hours weekly for 4 weeks. Corporate and 1-to-1 group size is flexible (very large groups are unwieldy).
- Corporate cards show typical values instead of "Custom" (length, format or focus or location, group size, level B1/B2 and above).
- Course names carry no "Morning"/"Evening"; timing goes on each course's details page.
- Course details: one separate page per course (own URL, title and Google listing).
- Summer Retreat stays hidden; it runs once a year in summer.
- Theatre background: child actor; studied drama for a year at the University of Kent, then a further year at Tufts on a Fulbright scholarship. Has spoken at conferences in the UK, US, Greece, Germany, Ireland, the Netherlands, and other countries. Use this to show public speaking training alongside the English teaching.
- The award photo (`IMG_4561`) is from Scouts research work and is not relevant; don't use it.
- The award photo is used, described only as "award-winning research" (no detail of what for).
- Course details pages contain: who it's for, what you'll practise, a typical session or day, what's included, dates (links to the Setmore calendar), and a testimonial from that course where one exists.
- 1-to-1 has a single button: book a discovery call.
- The organisations page is "For Business" at /business (owner's decision, 2026-10-09). /corporate redirects permanently (`public/_redirects` and a client-side redirect in `src/pages/index.jsx`). Google titles keep the phrase "Corporate English Training" for search. Contact form subject value is "Unlock Fluency for Business" (front end and `functions/api/contact.js`). Promo documents and both value proposition PDFs now use /business; don't share them until the redesign is live.
- About merges the old "Genesis of my Method" timeline into a five-part story (start, scientist, performer, teacher, method) and replaces the timeline image with text.
- Home is: opening section, stats carousel, what makes it different, ways to work with me (online courses, 1-to-1, organisations, summer retreat), meet Christina, testimonials carousel, closing call to action. The label above the headline must fit on one line: "Courses · Coaching · Teams · Retreats".
- Overall aim: sleek and not busy; visitors should understand straight away that there are offers for individuals, for organisations, and experiences like the summer retreat.
- Owner is considering replacing Series Club with a weekly course on current news and professional fluency (business English with a twist). Not decided.

## Open questions for the owner
- Course details copy is a first draft for the owner to refine (especially the typical sessions for Maintain Fluency, Weekend Boost, and Series Club, and "starting in the morning" for the intensive).
- Testimonials for Maintain Fluency: none on file yet. Book Club uses Laura (BC01 evaluation) and Series Club uses Kat (`Series_club/Series Club Evaluation.csv`); both gave permission for first name only, so no job or country is shown.
- Newsletter: own page (/newsletter) and more visible sign-up? Proposed, awaiting decision.
- Contact form enquiry subjects: improvements proposed, awaiting decision.
- Setmore has no dates scheduled for Unlock English Fluency, Maintain Fluency, and Weekend Boost, so their booking pages look empty.
- Name for the planned news and professional fluency course (suggested: The Briefing).
- Theatre photos, if any exist.

## Update log
- 2026-10-09: Created the `redesign` worktree. Fixed the FAQ levels, Google course prices and lengths (they were out of date), standardised years of experience, and removed dashes from pages, Google text and emails. Build passes. Changes are not committed yet.
- 2026-10-09: Applied the chosen look site-wide (palette, fonts, buttons, Split opening section with headshot and "Already yours" copy). Moved 6 images from Base44 into `public/images/` and added the new headshot. Renamed Courses to Online Courses with an organisations banner, renamed Signature to Unlock English Fluency, and filled in the corporate card details. Updated the Look Book (coral and sky Spotlight options). Build passes; checked by screenshots on desktop and phone. Not committed.
- 2026-10-09: Removed Morning/Evening from course names (cards, Google list, structured data). Recorded theatre background, course details pages decision, and Summer Retreat staying hidden.
- 2026-10-09: Added personal photos, the WhatsDifferent component, course data file and five course details pages (with Google pages and sitemap entries), shortened course cards, single 1-to-1 button, rebuilt For Organisations from the value proposition, rewrote About (story chapters, text timeline) and The Method (simplified), simplified Home. Removed unused files (CertificationNote, old timeline and background images, cambridge-bg.jpg). Build passes; checked by screenshots on desktop and phone. Not committed.
- 2026-10-09: Fixed booking buttons (shared BookingLink), added Setmore session times and Laura's Book Club testimonial, added four new photos and removed all photo duplication, redesigned Success Stories, FAQs (accordion), Contact (form plus call/email panel), Resources, Summer Retreat registration, and both policy pages; fixed shared form-control colours. Removed unused stock background images. Build passes; checked by screenshots.
- 2026-10-09: Renamed For Organisations to For Business (/business, with /corporate redirects); updated Promo documentation and regenerated both value proposition PDFs; added Kat's Series Club testimonial; first names only for course testimonials. Committed as a checkpoint and created `redesign-photos-v1` with the previous photo layout for comparison.
