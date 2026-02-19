
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CertificationNote from "@/components/CertificationNote";
import {
  Building2,
  Calendar,
  Users,
  Target,
  MessageSquare,
  Presentation,
  Globe,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BarChart,
  Clock,
  MapPin,
  Sparkles
} from "lucide-react";

const painPoints = [
  {
    icon: MessageSquare,
    title: "Meetings & Negotiations",
    description: "Your team hesitates to speak up in English-language meetings, missing opportunities to share ideas and influence decisions."
  },
  {
    icon: Presentation,
    title: "Presentations & Pitches",
    description: "Presentations lack impact when delivered without confidence. Your team's expertise deserves to be communicated clearly."
  },
  {
    icon: Globe,
    title: "International Collaboration",
    description: "Cross-border projects stall when communication barriers slow down teamwork, feedback, and relationship-building."
  },
  {
    icon: Users,
    title: "Client-Facing Communication",
    description: "First impressions matter. Fluent, natural English strengthens client trust and builds lasting business relationships."
  }
];

const steps = [
  {
    number: "01",
    title: "Assess",
    description: "I start by understanding your team's current level, industry context, and specific communication goals. Every programme is built around your real-world needs."
  },
  {
    number: "02",
    title: "Immerse",
    description: "Your team is immersed in dynamic, conversation-driven sessions tailored to your industry. No textbooks — just real scenarios that mirror their daily work."
  },
  {
    number: "03",
    title: "Transform",
    description: "With consistent practice and personalised feedback, your team builds lasting fluency, confidence, and the ability to communicate spontaneously in any professional setting."
  }
];

const offerings = [
  {
    title: "Custom Unlock Fluency Course",
    description: "I bring The Unlock Fluency Method straight into your industry. Tailored to your team's daily challenges to boost confidence, clarity, and impact — right where it matters most.",
    details: [
      { icon: BarChart, label: "Length", value: "Custom" },
      { icon: Clock, label: "Duration", value: "Custom" },
      { icon: Users, label: "Participants", value: "Custom" }
    ],
    highlight: "Best for teams needing a structured programme"
  },
  {
    title: "Custom Unlock Fluency Workshop",
    description: "Need something targeted? My focused workshops use my methodology to build the exact skill your team needs: negotiating, presenting, leading meetings, or anything in between.",
    details: [
      { icon: BarChart, label: "Length", value: "Half or full day(s)" },
      { icon: Clock, label: "Duration", value: "Custom" },
      { icon: Users, label: "Participants", value: "Custom" }
    ],
    highlight: "Best for focused skill-building"
  },
  {
    title: "Custom Unlock Fluency Retreat",
    description: "Take your team's communication to the next level with a bespoke fluency retreat at any destination you choose, or in Cambridge with me. We'll combine focused English training with an unforgettable, industry-specific learning experience.",
    details: [
      { icon: BarChart, label: "Length", value: "Custom" },
      { icon: Clock, label: "Duration", value: "Custom" },
      { icon: MapPin, label: "Location", value: "Your choice or Cambridge" }
    ],
    highlight: "Best for team-building + fluency"
  }
];

const trustPoints = [
  "PhD in Linguistics, specialising in Language Acquisition",
  "10+ years of research and immersive teaching experience",
  "Psycholinguistic methodology grounded in how the brain actually acquires language",
  "Personalised skills assessment and English level report at the end of every course",
  "Flexible scheduling — online or in person, on your terms"
];

export default function Corporate() {
  useEffect(() => {
    const setmoreScript = document.createElement('script');
    setmoreScript.id = 'setmore_script';
    setmoreScript.type = 'text/javascript';
    setmoreScript.src = 'https://assets.setmore.com/integration/static/setmoreIframeLive.js';

    if (!document.getElementById('setmore_script')) {
      document.head.appendChild(setmoreScript);
    }
  }, []);

  return (
    <div className="bg-gray-900">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            Corporate English Training
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Empower Your Team to Communicate with Confidence
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            When your team speaks English with clarity and confidence, meetings run smoother, deals close faster, and international partnerships thrive. I design immersive training programmes tailored to your industry, your goals, and your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?subject=Unlock+Fluency+for+Organisations">
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 hover:bg-sky-600">
                <Calendar className="w-5 h-5 mr-2" />
                Get a Personalised Quote
              </Button>
            </Link>
            <a style={{ float: 'none', textDecoration: 'none' }} id="Setmore_button_iframe" href="https://theunlockfluencymethod.setmore.com/services/9273b47e-a6d3-4413-8922-d4ccb8b666e7">
              <Button size="lg" className="bg-sky-300 text-blue-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 hover:bg-sky-400">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Discovery Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 lg:py-24 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
              The Cost of Hesitant Communication
            </h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              Language barriers don't just slow things down — they hold your team back from reaching their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <Card key={index} className="bg-white border-sky-200">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">{point.title}</h3>
                      <p className="text-blue-800 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-blue-800 max-w-2xl mx-auto">
              My approach is built on psycholinguistic research — how the brain actually acquires and processes language. No textbooks, no grammar drills. Just real communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-sky-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-900">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">{step.title}</h3>
                <p className="text-blue-800 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block mt-6">
                    <ArrowRight className="w-6 h-6 text-blue-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Offerings */}
      <section className="py-16 lg:py-24 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
              Training Programmes
            </h2>
            <p className="text-lg text-blue-800 max-w-3xl mx-auto">
              Every programme is tailored to your organisation's goals, schedule, and industry. Available online or in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <Card key={index} className="bg-stone-200 border-stone-300 flex flex-col">
                <CardHeader className="pb-4">
                  <Badge className="bg-amber-500/20 text-amber-800 border-amber-500/30 w-fit mb-2">
                    {offering.highlight}
                  </Badge>
                  <CardTitle className="text-xl text-blue-900">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-blue-900 mb-6 leading-relaxed flex-grow">
                    {offering.description}
                  </p>

                  <div className="space-y-3 mb-6 text-sm text-blue-900">
                    {offering.details.map((detail, i) => (
                      <div key={i} className="flex items-center">
                        <detail.icon className="w-4 h-4 mr-2" />
                        <strong>{detail.label}:</strong>
                        <span className="ml-2">{detail.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link to="/contact" className="block">
                      <Button className="w-full bg-sky-200 hover:bg-sky-300 text-blue-900 font-semibold">
                        <Building2 className="w-4 h-4 mr-2" />
                        Enquire Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <CertificationNote />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
              Why The Unlock Fluency Method?
            </h2>
          </div>

          <Card className="bg-sky-100 border-sky-200">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-4">
                {trustPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-900 text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Invest in Your Team's Fluency?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get in touch to discuss your goals and receive a personalised training proposal for your organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?subject=Unlock+Fluency+for+Organisations">
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 hover:bg-sky-600">
                <Calendar className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
