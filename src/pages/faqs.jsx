
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQs() {
  const faqs = [
    {
      question: "What level of English do I need for the courses?",
      answer: "I design my Unlock Fluency courses for intermediate to advanced learners (B1/B2 level and above). If you're unsure about your level, please get in touch for a consultation."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "I design my Unlock Fluency courses for intermediate to advanced learners (B1/B2 level and above). However, I offer 1-to-1 personalised coaching sessions that I tailor for beginners. Get in touch to discuss your specific needs."
    },
    {
      question: "How do I join a course?",
      answer: <> On my <Link to="/courses" className="text-amber-400 hover:text-amber-300">Courses</Link> page you can browse all of my available courses. Click on 'Book now', follow the checkout process, and you will receive a Google Meet link to join. If you don't see any available dates for specific courses, check back later as I add new course dates frequently (or join my <Link to="/contact" className="text-amber-400 hover:text-amber-300">Newsletter</Link> and/or <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" className="text-amber-400 hover:text-amber-300">WhatsApp Community</a> if you want to be the first to receive updates!). </>
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: <>If you need to cancel, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-amber-400 hover:text-amber-300">contact@unlockfluency.co.uk</a> as soon as possible. Cancellations made a week before the course start date receive a full refund. Please read the <Link to="/cancellationpolicy" className="text-amber-400 hover:text-amber-300">Cancellation Policy</Link> for more details.</>
    },
    {
      question: "Are the courses available online or in-person?",
      answer: "I teach 'Courses for Individuals' and I offer '1-to-1 Personalised Coaching' online via Google Meet. For organisations, I deliver courses/workshops either online or in-person upon request. Please get in touch to discuss your preferences."
    },
    {
      question: "What makes The Unlock Fluency Method different?",
      answer: <>The Unlock Fluency Method is based on psycholinguistic research and focuses on natural language acquisition through conversation and immersion, rather than traditional textbook learning. Psycholinguistics studies how our minds process language. In other words, it's the science of the "psychology of language." My method uses a psycholinguistic approach meaning that the lessons are aligned with how the brain naturally learns language rather than just drilling grammar rules. It's designed to build real-world communication confidence. Please refer to <Link to="/themethod" className="text-amber-400 hover:text-amber-300">The Method</Link> page for more details.</>
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
      answer: "Scroll all the way to the bottom of my website and you will see a 'Subscribe' button on the bottom left. Alternatively, click on the 'Get in Touch' button and select 'Newsletter Sign-up' as your enquiry type."
    },
    {
      question: "Do you offer courses for teams and organisations?",
      answer: "Yes! I offer tailored courses for companies, NGOs, and organisations. I customise these to meet your team's specific needs and goals. Get in touch for a personalised quote."
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
              Here I answer some common questions about The Unlock Fluency Method and my courses.
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
