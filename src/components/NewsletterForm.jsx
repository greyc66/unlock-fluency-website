import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, CheckCircle } from "lucide-react";

// One sign-up form for the newsletter page, the footer, and the popup.
// tone: "light" for white backgrounds, "dark" for navy ones. compact: email and button on one row.
export default function NewsletterForm({ id = "newsletter-email", tone = "light", compact = false, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const dark = tone === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to subscribe. Please try again.');
        setIsSubmitting(false);
        return;
      }
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex items-start gap-3 ${compact ? "" : "py-4"}`}>
        <CheckCircle className={`w-6 h-6 shrink-0 ${dark ? "text-green-400" : "text-green-600"}`} />
        <div>
          <p className={`font-semibold ${dark ? "text-white" : "text-brand-900"}`}>You're subscribed!</p>
          <p className={dark ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>Check your inbox for your free learning resources.</p>
        </div>
      </div>
    );
  }

  const field = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400"
    : "bg-white border-brand-200 text-brand-900 placeholder:text-gray-400";
  const button = dark
    ? "bg-brand-300 hover:bg-brand-200 text-brand-900 font-semibold"
    : "bg-brand-600 hover:bg-brand-700 text-white font-semibold";

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <Label htmlFor={id} className={compact ? "sr-only" : dark ? "text-gray-200 font-semibold" : "text-brand-900 font-semibold"}>
        Email address
      </Label>
      <div className={compact ? "flex flex-col sm:flex-row gap-2" : "space-y-3"}>
        <Input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
          className={`${field} ${compact ? "sm:flex-1" : "h-11"}`}
        />
        <Button type="submit" disabled={isSubmitting} className={`${button} ${compact ? "" : "w-full h-11"}`}>
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Mail className="w-4 h-4 mr-2" />}
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {error && <p className={`text-sm ${dark ? "text-red-300" : "text-red-600"}`}>{error}</p>}
    </form>
  );
}
