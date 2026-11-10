
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
  Puzzle,
  Headphones,
  MessageCircle,
  Briefcase,
  Smile
} from "lucide-react";

const principles = [
  { icon: Headphones, title: "Listen first", text: "You listen to real TED talks, podcasts, and stories, so you get a feel for how English sounds before you worry about the rules." },
  { icon: MessageCircle, title: "Talk constantly", text: "Role-plays, discussions, and small breakout rooms. Most of the time, you're the one talking." },
  { icon: Briefcase, title: "Real situations", text: "We practise the conversations you actually have, like small talk, meetings, debates, and giving your opinion." },
  { icon: Smile, title: "Feedback you can use", text: "I tell you what worked and what to try next, and give you ready-made phrases to lean on. Everyone makes mistakes, me included." },
];

const stageSkills = ["Voice and pace", "Presence and body language", "Improvising when you don't know a word", "Handling nerves"];

export default function TheMethod() {
  const dailySchedule = [
  { time: "Icebreaker", title: "Priming: getting ready", description: "A look at the day ahead, then an icebreaker or a game to get everyone talking, coffee optional.", icon: Smile, color: "bg-brand-800" },
  { time: "Warm-up", title: "Activation: waking up what you know", description: "You talk about the day's theme in pairs, in breakout rooms, with the day's bridges to hand. Cambridge has plenty of bridges, but none of them has saved as many conversations as ‘That's a fair point, but…’. No punt required.", icon: MessageCircle, color: "bg-brand-800" },
  { time: "Small talk", title: "Interaction: using it with someone else", description: "After a short break, you practise the chat before a meeting starts or over coffee, in pairs. The British have had centuries of practice, and now it's your turn.", icon: Coffee, color: "bg-brand-800" },
  { time: "Jigsaw", title: "Input: taking in something new", description: "Each team gets one piece of the day's theme (e.g. a TED talk or a podcast), and you put the picture together by explaining your piece to the other team. Like a jigsaw, but nobody has to do the sky.", icon: Puzzle, color: "bg-brand-800" },
  { time: "Role-plays", title: "Automatisation: practising until it's second nature", description: "After lunch, you act out real situations from work and everyday life in pairs, with a simple way to acknowledge, respond, and close a conversation.", icon: Users, color: "bg-brand-800" },
  { time: "Debate", title: "Pushed output: putting it all together", description: "We finish with a debate or a presentation in two teams. Each team prepares its case and takes the floor, and the other team is ready with tough questions. It's all very friendly, until someone mentions the prizes.", icon: Presentation, color: "bg-brand-800" }];

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
              I was on stage long before I became a linguist, and every actor knows that learning your lines is only half the job. The other half is saying them while a room full of people looks at you. So alongside the English, I teach the skills actors and speakers rely on:
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
          <p className="text-center text-gray-700 mb-10">I write and teach every lesson myself.</p>

          {/* Step tabs */}
          <div className="flex justify-between items-start mb-8 relative">
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
                <span className={`mt-2 text-xs sm:text-sm font-medium text-center leading-tight transition-colors duration-300 ${
                  index === activeStep ? "text-gray-900" : "text-gray-500"
                }`}>
                  {item.time}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="grid">
            {dailySchedule.map((item, index) => (
              <div
                key={index}
                className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
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
            When I tell my students that toddlers say things like ‘goed’ and ‘mouses’, they usually laugh. Then I tell them it's one of the best signs we have that a child is learning, because they've worked out the rules for the past tense and for plurals and are using them everywhere, even where English breaks its own rules. Adults do the same, so in my courses a mistake like that counts as progress.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            That's psycholinguistics, the study of how the brain learns and uses language. My PhD was on how bilingual children pick up language, and after 15 years of research and teaching, I teach adults in the same natural order: plenty of listening, plenty of speaking, help with remembering, and a relaxed attitude to mistakes.
          </p>
          <Link to="/my-story" className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
            My story <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-8">Try it for yourself</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 h-11">
                <BookOpen className="w-5 h-5 mr-2" />
                See courses
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
