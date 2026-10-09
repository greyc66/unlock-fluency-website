import React from "react";
import { MessageCircle, Newspaper, Sparkles } from "lucide-react";

const points = [
  {
    icon: MessageCircle,
    title: "You do the talking",
    text: "Most of every session is you speaking, not listening to a teacher. The more you speak, the faster your fluency grows.",
  },
  {
    icon: Newspaper,
    title: "Real topics, not textbooks",
    text: "We talk about things that matter: work, culture, technology, and life. You learn the English you actually need, in context.",
  },
  {
    icon: Sparkles,
    title: "Confidence first",
    text: "Mistakes are welcome. Techniques from the stage help with your voice, presence, and nerves, so you speak up when it counts.",
  },
];

export default function WhatsDifferent({ heading = "What makes it different", intro }) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl lg:text-4xl text-brand-900">{heading}</h2>
        {intro && <p className="mt-4 text-lg text-gray-600">{intro}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {points.map((point) => (
          <div key={point.title}>
            <div className="w-12 h-12 rounded-lg bg-brand-600 flex items-center justify-center mb-5">
              <point.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-brand-900 mb-2">{point.title}</h3>
            <p className="text-gray-600 leading-relaxed">{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
