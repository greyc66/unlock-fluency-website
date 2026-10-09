

import React, { useState, useEffect } from "react";
import NewsletterPopup from "../components/NewsletterPopup";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import courses from "@/data/courses.json";

const navigationItems = [
  { title: "About", url: "/about" },
  { title: "The Method", url: "/themethod" },
  { title: "Success Stories", url: "/testimonials" },
  { title: "Online Courses", url: "/courses" },
  { title: "For Business", url: "/business" },
  { title: "Resources", url: "/resources" },
];

// Per-page SEO metadata — add an entry here when creating a new page
const PAGE_META = {
  '/': {
    title: 'The Unlock Fluency Method | Immersive English Fluency Courses & Coaching',
    description: 'Unlock the English you already have with Dr Christina Grey. Online English courses from £220, 1-to-1 coaching from £75, training for teams, and a summer retreat in Cambridge, UK.',
  },
  '/about': {
    title: 'About Dr Christina Grey | Creator of The Unlock Fluency Method',
    description: 'Meet Dr Christina Grey: psycholinguist with a PhD in Linguistics, drama-trained speaker, and creator of The Unlock Fluency Method, with 15 years of research and teaching.',
  },
  '/themethod': {
    title: 'The Unlock Fluency Method | How Immersive English Coaching Works',
    description: 'How The Unlock Fluency Method works: you do the talking, real topics instead of textbooks, and confidence first. A psycholinguistic approach with skills from the stage.',
  },
  '/courses': {
    title: 'Online English Courses from £220 | The Unlock Fluency Method',
    description: 'Browse online English courses from £220 and 1-to-1 personalised coaching from £75 with Dr Christina Grey. Immersive small-group courses that get you speaking English with confidence.',
  },
  '/testimonials': {
    title: 'Success Stories | Unlock Fluency Student Testimonials',
    description: 'Read how students from around the world unlocked their English fluency with The Unlock Fluency Method by Dr Christina Grey. Real results from real learners.',
  },
  '/contact': {
    title: 'Get in Touch | The Unlock Fluency Method',
    description: 'Contact Dr Christina Grey about Unlock Fluency courses, 1-to-1 coaching, or corporate English training. Start your journey to unlock English fluency today.',
  },
  '/resources': {
    title: 'Resources | The Unlock Fluency Method',
    description: 'Access free English learning resources from The Unlock Fluency Method: vocabulary tips, proverbs, icebreakers, TED talk picks, and podcast recommendations to unlock your fluency.',
  },
  '/faqs': {
    title: 'FAQs | The Unlock Fluency Method',
    description: 'Frequently asked questions about The Unlock Fluency Method courses, levels, pricing, cancellation policy, and how to start unlocking your English fluency.',
  },
  '/privacypolicy': {
    title: 'Privacy Policy | The Unlock Fluency Method',
    description: 'How The Unlock Fluency Method Ltd collects, uses, and protects your personal data. Registered in England & Wales.',
  },
  '/cancellationpolicy': {
    title: 'Cancellation Policy | The Unlock Fluency Method',
    description: 'Cancellation and refund policy for The Unlock Fluency Method courses. Full refund for cancellations 1+ week before the course start date.',
  },
  '/business': {
    title: 'Corporate English Training | Unlock Fluency for Business',
    description: "Your teams don't have an English problem. They have a confidence problem. Tailored English fluency training by Dr Christina Grey: courses, workshops, and retreats, online or in person.",
  },
};

export default function Layout({ children, currentPageName }) {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  const handleNewsletterClick = () => {
    setShowNewsletterPopup(true);
  };

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close mobile menu on page change
    setMobileMenuOpen(false);

    // Update page title, meta description, and canonical URL
    const course = courses.find((c) => !c.hidden && pathname === `/courses/${c.slug}`);
    const meta = course
      ? { title: course.metaTitle, description: course.metaDescription }
      : PAGE_META[pathname] || PAGE_META['/'];
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', `https://www.unlockfluency.co.uk${pathname === '/' ? '' : pathname}`);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      <style>{`
        :root {
          /* HSL values (the Tailwind config wraps these in hsl()); light UI controls in the brand palette */
          --background: 0 0% 100%;
          --foreground: 213 57% 15%; /* navy */
          --card: 0 0% 100%;
          --card-foreground: 213 57% 15%;
          --popover: 0 0% 100%;
          --popover-foreground: 213 57% 15%;
          --primary: 204 68% 38%; /* button blue */
          --primary-foreground: 0 0% 100%;
          --secondary: 202 83% 95%;
          --secondary-foreground: 213 57% 15%;
          --muted: 202 83% 95%;
          --muted-foreground: 212 17% 47%;
          --accent: 202 83% 95%;
          --accent-foreground: 213 57% 15%;
          --destructive: 0 84% 60%;
          --destructive-foreground: 0 0% 100%;
          --border: 200 83% 88%;
          --input: 200 83% 88%;
          --ring: 204 68% 38%;
          --radius: 0.75rem;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/images/logo.png" 
                alt="Unlock Fluency Logo" 
                className="w-12 h-12 flex-shrink-0" 
              />
              <div className="text-white font-semibold text-sm leading-tight">
                <div>The Unlock Fluency Method</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Get in Touch Button - Desktop */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <Button className="bg-brand-300 hover:bg-brand-200 text-brand-900 px-4 py-2 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Get in Touch
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    {item.title}
                  </Link>
                ))}
                {/* Get in Touch Button - Mobile */}
                <div className="px-3 pt-2">
                  <Link to="/contact">
                    <Button className="w-full bg-brand-300 hover:bg-brand-200 text-brand-900 px-4 py-2 text-sm font-semibold">
                      <Calendar className="w-4 h-4 mr-2" />
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/images/logo.png"
                  alt="Unlock Fluency Logo" 
                  className="w-8 h-8 flex-shrink-0" 
                />
                <div className="text-white font-semibold text-sm leading-tight">
                  <div>The Unlock Fluency Method</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
                Immersive English coaching that builds real confidence and fluency.
              </p>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/share/1BYLcyoiMe/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/theunlockfluencymethod?igsh=YWUydnNwazEwOTZl&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/unlock-fluency-method" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                </a>
              </div>
                        <div className="mt-8 pt-6 border-t border-gray-700 max-w-xs">
  <h4 className="font-semibold text-white mb-3">Sign up for the Newsletter</h4>
  <p className="text-gray-400 text-sm mb-4">Get English learning tips and course updates.</p>
  <button 
    onClick={handleNewsletterClick}
    className="bg-brand-300 hover:bg-brand-200 text-brand-900 font-semibold px-4 py-2 rounded-md transition-colors text-sm"
  >
    Subscribe
  </button>
</div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <div className="grid grid-cols-2 gap-x-8">
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-gray-400 hover:text-gray-300 transition-colors">About</Link></li>
                  <li><Link to="/themethod" className="text-gray-400 hover:text-gray-300 transition-colors">The Method</Link></li>
                  <li><Link to="/courses" className="text-gray-400 hover:text-gray-300 transition-colors">Online Courses</Link></li>
                  <li><Link to="/business" className="text-gray-400 hover:text-gray-300 transition-colors">For Business</Link></li>
                  <li><Link to="/resources" className="text-gray-400 hover:text-gray-300 transition-colors">Resources</Link></li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/testimonials" className="text-gray-400 hover:text-gray-300 transition-colors">Success Stories</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</Link></li>
                  <li><Link to="/faqs" className="text-gray-400 hover:text-gray-300 transition-colors">FAQs</Link></li>
                  <li><Link to="/privacypolicy" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/cancellationpolicy" className="text-gray-400 hover:text-gray-300 transition-colors">Cancellation Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} The Unlock Fluency Method Ltd is registered in England & Wales under the company registration number 16740967. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auto-popup for first-time visitors (no onClose = self-managed) */}
      <NewsletterPopup />

      {/* Newsletter Popup triggered by footer Subscribe button */}
      {showNewsletterPopup && (
        <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />
      )}
    </div>
  );
}

