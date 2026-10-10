import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";
import { X } from "lucide-react";

const SHOWN_KEY = "newsletter_popup_shown";
const NO_POPUP_PAGES = ["/newsletter", "/contact"];

function alreadyShown() {
  try { return localStorage.getItem(SHOWN_KEY) === "true"; } catch { return true; }
}

export default function NewsletterPopup({ onClose }) {
  const pathname = useLocation().pathname.replace(/\/+$/, "") || "/";
  const [isOpen, setIsOpen] = useState(false);

  // With onClose the parent controls visibility. Otherwise, show once to first-time visitors,
  // after they have scrolled 40% of a page (not on arrival, and not where a sign-up form already is).
  useEffect(() => {
    if (onClose) {
      setIsOpen(true);
      return;
    }
    if (alreadyShown() || NO_POPUP_PAGES.includes(pathname)) return;
    // One-shot: stop listening as soon as it opens, and remember it was shown,
    // so it never reopens on further scrolling or on other pages.
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.4) {
        window.removeEventListener("scroll", onScroll);
        try { localStorage.setItem(SHOWN_KEY, "true"); } catch { /* storage unavailable */ }
        setIsOpen(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onClose, pathname]);

  const handleClose = () => {
    setIsOpen(false);
    try { localStorage.setItem(SHOWN_KEY, "true"); } catch { /* storage unavailable */ }
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="newsletter-popup-title">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full relative p-8">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h2 id="newsletter-popup-title" className="text-3xl text-white mb-3">Join my newsletter</h2>
        <p className="text-gray-300 mb-6">
          A free PDF of English learning tips and resources, then one email a month with new resources and early access to courses.
        </p>
        <NewsletterForm id="popup-email" tone="dark" onSuccess={() => setTimeout(handleClose, 3000)} />
        <p className="text-sm text-gray-400 mt-4">
          <Link to="/newsletter" onClick={handleClose} className="text-sky-300 hover:text-sky-200 underline">More about the newsletter</Link>
        </p>
      </div>
    </div>
  );
}
