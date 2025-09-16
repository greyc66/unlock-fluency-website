
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQs() {
  const faqs = [
    {
      question: "What level of English do I need for the courses?",
      answer: "The Unlock Fluency courses are designed for intermediate to advanced learners (B1/B2 level and above). If you're unsure about your level, please get in touch for a consultation."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "The group courses are designed for intermediate learners and above. However, I offer 1-to-1 personalised coaching sessions that can be tailored for beginners. Contact me to discuss your specific needs."
    },
    {
      question: "How do I join a course?",
      answer: "Simply browse the calendar on our booking page and click on 'Book a course' below the calendar to reserve your spot. If you don't see available dates, check back regularly as new courses are added frequently."
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: <>If you need to cancel, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-amber-400 hover:text-amber-300">contact@unlockfluency.co.uk</a> as soon as possible. Cancellations made a week before the course start date receive a full refund. Please see our <Link to="/refundcancellationpolicy" className="text-amber-400 hover:text-amber-300">Refund & Cancellation Policy</Link> for full details.</>
    },
    {
      question: "Are the courses available online or in-person?",
      answer: "Courses for individuals as well as 1-to-1 personalised coaching are conducted online. For organisations, courses can be delivered either online or in-person upon request. Please contact me to discuss your preferences."
    },
    {
      question: "What makes The Unlock Fluency Method different?",
      answer: <>The Unlock Fluency Method is based on psycholinguistic research and focuses on natural language acquisition through conversation and immersion, rather than traditional textbook learning. It's designed to build real-world communication confidence. Please refer to <Link to="/themethod" className="text-amber-400 hover:text-amber-300">The Method</Link> page for more details.</>
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes! At the end of your course, you'll receive a Certificate of Completion as well as a personalised skills assessment and English level report."
    },
    {
      question: "Can I book a single weekend from the Weekend Boost course?",
      answer: "Yes, this is possible. Please get in touch with me directly to discuss booking a single weekend session."
    },
    {
      question: "How do I sign up for the newsletter?",
      answer: "You can sign up for the newsletter using the form in the footer of any page, or through the contact form by selecting 'Newsletter Sign-up' as your enquiry type."
    },
    {
      question: "Do you offer courses for teams and organisations?",
      answer: "Yes! We offer tailored courses for companies, NGOs, and organisations. These can be customised to meet your team's specific needs and goals. Contact us for a personalised quote."
    }
  ];

  return (
    <div className="relative bg-gray-900 text-gray-300">
      <div
        className="absolute inset-0 -z-10 bg-fixed"
        style={{
          backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/4e201f530_katie-moum-7XGtYefMXiQ-unsplash.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
              <HelpCircle className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              FAQs
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about The Unlock Fluency Method and course offerings.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800/60 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300 leading-relaxed">{faq.answer}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
