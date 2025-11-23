import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail } from "lucide-react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("newsletter_popup_shown");
    
    if (!hasVisited) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown so it doesn't appear again
    localStorage.setItem("newsletter_popup_shown", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:contact@unlockfluency.co.uk?subject=${encodeURIComponent("Newsletter Sign-up")}&body=${encodeURIComponent(`Please sign me up for The Unlock Fluency Method newsletter.`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close popup and mark as shown
    handleClose();
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
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}