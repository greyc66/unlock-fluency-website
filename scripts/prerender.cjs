/**
 * Post-build prerender script.
 *
 * Generates a static HTML file for every route so that search-engine crawlers
 * that don't execute JavaScript (Bing, DuckDuckGo, etc.) still see real
 * content, correct <title>, meta description, canonical URL, and OG tags.
 *
 * React's createRoot().render() will replace the static content on the client,
 * so there is no visible flash for real users.
 *
 * Run: node scripts/prerender.js   (called automatically by `npm run build`)
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.unlockfluency.co.uk';

// ---------------------------------------------------------------------------
// Route definitions – title, description, and static HTML for crawlers
// ---------------------------------------------------------------------------
const ROUTES = {
  '/': {
    title: 'The Unlock Fluency Method | Immersive English Fluency Courses & Coaching',
    description: 'Unlock English fluency and confidence with The Unlock Fluency Method by Dr Christina Grey. Immersive group courses, 1-to-1 coaching, and corporate English training online and in Cambridge, UK.',
    content: `
      <h1>The Unlock Fluency Method — Unlock Your English Fluency</h1>
      <p>The Unlock Fluency Method is an immersive English coaching approach created by Dr Christina Grey. Grounded in psycholinguistic research on how the brain acquires and processes language, it helps you build real confidence and fluency through dynamic, conversation-driven courses.</p>
      <h2>Immersive English Fluency Courses</h2>
      <p>Choose from intensive group courses, personalised 1-to-1 coaching, or tailored corporate English training. All courses use The Unlock Fluency Method to help you speak English with confidence, clarity, and spontaneity. Courses start from £200.</p>
      <h2>A Psycholinguistic Approach to Unlocking English Fluency</h2>
      <p>No textbooks, no grammar drills — just real, immersive communication. The Unlock Fluency Method is built on how your brain naturally acquires language, so you develop lasting fluency and the ability to speak spontaneously.</p>
      <h2>Your Fluency Coach: Dr Christina Grey</h2>
      <p>Dr Christina Grey is a psycholinguist with a PhD in Linguistics specialising in bilingual language acquisition. With over 10 years of research and immersive teaching experience, she created The Unlock Fluency Method to help learners unlock their English fluency and communicate with confidence.</p>
      <nav aria-label="Main navigation">
        <a href="/courses">English Fluency Courses</a> |
        <a href="/about">About Dr Christina Grey</a> |
        <a href="/themethod">The Unlock Fluency Method</a> |
        <a href="/corporate">Corporate English Training</a> |
        <a href="/testimonials">Success Stories</a> |
        <a href="/resources">The Resource Room</a> |
        <a href="/contact">Get in Touch</a>
      </nav>
    `,
  },

  '/about': {
    title: 'About Dr Christina Grey | Creator of The Unlock Fluency Method',
    description: 'Meet Dr Christina Grey — psycholinguist, PhD in Linguistics, and creator of The Unlock Fluency Method. Over 10 years of research and immersive English teaching experience in Cambridge, UK.',
    content: `
      <h1>Meet Dr Christina Grey — Creator of The Unlock Fluency Method</h1>
      <p>Dr Christina Grey is a psycholinguist and the creator of The Unlock Fluency Method. With a PhD in Linguistics specialising in bilingual language acquisition, she brings over 10 years of research and immersive teaching experience to help learners unlock their English fluency.</p>
      <h2>Teaching Philosophy</h2>
      <p>Christina believes that real fluency comes from immersive, conversation-driven practice. The Unlock Fluency Method is grounded in psycholinguistic research — no textbooks and grammar drills, just real communication that builds lasting confidence.</p>
      <h2>Academic &amp; Professional Journey</h2>
      <p>PhD in Linguistics from the University of Cambridge. Over a decade of research into how the brain acquires language, combined with hands-on immersive English teaching experience across the globe.</p>
    `,
  },

  '/themethod': {
    title: 'The Unlock Fluency Method | How Immersive English Coaching Works',
    description: 'Discover The Unlock Fluency Method — a psycholinguistic approach to unlock English fluency. A 9-step immersive process designed to build real fluency and spontaneous speaking confidence.',
    content: `
      <h1>The Unlock Fluency Method</h1>
      <p>The Unlock Fluency Method is an immersive English coaching approach grounded in psycholinguistic research on how the brain acquires and processes language. Created by Dr Christina Grey, it helps you unlock your English fluency through real, dynamic communication.</p>
      <h2>How The Unlock Fluency Method Works</h2>
      <p>Through a 9-step immersive process, you build real English fluency, confidence, and the ability to communicate spontaneously. No textbooks, no grammar drills — just meaningful conversation and personalised feedback designed around how your brain naturally learns.</p>
      <h2>Method Highlights</h2>
      <p>Psycholinguistic foundation, immersive conversation practice, personalised feedback, real-world scenarios, and a supportive environment that builds lasting fluency and confidence.</p>
    `,
  },

  '/courses': {
    title: 'Unlock Fluency Courses | Immersive English Fluency Training from £200',
    description: 'Browse Unlock Fluency English courses from £200. Intensive group sessions, 1-to-1 personalised coaching, and corporate training. Unlock your English fluency online with Dr Christina Grey.',
    content: `
      <h1>Unlock Fluency Courses — Your English Fluency Journey</h1>
      <p>Explore immersive English fluency courses designed by Dr Christina Grey using The Unlock Fluency Method. Choose from intensive group training, personalised 1-to-1 coaching, or corporate English programmes.</p>
      <h2>Unlock Fluency Courses for Individuals</h2>
      <ul>
        <li>Unlock Fluency Signature — Morning: 5-day intensive fluency sprint, 6 hours daily, £300</li>
        <li>Maintain Fluency — Evening: 3-day immersive evening course, 3 hours daily, £200</li>
        <li>Weekend Boost — Morning: 4 consecutive weekends, 3 hours daily, £250</li>
        <li>Series Club — Evening: 8-week series watching course, 2 hours weekly, £220</li>
        <li>Book Club — Evening: 8-week book club, 2 hours weekly, £220</li>
        <li>Unlock Fluency Signature — Summer Retreat: 5-day immersive retreat in Cambridge, UK</li>
      </ul>
      <h2>One-to-One Personalised Coaching</h2>
      <p>Personalised 1-to-1 English coaching tailored to your specific goals. Prices from £75. Contact Dr Christina Grey for a personalised coaching plan.</p>
      <h2>Unlock Fluency Courses for Organisations</h2>
      <p>Custom corporate English training tailored to your team's industry, goals, and schedule. Courses, workshops, and retreats available online or in person.</p>
    `,
  },

  '/corporate': {
    title: 'Corporate English Training | Unlock Fluency for Organisations',
    description: "Unlock your team's English fluency with tailored corporate training by Dr Christina Grey. Immersive courses, workshops, and retreats designed for your industry using The Unlock Fluency Method.",
    content: `
      <h1>Corporate English Training — Unlock Fluency for Your Team</h1>
      <p>Empower your team to communicate with confidence using The Unlock Fluency Method. Dr Christina Grey designs immersive corporate English training programmes tailored to your industry, your goals, and your team.</p>
      <h2>Corporate Training Programmes</h2>
      <ul>
        <li>Custom Unlock Fluency Course — structured programme tailored to your industry</li>
        <li>Custom Unlock Fluency Workshop — focused half or full day skill-building</li>
        <li>Custom Unlock Fluency Retreat — bespoke fluency retreat in Cambridge or your chosen destination</li>
      </ul>
      <h2>Why The Unlock Fluency Method?</h2>
      <p>PhD-level expertise in Linguistics, 10+ years of research and immersive teaching, psycholinguistic methodology, personalised assessment and reporting, flexible scheduling online or in person.</p>
    `,
  },

  '/testimonials': {
    title: 'Success Stories | Unlock Fluency Student Testimonials',
    description: 'Read how students from around the world unlocked their English fluency with The Unlock Fluency Method by Dr Christina Grey. Real results from real learners.',
    content: `
      <h1>Success Stories — Unlock Fluency Testimonials</h1>
      <p>Discover how learners from around the world have unlocked their English fluency and transformed their confidence with The Unlock Fluency Method by Dr Christina Grey. Real results from real learners.</p>
    `,
  },

  '/contact': {
    title: 'Get in Touch | The Unlock Fluency Method',
    description: 'Contact Dr Christina Grey about Unlock Fluency courses, 1-to-1 coaching, or corporate English training. Start your journey to unlock English fluency today.',
    content: `
      <h1>Get in Touch</h1>
      <p>Have a question about The Unlock Fluency Method courses, 1-to-1 personalised coaching, or corporate English training for organisations? Contact Dr Christina Grey and start your fluency journey.</p>
    `,
  },

  '/resources': {
    title: 'The Resource Room | Free English Fluency Learning Resources',
    description: 'Access free English learning resources from The Unlock Fluency Method — vocabulary tips, proverbs, icebreakers, TED talk picks, and podcast recommendations to unlock your fluency.',
    content: `
      <h1>The Resource Room — Free English Fluency Resources</h1>
      <p>Free English learning resources from The Unlock Fluency Method. Explore vocabulary tips, proverbs, icebreakers, TED talk recommendations, and podcast picks to help you unlock your English fluency.</p>
    `,
  },

  '/faqs': {
    title: 'FAQs | The Unlock Fluency Method',
    description: 'Frequently asked questions about The Unlock Fluency Method courses, levels, pricing, cancellation policy, and how to start unlocking your English fluency.',
    content: `
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about The Unlock Fluency Method courses, levels, pricing, scheduling, and how to get started on your journey to unlock English fluency.</p>
    `,
  },

  '/privacypolicy': {
    title: 'Privacy Policy | The Unlock Fluency Method',
    description: 'How The Unlock Fluency Method Ltd collects, uses, and protects your personal data. Registered in England & Wales.',
    content: `<h1>Privacy Policy</h1><p>Privacy policy for The Unlock Fluency Method Ltd, registered in England &amp; Wales under company registration number 16740967.</p>`,
  },

  '/cancellationpolicy': {
    title: 'Cancellation Policy | The Unlock Fluency Method',
    description: 'Cancellation and refund policy for The Unlock Fluency Method courses. Full refund for cancellations 1+ week before the course start date.',
    content: `<h1>Cancellation Policy</h1><p>Cancellation and refund policy for The Unlock Fluency Method English fluency courses.</p>`,
  },
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

for (const [route, meta] of Object.entries(ROUTES)) {
  let html = template;

  // Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

  // Meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`
  );

  // Canonical URL
  const canonical = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Open Graph
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Twitter Card
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  // Inject static content into <div id="root">
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${meta.content}</div>`
  );

  // Write file
  const outputDir = route === '/' ? distDir : path.join(distDir, route);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputFile, html);
  console.log(`  Prerendered: ${route}`);
}

console.log(`\nPrerendered ${Object.keys(ROUTES).length} routes successfully.`);
