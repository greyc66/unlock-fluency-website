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
const courses = require('../src/data/courses.json');

// ---------------------------------------------------------------------------
// Route definitions – title, description, and static HTML for crawlers
// ---------------------------------------------------------------------------
const ROUTES = {
  '/': {
    title: 'The Unlock Fluency Method | Immersive English Fluency Courses & Coaching',
    description: 'Unlock the English you already have with Dr Christina Grey. Online English courses from £220, 1-to-1 coaching from £75, training for teams, and a summer retreat in Cambridge, UK.',
    content: `
      <h1>Unlock the English you already have.</h1>
      <p>Most of my students don't need more grammar. They need the confidence to use what they know. In my courses, you start speaking from the first minute.</p>
      <h2>What makes it different</h2>
      <ul>
        <li>You do the talking: most of every session is you speaking, not listening to a teacher.</li>
        <li>Real topics, not textbooks: work, culture, technology, and life.</li>
        <li>Confidence first: mistakes are welcome, and techniques from the stage help with voice, presence, and nerves.</li>
      </ul>
      <h2>Ways to work with me</h2>
      <ul>
        <li><a href="/courses">Online courses</a>: small-group courses, live online, from £220.</li>
        <li>1-to-1 coaching: sessions built around your goals, from £75.</li>
        <li><a href="/business">For business</a>: tailored training for teams, online or in person.</li>
        <li><a href="/retreatregistration">Summer retreat</a>: a week of English, culture, and confidence in Cambridge, UK.</li>
      </ul>
      <h2>Meet Dr Christina Grey</h2>
      <p>A psycholinguist with a PhD in Linguistics who trained in drama at the University of Kent and at Tufts as a Fulbright scholar. Her courses combine the science of how we learn languages with the stage skills that help you speak with presence.</p>
      <nav aria-label="Main navigation">
        <a href="/courses">Online English Courses</a> |
        <a href="/about">About Dr Christina Grey</a> |
        <a href="/themethod">The Unlock Fluency Method</a> |
        <a href="/business">Corporate English Training</a> |
        <a href="/testimonials">Success Stories</a> |
        <a href="/resources">The Resource Room</a> |
        <a href="/contact">Get in Touch</a>
      </nav>
    `,
  },

  '/about': {
    title: 'About Dr Christina Grey | Creator of The Unlock Fluency Method',
    description: 'Meet Dr Christina Grey: psycholinguist with a PhD in Linguistics, drama-trained speaker, and creator of The Unlock Fluency Method, with 15 years of research and teaching.',
    content: `
      <h1>Meet Dr Christina Grey</h1>
      <p>I help people who already know English speak it with confidence. I'm a language scientist, I trained in drama, and I've been teaching English since 2012. The Unlock Fluency Method brings all three together.</p>
      <h2>My story</h2>
      <p>I grew up with three languages and spent my childhood on stage as a child actor.</p>
      <h3>The scientist</h3>
      <p>A BA in English Language and Linguistics, an MSc in Literature, an MA in Linguistics, and a PhD in Linguistics at Humboldt-Universität zu Berlin and the University of Cambridge, with award-winning research.</p>
      <h3>The performer</h3>
      <p>Drama at the University of Kent, then a year at Tufts University as a Fulbright scholar in Theatre Studies. Conference talks in the UK, the US, Greece, Germany, Ireland, the Netherlands, and beyond.</p>
      <h3>The teacher</h3>
      <p>Teaching English since 2012, including many years at the Volkshochschule (VHS) in Berlin.</p>
      <h2>Academic and professional journey</h2>
      <p>Aristotle University of Thessaloniki, University of Kent, University of Edinburgh, Tufts University (Fulbright), Humboldt-Universität zu Berlin, University of Cambridge, VHS Berlin.</p>
    `,
  },

  '/themethod': {
    title: 'The Unlock Fluency Method | How Immersive English Coaching Works',
    description: 'How The Unlock Fluency Method works: you do the talking, real topics instead of textbooks, and confidence first. A psycholinguistic approach with skills from the stage.',
    content: `
      <h1>The Unlock Fluency Method</h1>
      <p>I teach English the way you learned your first language: by listening, talking, and using it in real situations. Grammar comes along the way.</p>
      <h2>What makes it different</h2>
      <p>You do the talking. Real topics, not textbooks. Confidence first.</p>
      <h2>How it works</h2>
      <p>Listen first, talk constantly, practise real situations, and get feedback that builds confidence.</p>
      <h2>Skills from the stage</h2>
      <p>Voice and pace, presence and body language, improvising when you don't know a word, and handling nerves.</p>
      <h2>The science, briefly</h2>
      <p>The method follows the natural stages of language acquisition: meaningful input, active use, memory support, and a positive approach to mistakes.</p>
    `,
  },

  '/courses': {
    title: 'Online English Courses from £220 | The Unlock Fluency Method',
    description: 'Browse online English courses from £220 and 1-to-1 personalised coaching from £75 with Dr Christina Grey. Immersive small-group courses that get you speaking English with confidence.',
    content: `
      <h1>Online Courses: The Unlock Fluency Method</h1>
      <p>Explore immersive online English fluency courses designed by Dr Christina Grey using The Unlock Fluency Method. Choose from small-group courses (6 to 12 participants) or personalised 1-to-1 coaching.</p>
      <h2>Group courses</h2>
      <ul>
        ${courses.filter((c) => !c.hidden).map((c) => `<li><a href="/courses/${c.slug}">${c.title}</a>: ${c.hook} ${c.cardFacts.join(', ')}, ${c.price}</li>`).join('\n        ')}
      </ul>
      <h2>1-to-1 coaching</h2>
      <p>Sessions built entirely around your goals, at any level, from £75. Start with a free discovery call.</p>
      <h2>For Business</h2>
      <p>Want to try The Unlock Fluency Method for your company? See <a href="/business">Corporate English Training</a> for tailored courses, workshops, and retreats, online or in person.</p>
    `,
  },

  '/business': {
    title: 'Corporate English Training | Unlock Fluency for Business',
    description: "Your teams don't have an English problem. They have a confidence problem. Tailored English fluency training by Dr Christina Grey: courses, workshops, and retreats, online or in person.",
    content: `
      <h1>Your teams don't have an English problem. They have a confidence problem.</h1>
      <p>They already speak English. They know the grammar and the vocabulary. But when the meeting starts, they freeze, translate in their heads, and hold back. The Unlock Fluency Method changes that.</p>
      <h2>Results participants report</h2>
      <p>96% report greater speaking confidence, 91% feel better prepared for professional communication, 9.7/10 average satisfaction, and 100% would recommend it to colleagues (self-reported, 300+ participant evaluations).</p>
      <h2>Built around your team</h2>
      <ul>
        <li>Custom Unlock Fluency Course: typically 30 hours, as a 5-day intensive or weekly sessions</li>
        <li>Custom Unlock Fluency Workshop: half or full day(s) on one skill, such as presenting or negotiating</li>
        <li>Custom Unlock Fluency Retreat: in Cambridge or a destination you choose</li>
      </ul>
      <h2>How it works</h2>
      <p>A free 20-minute discovery call, a free 90-minute taster session, a tailored programme, and an assessment with next steps for every participant.</p>
    `,
  },

  '/testimonials': {
    title: 'Success Stories | Unlock Fluency Student Testimonials',
    description: 'Read how students from around the world unlocked their English fluency with The Unlock Fluency Method by Dr Christina Grey. Real results from real learners.',
    content: `
      <h1>Success Stories: Unlock Fluency Testimonials</h1>
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
    description: 'Access free English learning resources from The Unlock Fluency Method: vocabulary tips, proverbs, icebreakers, TED talk picks, and podcast recommendations to unlock your fluency.',
    content: `
      <h1>The Resource Room: Free English Fluency Resources</h1>
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

// One page per course, built from the same data the site uses
for (const c of courses.filter((course) => !course.hidden)) {
  ROUTES[`/courses/${c.slug}`] = {
    title: c.metaTitle,
    description: c.metaDescription,
    content: `
      <h1>${c.title}</h1>
      <p>${c.hook}</p>
      <h2>Who it's for</h2>
      <p>${c.whoFor}</p>
      <h2>What you'll practise</h2>
      <ul>${c.practise.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h2>${c.sessionTitle}</h2>
      <ul>${c.session.map((s) => `<li>${s.time}: ${s.text}</li>`).join('')}</ul>
      <h2>What's included</h2>
      <ul>${c.included.map((item) => `<li>${item}</li>`).join('')}</ul>
      <p>${c.schedule.map((s) => `${s.label}: ${s.value}`).join('. ')}. Price: ${c.price}.</p>
    `,
  };
}

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
