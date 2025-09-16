
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-900 text-gray-300">
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            Privacy Policy
          </h1>
          
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-p:text-gray-300 space-y-6">
                
                <div>
                  <h2 className="font-bold">Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you subscribe to the newsletter, book a course, or send an enquiry.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-bold">How We Use Your Information</h2>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and events.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-bold">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-bold">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-bold">Contact</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-amber-400 hover:text-amber-300">contact@unlockfluency.co.uk</a>.
                  </p>
                </div>
                
                <p className="text-sm text-gray-400 !mt-8">
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
