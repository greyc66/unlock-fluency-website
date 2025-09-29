
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  Globe,
  Award,
  BookOpen,
  MessageCircle,
  Calendar,
  CheckCircle,
  Star,
  Heart,
  Lightbulb,
  Book,
  Utensils,
  Leaf,
  Coffee
} from "lucide-react";

export default function About() {
  const qualifications = [
    "PhD in Linguistics, specialising in Language Acquisition",
    "10+ Years of Research & Teaching Experience",
    "Specialist in Communicative, Immersive Courses"
  ];

  const approaches = [
    {
      icon: MessageCircle,
      title: "Communication-Focused",
      description: "Real-world conversation skills that you can use immediately in your daily life and career."
    },
    {
      icon: Heart,
      title: "Supportive Environment",
      description: "A safe, encouraging space where making mistakes is part of the learning process."
    },
    {
      icon: Lightbulb,
      title: "Innovative Methods",
      description: "Cutting-edge teaching techniques based on the latest research in language acquisition."
    },
    {
      icon: Users,
      title: "Personalised Approach",
      description: "Every student's journey is unique, with customised feedback and individual attention."
    }
  ];

  const funFacts = [
      { icon: Globe, text: "I live in Cambridge, UK." },
      { icon: Leaf, text: "Proud plant-eater." },
      { icon: Book, text: "Self-proclaimed book addict." },
      { icon: Utensils, text: "Favourite food: pancakes." },
      { icon: Heart, text: "There's no such thing as too much cinnamon." },
      { icon: Coffee, text: "Matcha lover." }
  ]

  return (
    <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/39b956fec_IMG_45862.jpg"
                alt="Dr Grey"
                className="aspect-[4/5] w-full max-w-xs object-cover rounded-2xl border border-gray-700 shadow-lg"
              />
            </div>
            <div className="lg:text-left">
              <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Psycholinguist, English Coach
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-left">
                Meet Dr Christina Grey
              </h1>

              <div className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed text-left">
                I've always been passionate about overcoming language barriers. As a trained psycholinguist, I have studied the psychology of language extensively, specialising in bilingual language acquisition. My teaching style goes beyond textbooks and traditional exercises.
              </div>

              <div className="space-y-3 mb-8">
                {qualifications.map((qualification, index) =>
                  <div key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    {qualification}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-16 lg:py-24 bg-gray-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              My Teaching Philosophy
            </h2>
          </div>

          <Card className="bg-teal-800/70 border border-teal-700">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-gray-200 prose-blockquote:text-gray-300 prose-p:text-gray-200">
                <blockquote className="text-lg md:text-xl leading-relaxed mb-6 border-l-gray-400 text-center">
                 "I firmly believe that true language mastery is built on connection, not perfection. I transform every lesson into an opportunity for meaningful communication and shared growth."
                </blockquote>
                <div className="text-base md:text-lg text-left leading-relaxed">
                  Growing up with three languages sparked my fascination with how the brain acquires and processes them, leading me to earn a BA in Linguistics, an MA in Experimental Psycholinguistics, and a PhD focused on bilingualism. With over 10 years of teaching experience, I draw on this deep understanding of how languages function at the most basic level to create courses that replicate natural language acquisition. My unconventional, conversation-oriented methodology gave rise to <Link to="/themethod" className="text-amber-400 hover:text-amber-300 font-bold">The Unlock Fluency Method</Link>, an immersive learning method designed to provide dynamic, real-life learning experiences that empower learners to speak with confidence, spontaneity, and authenticity. Every lesson becomes an opportunity for meaningful communication and shared growth.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-stone-200 border border-stone-300">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">Academic & Professional Journey</h3>
              
              <div className="flex justify-center">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/3d1d30fd0_CGAcademicandprofjourneyforwebsitecopynotitleupdate.jpg" 
                  alt="Academic and Professional Journey Timeline" 
                  className="w-full max-w-2xl h-auto object-contain rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Fun Facts Section - Moved up with reduced padding */}
       <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-purple-200 border-purple-300">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Some (Fun?) Facts about Me</h3>
              </div>
              <div className="flex justify-center items-center gap-x-4 gap-y-2 md:gap-x-6 mt-4 flex-wrap">
                  {funFacts.map((fact, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-900 text-sm md:text-base">
                          <fact.icon className="w-4 h-4"/>
                          <span>{fact.text}</span>
                      </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </section>

      {/* Teaching Approach */}
      <section className="py-16 lg:py-24 bg-gray-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">A Psycholinguistic Approach to Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) =>
              <Card key={index} className="bg-teal-800/50 border-teal-700 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-teal-700 rounded-full flex items-center justify-center">
                    <approach.icon className="w-8 h-8 text-teal-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {approach.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {approach.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Unlock Fluency Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your goals and create a personalised plan for your
            English success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md hover:bg-amber-600">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
