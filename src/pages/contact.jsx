
import React, { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingLink, { DISCOVERY_CALL_URL } from "@/components/BookingLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, Loader2, Calendar } from "lucide-react";

const SUBJECTS = [
  { value: "Online Courses", label: "Online courses" },
  { value: "1-to-1 Personalised Coaching", label: "1-to-1 coaching" },
  { value: "Unlock Fluency for Business", label: "Training for my team or company" },
  { value: "Summer Retreat", label: "Summer retreat" },
  { value: "General Enquiry", label: "Something else" },
];

const TEAM_SIZES = ["1–5", "6–12", "13–20", "More than 20"];

const PLACEHOLDERS = {
  "Online Courses": "Which course are you interested in, and what would you like to know?",
  "1-to-1 Personalised Coaching": "Tell me about your goals and how often you'd like to meet.",
  "Unlock Fluency for Business": "Tell me about your team: what they use English for, the format you have in mind (online or in person, intensive or weekly), and your timing.",
  "Summer Retreat": "What would you like to know about the summer retreat?",
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry_type: SUBJECTS.some((s) => s.value === subjectParam) ? subjectParam : "",
    message: searchParams.get("message") || "",
    current_english_level: "",
    organisation: "",
    team_size: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const requiredFields = ["name", "email", "enquiry_type", "message"];
    if (formData.enquiry_type === "1-to-1 Personalised Coaching") {
      requiredFields.push("current_english_level");
    }
    if (formData.enquiry_type === "Unlock Fluency for Business") {
      requiredFields.push("organisation", "team_size");
    }

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to send message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  // Old newsletter links used the contact form; the newsletter now has its own page.
  if (subjectParam === "Newsletter Sign-up") return <Navigate to="/newsletter" replace />;

  if (submitted) {
    return (
      <div className="bg-brand-50 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-brand-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl text-brand-900 mb-4">Message Sent Successfully!</h1>
            <p className="text-lg text-gray-600">Thank you for your enquiry. I'll get back to you as soon as possible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-white mb-5">Get in Touch</h1>
          <p className="text-lg text-gray-300">
            A question about my online courses, 1-to-1 coaching, or training for your team? I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8">
          <div className="bg-white rounded-2xl border border-brand-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brand-900 font-semibold">Full Name *</Label>
                  <Input id="name" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-900 font-semibold">Email Address *</Label>
                  <Input id="email" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enquiry_type" className="text-brand-900 font-semibold">What is your enquiry about? *</Label>
                <Select value={formData.enquiry_type} onValueChange={(value) => handleInputChange("enquiry_type", value)}>
                  <SelectTrigger id="enquiry_type" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400"><SelectValue placeholder="Choose a subject" /></SelectTrigger>
                  <SelectContent className="bg-white text-brand-900 border-brand-200">
                    {SUBJECTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Extra field for 1-to-1 coaching */}
              {formData.enquiry_type === "1-to-1 Personalised Coaching" && (
                <div className="space-y-2">
                  <Label htmlFor="current_english_level" className="text-brand-900 font-semibold">Current English Level *</Label>
                  <Input id="current_english_level" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400" value={formData.current_english_level} onChange={(e) => handleInputChange("current_english_level", e.target.value)} placeholder="e.g., Intermediate, B2" />
                </div>
              )}

              {/* Extra fields for business enquiries */}
              {formData.enquiry_type === "Unlock Fluency for Business" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organisation" className="text-brand-900 font-semibold">Company or organisation *</Label>
                    <Input id="organisation" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400" value={formData.organisation} onChange={(e) => handleInputChange("organisation", e.target.value)} placeholder="Organisation name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team_size" className="text-brand-900 font-semibold">Number of participants *</Label>
                    <Select value={formData.team_size} onValueChange={(value) => handleInputChange("team_size", value)}>
                      <SelectTrigger id="team_size" className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400"><SelectValue placeholder="Choose a range" /></SelectTrigger>
                      <SelectContent className="bg-white text-brand-900 border-brand-200">
                        {TEAM_SIZES.map((size) => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" className="text-brand-900 font-semibold">Message *</Label>
                <Textarea
                  id="message"
                  className="bg-white border-brand-200 text-brand-900 placeholder:text-gray-400"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={PLACEHOLDERS[formData.enquiry_type] || "Please write your message here..."}
                  rows={6}
                />
              </div>

              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

              <div className="text-right">
                <Button type="submit" disabled={isSubmitting} size="lg" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold">
                  {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Mail className="w-5 h-5 mr-2" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-brand-100 p-6">
              <h2 className="text-2xl text-brand-900 mb-2">Prefer to talk?</h2>
              <p className="text-gray-600 mb-4">Book a free 20-minute discovery call at a time that suits you.</p>
              <BookingLink href={DISCOVERY_CALL_URL} className="block">
                <Button className="w-full bg-transparent border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white font-semibold">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a free call
                </Button>
              </BookingLink>
            </div>
            <div className="bg-white rounded-2xl border border-brand-100 p-6">
              <h2 className="text-2xl text-brand-900 mb-2">Newsletter</h2>
              <p className="text-gray-600 mb-4">A free PDF of learning tips, then one email a month.</p>
              <Link to="/newsletter" className="font-semibold text-brand-600 hover:text-brand-700">Sign up</Link>
            </div>
            <div className="bg-white rounded-2xl border border-brand-100 p-6">
              <h2 className="text-2xl text-brand-900 mb-2">Email</h2>
              <a href="mailto:contact@unlockfluency.co.uk" className="text-sm text-brand-600 hover:text-brand-700 font-semibold break-words">contact@unlockfluency.co.uk</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
