import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award } from 'lucide-react';

export default function CertificationNote() {
  return (
    <div>
      <Card className="bg-sky-100 border-sky-300">
        <CardContent className="p-8">
          <div className="text-center">
            <h4 className="font-bold text-blue-900 text-lg mb-3 inline-flex items-center justify-center gap-2">
              <Award className="w-6 h-6" />
              Certification &amp; Assessment
            </h4>
            <p className="text-blue-800">
              All participants will receive a Certificate of Completion, a personalised skills assessment, and English level report; clear evidence of progress and a roadmap for next steps in fluency.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}