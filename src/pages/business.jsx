
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingLink, { DISCOVERY_CALL_URL } from "@/components/BookingLink";
import {
  Calendar,
  Building2,
  Headphones,
  MessageCircle,
  Briefcase,
  BookOpen,
  Quote,
  CheckCircle
} from "lucide-react";

const QUOTE_URL = "/contact?subject=Unlock+Fluency+for+Business";

const results = [
  { stat: "96%", label: "report greater speaking confidence" },
  { stat: "91%", label: "feel better prepared for professional communication" },
  { stat: "9.7/10", label: "average satisfaction score" },
  { stat: "100%", label: "would recommend it to colleagues" },
];

const principles = [
  { icon: Headphones, title: "Listen first", text: "Listening builds the instinct before the rules." },
  { icon: MessageCircle, title: "Talk constantly", text: "Every session is interactive and speaking-heavy." },
  { icon: Briefcase, title: "Real situations", text: "Meetings, calls, negotiations, and everyday workplace conversations." },
  { icon: BookOpen, title: "Stories and scenarios", text: "Memorable stories and role-plays that stay with people." },
];

const formats = [
  { name: "Intensive course", detail: "A focused week, typically 30 hours, for a big step forward." },
  { name: "Weekly course", detail: "Regular sessions that fit around work and build fluency over time." },
  { name: "Workshop", detail: "Half or full day on one skill, such as presenting, negotiating, or leading meetings." },
  { name: "Retreat", detail: "Training and team experience together, in Cambridge or a destination you choose." },
  { name: "1-to-1 coaching", detail: "Individual sessions for leaders and managers." },
];

const everyProgramme = [
  "Online, in person, or hybrid",
  "Content built around your team's work and industry",
  "For B1/B2 level and above",
  "Group size to suit your team",
];

const steps = [
  { title: "Discovery call", text: "Free, 20 minutes. We talk about your team's goals first." },
  { title: "Free taster session", text: "90 minutes for your team to try the method for themselves." },
  { title: "Tailored programme", text: "Content, format, and schedule built around your people." },
  { title: "Assessment and next steps", text: "A certificate, a personalised skills assessment, an English level report, and a roadmap for each participant." },
];

const quotes = [
  { text: "I can now express myself spontaneously and clearly in meetings.", who: "Manager, European corporate" },
  { text: "I was really surprised at how comfortable I was speaking English by day 5. It really worked.", who: "Participant, intensive week" },
  { text: "The Unlock Fluency course was both an English course and a personal development workshop.", who: "Senior professional, international NGO" },
];

export default function Business() {

  const ctaButtons = (
    <div className="flex flex-col sm:flex-row gap-4">
      <BookingLink href={DISCOVERY_CALL_URL}>
        <Button size="lg" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11">
          <Calendar className="w-5 h-5 mr-2" />
          Book a free discovery call
        </Button>
      </BookingLink>
      <Link to={QUOTE_URL}>
        <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-brand-900 font-semibold h-11">
          Get a personalised quote
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-sky-300 mb-5">For business</p>
            <h1 className="text-4xl lg:text-5xl leading-tight text-white mb-6">
              Your teams don't have an English problem. They have a confidence problem.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              They already speak English. They know the grammar and the vocabulary. But when the meeting starts, they freeze, translate in their heads, and hold back. The Unlock Fluency Method changes that.
            </p>
            {ctaButtons}
          </div>
          <img
            src="/images/christina-conference.jpg"
            alt="Christina presenting at a conference"
            className="w-full aspect-[4/3] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Results */}
      <section className="py-14 lg:py-16 bg-white border-b border-brand-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {results.map((r) => (
              <div key={r.stat}>
                <p className="font-display text-4xl lg:text-5xl text-brand-900">{r.stat}</p>
                <p className="mt-2 text-gray-600">{r.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Self-reported results from 300+ participant evaluations across corporate and professional programmes.
          </p>
        </div>
      </section>

      {/* The method */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-5">A different way to learn English</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I teach English the way children learn their first language: by listening, talking, and using it in real situations. English becomes a tool for getting work done, not a subject to be tested on.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="w-11 h-11 rounded-lg bg-brand-600 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-900 mb-1">{p.title}</h3>
                <p className="text-gray-600">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-brand-100 p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
            <img
              src="/images/christina-evening.jpg"
              alt="Dr Christina Grey"
              className="w-32 h-32 rounded-full object-cover object-top mx-auto"
            />
            <div>
              <h3 className="text-xl font-semibold text-brand-900 mb-2">Presence, not just grammar</h3>
              <p className="text-gray-700 leading-relaxed">
                I design and teach every programme myself. I'm a psycholinguist with a PhD in Linguistics and more than 15 years of research and teaching. I also trained in drama and have spoken at conferences in the UK, the US, and across Europe, so alongside fluency I coach the skills that make a room listen: voice, pace, structure, and handling nerves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-5">Built around your team</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              For international teams, leaders and managers, multinationals, and NGOs, on any topic from marketing, HR, and legal to finance and leadership.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            <dl className="divide-y divide-brand-100 border-y border-brand-100">
              {formats.map((f) => (
                <div key={f.name} className="py-4 grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1 sm:gap-6">
                  <dt className="font-semibold text-brand-900">{f.name}</dt>
                  <dd className="text-gray-600">{f.detail}</dd>
                </div>
              ))}
            </dl>
            <div className="bg-brand-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-brand-900 mb-4">Every programme</h3>
              <ul className="space-y-3 mb-6">
                {everyProgramme.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={QUOTE_URL}>
                <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11">
                  <Building2 className="w-4 h-4 mr-2" />
                  Enquire now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-12">How it works</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-white rounded-xl border border-brand-100 p-6">
                <span className="font-display text-3xl text-brand-600">{index + 1}</span>
                <h3 className="text-lg font-semibold text-brand-900 mt-2 mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What participants say */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-12">What participants say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <figure key={q.who} className="bg-brand-50 rounded-xl p-6">
                <Quote className="w-7 h-7 text-brand-400 mb-3" />
                <blockquote className="text-lg text-brand-900 italic leading-relaxed">"{q.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gray-600">{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Book a free 20-minute discovery call</h2>
          <p className="text-lg text-gray-300 mb-8">
            Tell me about your team's goals, and we'll book your free 90-minute taster session so your team can experience the method first-hand.
          </p>
          <div className="flex justify-center">{ctaButtons}</div>
        </div>
      </section>
    </div>
  );
}
