
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancellationPolicy() {
  return (
    <div className="bg-gray-900 text-gray-300">
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            Cancellation Policy
          </h1>
          
          <Card className="bg-gray-800/50 border border-gray-700">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-p:text-gray-300 space-y-6">
                
                <div>
                    <h2 className="font-bold">Course Cancellations</h2>
                    <p>
                    If you need to cancel your booking, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-sky-600 hover:text-sky-700">contact@unlockfluency.co.uk</a> as soon as possible.
                    </p>
                </div>
                
                <div>
                    <h2 className="font-bold">Refunds</h2>
                    <p>
                    Cancellations made a week before the course start date will receive a full refund. <br />
                    Cancellations made up to 48 hours before the course start date will receive a 50% refund. <br />
                    Cancellations made within 48 hours before the course start date are non-refundable. <br />
                    Refunds will be processed within 5-7 business days of the cancellation request.
                    </p>
                    <p>
                        <strong> All refunds will be subject to a 2.5% processing fee. </strong>
                    </p>
                </div>
                
                <div>
                    <h2 className="font-bold">Course Changes</h2>
                    <p>
                    We reserve the right to cancel or reschedule courses due to insufficient enrolment or unforeseen circumstances. In such cases, you will receive a full refund or the option to transfer to another course.
                    </p>
                </div>
                
                <div>
                    <h2 className="font-bold">No-Shows</h2>
                    <p>
                    Students who fail to attend their scheduled course without prior notice will not be eligible for a refund.
                    </p>
                </div>
                
                <div>
                    <h2 className="font-bold">Contact</h2>
                    <p>
                    For cancellations or questions about this policy, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-sky-600 hover:text-sky-700">contact@unlockfluency.co.uk</a>.
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
