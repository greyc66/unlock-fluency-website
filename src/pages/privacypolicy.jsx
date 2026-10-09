
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="bg-brand-50 text-gray-700">
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-brand-900 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <Card className="bg-white border border-brand-100 shadow-none">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="max-w-none text-gray-700 leading-relaxed space-y-6">
                
                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you subscribe to the newsletter, book a course, or send an enquiry.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">How We Use Your Information</h2>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and events.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">Legal Information</h2>
                  <p>
                    <strong> Company Registration Number:</strong> 16740967
                  </p>
                  <p>
                    <strong> Registered Address:</strong> 182-184 High Street North, Office 14834, East Ham, London, E6 2JA, UK
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl text-brand-900 mb-2">Contact</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-brand-600 hover:text-brand-700">contact@unlockfluency.co.uk</a>.
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 !mt-8">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
