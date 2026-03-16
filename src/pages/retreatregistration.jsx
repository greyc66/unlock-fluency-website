import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";

export default function RetreatRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    profession: "",
    english_level: "",
    motivation: "",
    dietary_requirements: "",
    dietary_other: "",
    agreement: false,
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

    // Phone is now required
    const requiredFields = ["name", "email", "country", "phone", "profession", "english_level", "motivation", "dietary_requirements"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreement) {
      setError("Please confirm that you understand the deposit requirement.");
      setIsSubmitting(false);
      return;
    }

    // If dietary requirement is "Other" but no specification provided
    if (formData.dietary_requirements === "Other (please specify)" && !formData.dietary_other) {
      setError("Please specify your dietary requirements.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/retreat-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Failed to send registration. Please try again.');
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
                Registration Received!
              </h1>
              <p className="text-lg text-gray-400 mb-2">
                Thank you for registering your interest in the Unlock Fluency Summer Retreat.
              </p>
              <p className="text-gray-400">
                I'll review your application and be in touch soon with more information about the retreat and next steps.
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
            Summer Retreat Registration
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join me in Cambridge for an immersive week of real-world English practice, cultural exploration, and confidence-building in one of the world's most inspiring university cities.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-400">Full Name *</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => handleInputChange("name", e.target.value)} 
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-400">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => handleInputChange("email", e.target.value)} 
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-400">Country of Residence *</Label>
                    <Input 
                      id="country" 
                      value={formData.country} 
                      onChange={(e) => handleInputChange("country", e.target.value)} 
                      placeholder="Your Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-400">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => handleInputChange("phone", e.target.value)} 
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Background Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  Professional Background
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="profession" className="text-gray-400">Current Profession / Industry *</Label>
                  <Input 
                    id="profession" 
                    value={formData.profession} 
                    onChange={(e) => handleInputChange("profession", e.target.value)} 
                    placeholder="e.g., Marketing Manager, Software Engineer, Teacher"
                  />
                </div>
              </div>

              {/* English Level Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  English Level
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="english_level" className="text-gray-400">Current English Level *</Label>
                  <Select 
                    value={formData.english_level} 
                    onValueChange={(value) => handleInputChange("english_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B2 - Upper Intermediate">B2 - Upper Intermediate</SelectItem>
                      <SelectItem value="C1 - Advanced">C1 - Advanced</SelectItem>
                      <SelectItem value="C2 - Proficient">C2 - Proficient</SelectItem>
                      <SelectItem value="Not sure">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Motivation Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  Motivation
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="motivation" className="text-gray-400">
                    What would you most like to improve about your spoken English? *
                  </Label>
                  <Textarea 
                    id="motivation" 
                    value={formData.motivation} 
                    onChange={(e) => handleInputChange("motivation", e.target.value)} 
                    placeholder="Tell me about your goals and what you hope to achieve during the retreat..."
                    rows={5}
                  />
                </div>
              </div>

              {/* Dietary Requirements Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  Dietary Requirements
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="dietary_requirements" className="text-gray-400">Dietary Requirements *</Label>
                  <Select 
                    value={formData.dietary_requirements} 
                    onValueChange={(value) => handleInputChange("dietary_requirements", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Other (please specify)">Other (please specify)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.dietary_requirements === "Other (please specify)" && (
                  <div className="space-y-2">
                    <Label htmlFor="dietary_other" className="text-gray-400">Please specify *</Label>
                    <Input 
                      id="dietary_other" 
                      value={formData.dietary_other} 
                      onChange={(e) => handleInputChange("dietary_other", e.target.value)} 
                      placeholder="Please describe your dietary requirements"
                    />
                  </div>
                )}
              </div>

              {/* Agreement Section */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <Checkbox 
                    id="agreement" 
                    checked={formData.agreement}
                    onCheckedChange={(checked) => handleInputChange("agreement", checked)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor="agreement" 
                    className="text-sm text-gray-300 leading-relaxed cursor-pointer"
                  >
                    I understand that places are limited and that a non-refundable 50% deposit (£750) is required to secure my place once my registration is accepted. *
                  </label>
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-right pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  size="lg" 
                  className="bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Register Your Interest
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
