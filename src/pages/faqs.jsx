
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function FAQs() {
  const faqs = [
    {
      question: "What level of English do I need for the courses?",
      answer: "The Unlock Fluency Method is designed for intermediate to advanced learners (B1/B2 level and above). My current online courses are all for B2 level and above. If you're unsure about your level, please get in touch for a consultation."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "The Unlock Fluency Method is designed for intermediate to advanced learners (B1/B2 level and above), and my current online courses are all for B2 level and above. However, I offer 1-to-1 personalised coaching sessions that I tailor for beginners. Get in touch to discuss your specific needs."
    },
    {
      question: "How do I join a course?",
      answer: <> On my <Link to="/courses" className="text-brand-600 hover:text-brand-700">Courses</Link> page you can browse all of my available courses. Click on 'Book now', follow the checkout process, and you will receive a Google Meet link to join. If you don't see any available dates for specific courses, check back later as I add new course dates frequently (or join my <Link to="/newsletter" className="text-brand-600 hover:text-brand-700">Newsletter</Link> and/or <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" className="text-brand-600 hover:text-brand-700">WhatsApp Community</a> if you want to be the first to receive updates!). </>
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: <>If you need to cancel, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-brand-600 hover:text-brand-700">contact@unlockfluency.co.uk</a> as soon as possible. Cancellations made a week before the course start date receive a full refund. Please read the <Link to="/cancellationpolicy" className="text-brand-600 hover:text-brand-700">Cancellation Policy</Link> for more details.</>
    },
    {
      question: "Are the courses available online or in-person?",
      answer: "My Online Courses and 1-to-1 coaching take place live on Google Meet. For organisations, I deliver courses, workshops, and retreats online or in person. Once a year, I also run a summer retreat in Cambridge, UK. Please get in touch to discuss your preferences."
    },
    {
      question: "What makes The Unlock Fluency Method different?",
      answer: <>The Unlock Fluency Method is based on psycholinguistic research and focuses on natural language acquisition through conversation and immersion, rather than traditional textbook learning. Psycholinguistics studies how our minds process language. In other words, it's the science of the "psychology of language." My method uses a psycholinguistic approach meaning that the lessons are aligned with how the brain naturally learns language rather than just drilling grammar rules. It's designed to build real-world communication confidence. Please refer to <Link to="/themethod" className="text-brand-600 hover:text-brand-700">The Method</Link> page for more details.</>
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
      answer: <>Visit my <Link to="/newsletter" className="text-brand-600 hover:text-brand-700">Newsletter</Link> page, or use the sign-up box at the bottom of any page. You'll get a free PDF of English learning tips straight away, then one email a month.</>
    },
    {
      question: "Do you offer courses for teams and organisations?",
      answer: "Yes! I offer tailored courses for companies, NGOs, and organisations. I customise these to meet your team's specific needs and goals. Get in touch for a personalised quote."
    }
  ];

  return (
    <div className="bg-white">
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-white mb-5">FAQs</h1>
          <p className="text-lg text-gray-300">
            Common questions about The Unlock Fluency Method and my courses.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Accordion type="single" collapsible className="border-t border-brand-100">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-brand-100">
                <AccordionTrigger className="text-left text-lg font-semibold text-brand-900 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-12 text-center text-gray-600">
            Still have a question? <Link to="/contact" className="text-brand-600 hover:text-brand-700 font-semibold">Get in touch</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
