import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";
import { Gift, Presentation, Podcast, Volume2, CalendarCheck } from "lucide-react";

const perks = [
  { icon: Gift, title: "A free PDF, straight away", text: "English learning tips and resources, sent as soon as you sign up." },
  { icon: Presentation, title: "Talk of the Month", text: "A TED talk I've picked for English learners, with vocabulary and questions to think about." },
  { icon: Podcast, title: "The Podcast Edit", text: "English podcasts worth your time, with listening exercises and vocabulary highlights." },
  { icon: Volume2, title: "Voices of English", text: "A different English accent each month, with pronunciation tips and cultural insights." },
  { icon: CalendarCheck, title: "Early access", text: "Hear about new courses before anyone else, so you can book your place first." },
];

export default function Newsletter() {
  return (
    <div className="bg-white">
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-white mb-5">The Unlock Fluency Newsletter</h1>
          <p className="text-lg text-gray-300">
            One email a month to keep your English growing between courses. Free, and you can unsubscribe at any time.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl text-brand-900 mb-8">What you'll get</h2>
            <ul className="space-y-6">
              {perks.map((perk) => (
                <li key={perk.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
                    <perk.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-900">{perk.title}</h3>
                    <p className="text-gray-600">{perk.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-brand-100 p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl text-brand-900 mb-2">Sign up</h2>
            <p className="text-gray-600 mb-6">Enter your email and your free PDF is on its way.</p>
            <NewsletterForm id="newsletter-page-email" />
            <p className="text-sm text-gray-500 mt-6">
              Unsubscribe at any time with one click. See my <Link to="/privacypolicy" className="text-brand-600 hover:text-brand-700 underline">privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
