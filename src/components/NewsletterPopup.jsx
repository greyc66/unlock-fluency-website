import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail, Loader2, CheckCircle } from "lucide-react";

export default function NewsletterPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Show popup automatically or when triggered by parent
  useEffect(() => {
    if (onClose) {
      // If onClose prop is provided, parent controls visibility
      setIsOpen(true);
    } else {
      // Auto-popup behavior for first-time visitors
      const hasVisited = localStorage.getItem("newsletter_popup_shown");

      if (!hasVisited) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [onClose]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown so it doesn't appear again
    localStorage.setItem("newsletter_popup_shown", "true");

    // Call parent's onClose if provided
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!email) {
      setError("Please enter your email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Cloudflare Pages Function
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to subscribe. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Success!
      setSubmitted(true);

      // Close popup after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-800 border-gray-700 max-w-md w-full relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Sign up for the Newsletter
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Successfully Subscribed!
              </h3>
              <p className="text-gray-400">
                Thank you for subscribing. I'll be in touch soon!
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 mb-6">
                Get exclusive English learning tips, resources, and early access to new courses delivered to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popup-email" className="text-gray-400">Email Address</Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}