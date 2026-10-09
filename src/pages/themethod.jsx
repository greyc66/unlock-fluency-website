
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WhatsDifferent from "@/components/WhatsDifferent";
import {
  Users,
  Coffee,
  Presentation,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Utensils,
  Headphones,
  MessageCircle,
  Briefcase,
  Smile
} from "lucide-react";

const principles = [
  { icon: Headphones, title: "Listen first", text: "Real TED talks, podcasts, and stories build your instinct for how English sounds before you think about rules." },
  { icon: MessageCircle, title: "Talk constantly", text: "Role-plays, discussion groups, and small breakout rooms. Most of the time, you are the one speaking." },
  { icon: Briefcase, title: "Real situations", text: "Small talk, meetings, debates, and giving your opinion: the conversations that matter in work and life." },
  { icon: Smile, title: "Feedback that builds confidence", text: "Personal, practical feedback and ready-made phrases, in a group where mistakes are part of learning." },
];

const stageSkills = ["Voice and pace", "Presence and body language", "Improvising when you don't know a word", "Handling nerves"];

export default function TheMethod() {
  const dailySchedule = [
  { time: "Morning", title: "Daily Overview", description: "Start with a daily overview and an icebreaker to warm-up.", icon: Coffee, color: "bg-brand-800" },
  { time: "Mid-Morning", title: "Theme of the Day & Role-play Exercises", description: "Introduction of the theme of the day. Example themes include: food, culture, AI, work-life balance, social media, and money. Immersive discussions in breakout rooms.", icon: Users, color: "bg-brand-800" },
  { time: "Lunch", title: "Break", description: "After a very engaging morning discussing the theme of the day, we take a lunch break to refuel and recharge.", icon: Utensils, color: "bg-brand-800" },
  { time: "Afternoon", title: "Interactive Sessions", description: "Debates based on the theme of the day. Breakout rooms where learners have a chance to practice small-talk techniques.", icon: Presentation, color: "bg-brand-800" },
  { time: "End of Day", title: "Interactive Practice & Reflection", description: "Practice real-life scenarios. Dynamic group activities, workshops, and debates. Round off with writing exercises.", icon: CheckCircle, color: "bg-brand-800" }];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-gray-700">
      {/* Hero */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl text-white mb-6">The Unlock Fluency Method</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            I teach English the way you learned your first language: by listening, talking, and using it in real situations. Grammar comes along the way.
          </p>
        </div>
      </section>

      {/* What makes it different */}
      <section className="py-16 lg:py-24 bg-white">
        <WhatsDifferent />
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="w-11 h-11 rounded-lg bg-brand-600 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the stage */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <img
            src="/images/christina-london.jpg"
            alt="Dr Christina Grey in London"
            className="w-full max-w-xs mx-auto aspect-[4/5] object-cover rounded-2xl"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-6">Skills from the stage</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I was on stage long before I became a linguist. Fluency is only half of speaking well; the other half is confidence. So alongside the English, I coach the skills actors and speakers rely on:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stageSkills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Daily Structure: Horizontal Stepper */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-4">A typical day on an intensive course</h2>
          <p className="text-center text-gray-700 mb-10">All course content is created and delivered by Dr Christina Grey</p>

          {/* Step tabs */}
          <div className="flex justify-between items-center mb-8 relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300" />
            {dailySchedule.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index === activeStep
                    ? `${item.color} shadow-lg scale-110`
                    : "bg-gray-200 group-hover:bg-gray-300"
                }`}>
                  <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                    index === activeStep ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                  }`} />
                </div>
                <span className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                  index === activeStep ? "text-gray-900" : "text-gray-500"
                }`}>
                  {item.time}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="relative h-48 sm:h-40 overflow-hidden">
            {dailySchedule.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === activeStep
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className={`${item.color} rounded-lg p-6 sm:p-8 h-full`}>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/90 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The science, briefly */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-brand-900 mb-6">The science, briefly</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Psycholinguistics studies how the brain learns and uses language. The method follows the natural stages of language acquisition: meaningful input, active use, memory support, and a positive approach to mistakes.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            It grew out of my PhD research on how bilingual children learn languages naturally, and 15 years of teaching adults.
          </p>
          <Link to="/about" className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
            My story <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-8">Ready to try it?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 h-11">
                <BookOpen className="w-5 h-5 mr-2" />
                See online courses
              </Button>
            </Link>
            <Link to="/business">
              <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-brand-900 px-8 text-sm font-semibold h-11">
                For business <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
