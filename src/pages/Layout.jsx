

import React, { useState, useEffect } from "react";
import NewsletterPopup from "../components/NewsletterPopup";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Menu, X, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "About", url: "/about" },
  { title: "The Method", url: "/themethod" },
  { title: "Success Stories", url: "/testimonials" },
  { title: "Courses", url: "/courses" },
  { title: "The Resource Room", url: "/resources" },
];

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
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      <style>{`
        :root {
          --background: 17 24 39; /* gray-900 */
          --foreground: 209 213 219; /* gray-300 */
          --card: 31 41 55; /* gray-800 */
          --card-foreground: 229 231 235; /* gray-200 */
          --popover: 17 24 39;
          --popover-foreground: 209 213 219;
          --primary: 107 114 128; /* gray-500 */
          --primary-foreground: 17 24 39;
          --secondary: 55 65 81; /* gray-700 */
          --secondary-foreground: 229 231 235;
          --muted: 55 65 81;
          --muted-foreground: 156 163 175; /* gray-400 */
          --accent: 245 158 11; /* amber-500 */
          --accent-foreground: 17 24 39;
          --destructive: 239 68 68;
          --destructive-foreground: 249 250 251;
          --border: 55 65 81;
          --input: 75 85 99; /* gray-600 */
          --ring: 107 114 128; /* gray-500 */
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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/d415b06e7_logo_updated.png" 
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
                <Button className="bg-slate-50 text-gray-900 px-4 py-2 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 hover:bg-sky-600 shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
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
                    <Button className="w-full bg-slate-50 text-gray-900 px-4 py-2 text-sm font-semibold">
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
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/d415b06e7_logo_updated.png"
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
                <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                </a>
              </div>
                        <div className="mt-8 pt-6 border-t border-gray-700 max-w-xs">
  <h4 className="font-semibold text-white mb-3">Sign up for the Newsletter</h4>
  <p className="text-gray-400 text-sm mb-4">Get English learning tips and course updates.</p>
  <button 
    onClick={handleNewsletterClick}
    className="bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold px-4 py-2 rounded-md transition-colors text-sm"
  >
    Subscribe
  </button>
</div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-gray-300 transition-colors">About</Link></li>
                <li><Link to="/themethod" className="text-gray-400 hover:text-gray-300 transition-colors">The Method</Link></li>
                <li><Link to="/courses" className="text-gray-400 hover:text-gray-300 transition-colors">Courses</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-gray-300 transition-colors">The Resource Room</Link></li>
                <li><Link to="/testimonials" className="text-gray-400 hover:text-gray-300 transition-colors">Success Stories</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-gray-300 transition-colors">FAQs</Link></li>
                <li><Link to="/privacypolicy" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cancellationpolicy" className="text-gray-400 hover:text-gray-300 transition-colors">Cancellation Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} The Unlock Fluency Method Ltd is registered in England & Wales under the company registration number 16740967. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Newsletter Popup */}
      {showNewsletterPopup && (
        <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />
      )}
    </div>
  );
}

