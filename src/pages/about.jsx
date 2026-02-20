
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSwipe from "@/hooks/useSwipe";
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
  Coffee,
  Quote,
  TrendingUp
} from "lucide-react";

/* ── Animated counter hook ── */
function useCountUp(end, duration = 2000, startCounting = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startCounting]);
  return value;
}

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
      { icon: Globe, text: "I live in Cambridge, UK.", bg: "bg-indigo-100", color: "text-indigo-700" },
      { icon: Leaf, text: "Proud plant-eater.", bg: "bg-emerald-100", color: "text-emerald-700" },
      { icon: Book, text: "Self-proclaimed book addict.", bg: "bg-violet-100", color: "text-violet-700" },
      { icon: Utensils, text: "Favourite food: pancakes.", bg: "bg-amber-100", color: "text-amber-700" },
      { icon: Heart, text: "There's no such thing as too much cinnamon.", bg: "bg-rose-100", color: "text-rose-700" },
      { icon: Coffee, text: "Matcha lover.", bg: "bg-green-100", color: "text-green-700" }
  ];

  /* ── Testimonial carousels ── */
  const leftQuotes = [
    { text: "Christina made me feel safe to make mistakes. That changed everything for me.", name: "Maria", country: "Greece" },
    { text: "I felt much more confident speaking English after just a few days.", name: "Hannah", country: "Germany" },
    { text: "I had no fear to speak.", name: "Hatem", country: "Germany" },
  ];

  const rightQuotes = [
    { text: "Felt confident after just a few days. This method really works!", name: "Kristin", country: "Germany" },
    { text: "Best English course I've ever attended!", name: "Leo", country: "Greece" },
    { text: "Your method is brilliant!", name: "Maria", country: "Greece" },
  ];

  const [leftActive, setLeftActive] = useState(0);
  const [rightActive, setRightActive] = useState(0);
  const [leftPaused, setLeftPaused] = useState(false);
  const [rightPaused, setRightPaused] = useState(false);

  const leftLen = leftQuotes.length;
  const rightLen = rightQuotes.length;

  const goNextLeft = useCallback(() => {
    setLeftActive(prev => (prev + 1) % leftLen);
  }, [leftLen]);
  const goPrevLeft = useCallback(() => {
    setLeftActive(prev => (prev - 1 + leftLen) % leftLen);
  }, [leftLen]);

  const goNextRight = useCallback(() => {
    setRightActive(prev => (prev + 1) % rightLen);
  }, [rightLen]);
  const goPrevRight = useCallback(() => {
    setRightActive(prev => (prev - 1 + rightLen) % rightLen);
  }, [rightLen]);

  const leftSwipe = useSwipe(goNextLeft, goPrevLeft);
  const rightSwipe = useSwipe(goNextRight, goPrevRight);

  useEffect(() => {
    if (leftPaused) return;
    const timer = setInterval(goNextLeft, 5000);
    return () => clearInterval(timer);
  }, [leftPaused, goNextLeft]);

  useEffect(() => {
    if (rightPaused) return;
    const timer = setInterval(goNextRight, 6000);
    return () => clearInterval(timer);
  }, [rightPaused, goNextRight]);

  /* ── Stats counter ── */
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const studentsCount = useCountUp(300, 1800, statsVisible);
  const yearsCount = useCountUp(15, 1400, statsVisible);
  const satisfactionCount = useCountUp(4.89, 1600, statsVisible);
  const recommendCount = useCountUp(100, 1500, statsVisible);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Photo with decorative accent */}
            <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-sky-400/20 rounded-2xl" />
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/39b956fec_IMG_45862.jpg"
                  alt="Dr Grey"
                  className="relative aspect-[4/5] w-full max-w-xs object-cover rounded-2xl border border-gray-700 shadow-lg"
                />
              </div>
            </div>
            {/* Text column with animated entrance */}
            <div className={`lg:text-left transition-all duration-1000 ease-out delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
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
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {qualification}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Counters */}
      <section ref={statsRef} className="py-12 sm:py-16 bg-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-sky-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {studentsCount}+
              </div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Successful Students</p>
            </div>
            <div className="flex flex-col items-center">
              <GraduationCap className="w-8 h-8 text-violet-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {yearsCount}+
              </div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Years Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {typeof satisfactionCount === 'number' ? satisfactionCount.toFixed(2) : satisfactionCount}
              </div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Overall Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="w-8 h-8 text-emerald-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {recommendCount}%
              </div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Recommendation Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy – Split Layout with Large Pull Quote */}
      <section className="py-16 lg:py-24 bg-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">
            My Teaching Philosophy
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Left: Large pull quote */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <Quote className="w-10 h-10 text-sky-400 mb-4" />
              <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug italic">
                "True language mastery is built on connection, not perfection."
              </blockquote>
              <div className="w-16 h-1 bg-sky-400 mt-6 mb-4 rounded-full" />
              <p className="text-gray-600 font-semibold text-base">— Dr Christina Grey</p>
            </div>

            {/* Right: Paragraph text */}
            <div className="lg:col-span-3">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Growing up with three languages sparked my fascination with how the brain acquires and processes them, leading me to earn a BA in Linguistics, an MA in Experimental Psycholinguistics, and a PhD focused on bilingualism. With over 10 years of teaching experience, I draw on this deep understanding of how languages function at the most basic level to create courses that replicate natural language acquisition.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                My unconventional, conversation-oriented methodology gave rise to <Link to="/themethod" className="text-sky-600 hover:text-sky-800 font-bold">The Unlock Fluency Method</Link>, an immersive learning method designed to provide dynamic, real-life learning experiences that empower learners to speak with confidence, spontaneity, and authenticity. Every lesson becomes an opportunity for meaningful communication and shared growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pt-4 pb-12 lg:pt-6 lg:pb-16 bg-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white border border-white">
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

      {/* Fun Facts Section - Pills/Chips Style */}
      <section className="pt-0 pb-8 lg:pt-0 lg:pb-12 bg-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Some Facts about Me</h3>
          </div>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className={`${fact.bg} ${fact.color} flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium shadow-sm`}
              >
                <fact.icon className="w-4 h-4 flex-shrink-0" />
                <span>{fact.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quote Carousels */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left carousel */}
            <div
              className="text-center md:text-left"
              onMouseEnter={() => setLeftPaused(true)}
              onMouseLeave={() => setLeftPaused(false)}
              {...leftSwipe}
            >
              <div className="relative h-40 sm:h-36 overflow-hidden">
                {leftQuotes.map((q, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                      index === leftActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
                  >
                    <Quote className="w-7 h-7 text-sky-400 mb-3 mx-auto md:mx-0 flex-shrink-0" />
                    <blockquote className="text-lg text-gray-800 italic leading-relaxed mb-3">
                      "{q.text}"
                    </blockquote>
                    <p className="text-gray-500 font-semibold text-sm">— {q.name}, {q.country}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center md:justify-start gap-1.5 mt-4">
                {leftQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setLeftActive(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === leftActive ? "bg-sky-500" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right carousel */}
            <div
              className="text-center md:text-left md:border-l md:border-gray-200 md:pl-12"
              onMouseEnter={() => setRightPaused(true)}
              onMouseLeave={() => setRightPaused(false)}
              {...rightSwipe}
            >
              <div className="relative h-40 sm:h-36 overflow-hidden">
                {rightQuotes.map((q, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                      index === rightActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
                  >
                    <Quote className="w-7 h-7 text-sky-400 mb-3 mx-auto md:mx-0 flex-shrink-0" />
                    <blockquote className="text-lg text-gray-800 italic leading-relaxed mb-3">
                      "{q.text}"
                    </blockquote>
                    <p className="text-gray-500 font-semibold text-sm">— {q.name}, {q.country}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center md:justify-start gap-1.5 mt-4">
                {rightQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setRightActive(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === rightActive ? "bg-sky-500" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Approach - with hover effects */}
      <section className="pt-4 pb-16 lg:pt-6 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">A Psycholinguistic Approach to Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) =>
              <Card key={index} className="bg-sky-100 border-sky-300 text-center hover:-translate-y-2 hover:shadow-xl hover:border-sky-400 transition-all duration-300 group cursor-default">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-400 group-hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <approach.icon className="w-8 h-8 text-blue-900 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    {approach.title}
                  </h3>
                  <p className="text-blue-800 leading-relaxed">
                    {approach.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-950/50">
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
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md hover:bg-sky-600">
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
