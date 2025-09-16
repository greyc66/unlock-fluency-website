
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry_type: "",
    message: "",
    current_english_level: "",
    course_level: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const getMessagePlaceholder = () => {
    if (formData.enquiry_type === "1-to-1 Personalised Coaching" || formData.enquiry_type === "Unlock Fluency for Organisations") {
      return "Please write your message here, including your learning goals, desired course length and any other details that might be relevant.";
    }
    return "Please write your message here...";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Handle regular contact form
    let requiredFields = ["name", "email", "enquiry_type", "message"];
    
    if (formData.enquiry_type === "1-to-1 Personalised Coaching") {
      requiredFields.push("current_english_level");
    }
    
    if (formData.enquiry_type === "Unlock Fluency for Organisations") {
      requiredFields.push("course_level");
    }

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Create mailto link
    let emailSubject = `Contact Form: ${formData.enquiry_type}`;
    let emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.enquiry_type}\nMessage: ${formData.message}`;
    
    if (formData.current_english_level) {
      emailBody += `\nCurrent English Level: ${formData.current_english_level}`;
    }
    
    if (formData.course_level) {
      emailBody += `\nRequired Course Level: ${formData.course_level}`;
    }

    const mailtoLink = `mailto:contact@unlockfluency.co.uk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-gray-900 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Email Client Opened!
              </h1>
              <p className="text-lg text-gray-400">
                Your email client should have opened with your message pre-filled. Please send the email to complete your inquiry.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-16">
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question about the Unlock Fluency courses, 1-to-1 Personalised Coaching, or the Unlock Fluency courses for Organisations? I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-400">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-400">Email Address *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="enquiry_type" className="text-gray-400">Subject of Enquiry *</Label>
                <Select value={formData.enquiry_type} onValueChange={(value) => handleInputChange("enquiry_type", value)}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                    <SelectItem value="1-to-1 Personalised Coaching">1-to-1 Personalised Coaching</SelectItem>
                    <SelectItem value="Unlock Fluency for Organisations">Unlock Fluency for Organisations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional fields for 1-to-1 Coaching */}
              {formData.enquiry_type === "1-to-1 Personalised Coaching" && (
                <div className="space-y-2">
                  <Label htmlFor="current_english_level" className="text-gray-400">Current English Level *</Label>
                  <Input id="current_english_level" value={formData.current_english_level} onChange={(e) => handleInputChange("current_english_level", e.target.value)} placeholder="e.g., Intermediate, B2" />
                </div>
              )}

              {/* Conditional fields for Organisations */}
              {formData.enquiry_type === "Unlock Fluency for Organisations" && (
                <div className="space-y-2">
                  <Label htmlFor="course_level" className="text-gray-400">Required Course Level *</Label>
                  <Select value={formData.course_level} onValueChange={(value) => handleInputChange("course_level", value)}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-400">Message *</Label>
                <Textarea 
                  id="message" 
                  value={formData.message} 
                  onChange={(e) => handleInputChange("message", e.target.value)} 
                  placeholder={getMessagePlaceholder()}
                  rows={6} 
                />
              </div>
              
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

              <div className="text-right">
                <Button type="submit" disabled={isSubmitting} size="lg" className="bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold">
                  {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Mail className="w-5 h-5 mr-2" />}
                  {isSubmitting ? "Opening Email..." : "Submit Form"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
