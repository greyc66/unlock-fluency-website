
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancellationPolicy() {
  return (
    <div className="bg-brand-50 text-gray-700">
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-brand-900 mb-8 text-center">
            Cancellation Policy
          </h1>
          
          <Card className="bg-white border border-brand-100 shadow-none">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="max-w-none text-gray-700 leading-relaxed space-y-6">
                
                <p>
                To cancel or change a booking, or with any question about this policy, email me at <a href="mailto:contact@unlockfluency.co.uk" className="text-brand-600 hover:text-brand-700">contact@unlockfluency.co.uk</a> as soon as you can.
                </p>

                <div>
                    <h2 className="text-2xl text-brand-900 mb-2">Refunds</h2>
                    <p>
                    <strong>* Every refund marked with an asterisk is minus a 2.5% processing fee</strong>, whether it's for an online course, 1-to-1 coaching, or the summer retreat. The only exception is when I cancel or move a course (see below). I process refunds within 5–7 working days of your email.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl text-brand-900 mb-2">Online Courses</h2>
                    <p>If you cancel:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>at least a week before the course starts, you get a full refund*</li>
                        <li>up to 48 hours before it starts, you get a 50% refund*</li>
                        <li>less than 48 hours before it starts, or if you don't turn up: no refund</li>
                    </ul>
                    <p className="mt-2">Early bird bookings follow the same rules.</p>
                </div>

                <div>
                    <h2 className="text-2xl text-brand-900 mb-2">If I Cancel or Move a Course</h2>
                    <p>
                    If too few people book, or something unexpected comes up, I may need to cancel or move a course. You'll then get a full refund or a place on another course. This is the only case where there's no processing fee.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl text-brand-900 mb-2">1-to-1 Coaching</h2>
                    <p><strong>Single sessions:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>you can move a session if you let me know at least 24 hours before it starts</li>
                        <li>a session cancelled on the day is forfeited</li>
                    </ul>
                    <p className="mt-3"><strong>Packages:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>if you cancel at least a week before your first session, you get a full refund*</li>
                        <li>once the package has started, you get a refund* for the sessions you haven't used</li>
                        <li>you can move a session, or your start date, if you let me know at least 24 hours before</li>
                        <li>unused sessions expire after 3 months (5-session package) or 6 months (10-session package)</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl text-brand-900 mb-2">Summer Retreat</h2>
                    <p>
                    The retreat is a bigger commitment, for both of us. I book the college rooms and meals, the formal dinner, and the activities, such as the walking tour and punting, well in advance, and those costs are fixed: I can't get them back if someone cancels. I also keep the group small, so a place is hard to fill at short notice.
                    </p>
                    <p className="mt-2">If you cancel:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>at least two weeks before the retreat starts, you get a 25% refund*</li>
                        <li>less than two weeks before it starts, there's no refund</li>
                        <li>at any time, if you find someone to take your place and I agree they can join, you get a full refund*</li>
                    </ul>
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
