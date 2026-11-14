
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function FAQs() {
  const faqs = [
    {
      question: "What level of English do I need for the courses?",
      answer: "My method works at any level, which is why I also offer 1-to-1 coaching for beginners. My current group courses are all for B2 and above. If you're not sure of your level, get in touch and we'll work it out together."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "Not my group courses, which are all for B2 and above. For beginners, I offer 1-to-1 coaching built around you. Get in touch and tell me what you need."
    },
    {
      question: "How do I join a course?",
      answer: <>Go to my <Link to="/courses" className="text-brand-600 hover:text-brand-700">Courses</Link> page, choose a course, and click ‘Book now’. Once you've paid, you'll get a link to join the class. If there are no dates yet for the course you want, check back soon, as I add new dates regularly. My <Link to="/newsletter" className="text-brand-600 hover:text-brand-700">newsletter</Link> and <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" className="text-brand-600 hover:text-brand-700">WhatsApp community</a> hear about them first.</>
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: <>If you need to cancel, please email <a href="mailto:contact@unlockfluency.co.uk" className="text-brand-600 hover:text-brand-700">contact@unlockfluency.co.uk</a> as soon as possible. Cancellations made a week before the course start date receive a full refund. Please read the <Link to="/cancellationpolicy" className="text-brand-600 hover:text-brand-700">Cancellation Policy</Link> for more details.</>
    },
    {
      question: "Are the courses available online or in person?",
      answer: "My online courses and 1-to-1 coaching take place live on Zoom. For organisations, I deliver courses, workshops, and retreats online or in person. Once a year, I also run a summer retreat in Cambridge, UK. Please get in touch to discuss your preferences."
    },
    {
      question: "What makes The Unlock Fluency Method different?",
      answer: <>I teach English the way the brain learns languages naturally, through listening, conversation, and real situations, with grammar coming along the way. It comes from my field, psycholinguistics, which studies how we learn and use language. Textbooks and grammar drills taught many of us a lot, and now we know more about how adults learn to speak. <Link to="/themethod" className="text-brand-600 hover:text-brand-700">The Method</Link> page has the details.</>
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes! Every course ends with a Certificate of Completion."
    },
    {
      question: "Can I book a single weekend from the Weekend Boost course?",
      answer: "Yes. A single weekend (Saturday and Sunday mornings, 4 hours) is £110. Please get in touch with me directly to book your place."
    },
    {
      question: "How do I sign up for the newsletter?",
      answer: <>Visit my <Link to="/newsletter" className="text-brand-600 hover:text-brand-700">Newsletter</Link> page, or use the sign-up box at the bottom of any page. You'll get a free PDF of English learning tips straight away, then one email a month.</>
    },
    {
      question: "Do you offer courses for teams and organisations?",
      answer: "Yes! I run courses, workshops, and retreats for companies, NGOs, and other organisations, built around what your team needs. Get in touch for a personalised quote, or book a free discovery call."
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
            If your question isn't here, <Link to="/contact" className="text-brand-600 hover:text-brand-700 font-semibold">get in touch</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
