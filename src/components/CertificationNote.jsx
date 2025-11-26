import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award } from 'lucide-react';

export default function CertificationNote() {
  return (
    <div className="mt-12">
      <Card className="bg-gray-950/50 border-blue-400/60">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Award className="w-6 h-6 text-stone-100" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100 mb-2">Certification &amp; Assessment</h4>
              <p className="text-sm text-stone-100">
                At the end of your course, you'll receive a Certificate of Completion as well as a personalised skills assessment and English level report. This gives you clear evidence of your progress and a roadmap for your next steps in fluency. This applies to all of the courses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}