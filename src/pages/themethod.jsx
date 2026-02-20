
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Users,
  Clock,
  Lightbulb,
  Target,
  Coffee,
  BookOpen,
  Presentation,
  CheckCircle,
  ArrowRight,
  Calendar,
  Trophy,
  Search,
  Users2,
  GraduationCap,
  Heart,
  Utensils,
  Book,
  PenSquare,
  Award,
  Briefcase,
  Plane,
  BrainCircuit,
  Rocket,
  Sparkles } from
"lucide-react";

/* ── Scroll-triggered visibility hook ── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function TheMethod() {
  const methodologyHighlights = [
  { icon: MessageCircle, title: "Conversational Exercises", description: "Real-world scenarios and dialogue practice", bg: "bg-emerald-500", hoverBg: "group-hover:bg-emerald-600" },
  { icon: Users, title: "Role-play", description: "Immersive situational learning", bg: "bg-violet-500", hoverBg: "group-hover:bg-violet-600" },
  { icon: Target, title: "Discussion Groups", description: "Small group dynamics and peer learning", bg: "bg-amber-500", hoverBg: "group-hover:bg-amber-600" },
  { icon: Lightbulb, title: "Confidence-building Activities", description: "Structured exercises to build speaking confidence", bg: "bg-rose-500", hoverBg: "group-hover:bg-rose-600" }];


  const dailySchedule = [
  { time: "Morning", title: "Daily Overview", description: "Start with a daily overview and an icebreaker to warm-up.", icon: Coffee, color: "bg-sky-800" },
  { time: "Mid-Morning", title: "Theme of the Day & Role-play Exercises", description: "Introduction of the theme of the day. Example themes include: food, culture, AI, work-life balance, social media, and money. Immersive discussions in breakout rooms.", icon: Users, color: "bg-violet-800" },
  { time: "Lunch", title: "Break", description: "After a very engaging morning discussing the theme of the day, we take a lunch break to refuel and recharge.", icon: Utensils, color: "bg-amber-800" },
  { time: "Afternoon", title: "Interactive Sessions", description: "Debates based on the theme of the day. Breakout rooms where learners have a chance to practice small-talk techniques.", icon: Presentation, color: "bg-emerald-800" },
  { time: "End of Day", title: "Interactive Practice & Reflection", description: "Practice real-life scenarios. Dynamic group activities, workshops, and debates. Round off with writing exercises.", icon: CheckCircle, color: "bg-rose-800" }];

  const [activeStep, setActiveStep] = useState(0);

  const immersiveFeatures = [
  { icon: MessageCircle, text: "100% Immersion, Maximum Results: from casual small talk to professional discussions. The more you speak, the faster you improve.", bg: "bg-sky-500", hoverBg: "group-hover:bg-sky-600" },
  { icon: Trophy, text: "Confidence Over Perfection: focus on real-life communication, not just textbook rules. Learn to express your ideas naturally and confidently.", bg: "bg-amber-500", hoverBg: "group-hover:bg-amber-600" },
  { icon: CheckCircle, text: "Practical Real-life Topics: from office chats to social gatherings, the curriculum covers the conversations that matter most. Every lesson is relatable and immediately useful.", bg: "bg-emerald-500", hoverBg: "group-hover:bg-emerald-600" },
  { icon: Search, text: "Personalised Feedback: you'll receive constructive, actionable feedback, helping you sound more natural and fluent each day.", bg: "bg-violet-500", hoverBg: "group-hover:bg-violet-600" },
  { icon: Users2, text: "Community & Support: join a supportive environment! Fluency is faster when you're surrounded by practice and encouragement.", bg: "bg-rose-500", hoverBg: "group-hover:bg-rose-600" }];


  const roadmapSteps = [
  { title: "Early Passion", description: "My journey wasn't just academic; it was personal. Growing up with three languages sparked a lifelong fascination with how we learn, connect, and express ourselves. This led me down a path of deep academic enquiry.", icon: Heart },
  { title: "Academic Foundation", description: "My PhD wasn't just about theory. I studied how bilingual babies acquire language naturally, and I asked myself: why can't adults learn with that same immersive joy? That question became the foundation of my method.", icon: GraduationCap },
  { title: "Professional Experience", description: "With over a decade of teaching experience, I've spent countless hours in the classroom, observing firsthand the gap between traditional textbook learning and real-world communication. I saw students who could ace grammar tests but hesitated in simple conversations.", icon: Briefcase },
  { title: "Deepening Knowledge", description: "Having lived in many different countries and been exposed to different educational systems, I started to notice the gaps in language teaching and saw an opportunity to bridge them by applying my psycholinguistic expertise.", icon: Plane },
  { title: "Method Foundations", description: "<strong>The Unlock Fluency Method</strong> was born from this intersection of psycholinguistic theory and practical teaching experience. It's a system designed to replicate the natural, immersive way we acquire our first language.", icon: Lightbulb },
  { title: "Talk, Don't Memorise", description: "The Method moves beyond rote memorisation to build genuine, spontaneous communication skills, creating a dynamic learning environment where confidence and fluency can truly flourish.", icon: MessageCircle },
  { title: "Psycholinguistic Foundation", description: "<em> 'How do babies learn their first language? What happens to the brain when we read, speak, or listen?' </em> These are some of the questions psycholinguistics tries to answer. The Method follows the natural stages of language acquisition and engages learners through meaningful input, active use, memory support, and positive handling of errors. It focuses on the connection between language and brain.", icon: BrainCircuit },
  { title: "Beyond Fluency", description: "One of my favourite student reviews says: <em>'This isn't just an English course — it's a course about culture, life, and beyond.'</em> That perfectly reflects how I designed these courses: as engaging, immersive experiences where language is the tool, but the benefits reach far beyond.", icon: Sparkles },
  { title: "Refining the Method", description: "Synthesising a decade of research and teaching experience into a unique teaching philosophy has taught me to constantly evolve, always seeking to refine my courses and incorporate student feedback. The Method can be adapted for different age groups. So far, it has proven to be effective with learners of all ages — from young adults to mature learners.", icon: PenSquare }];


  const pastelColors = ['bg-rose-100', 'bg-teal-100', 'bg-amber-100', 'bg-sky-100', 'bg-violet-100', 'bg-lime-100', 'bg-pink-100', 'bg-cyan-100', 'bg-orange-100'];

  /* ── Scroll-triggered refs ── */
  const [featuresRef, featuresVisible] = useScrollReveal(0.1);
  const timelineRefs = useRef([]);

  const [visibleSteps, setVisibleSteps] = useState(new Set());

  useEffect(() => {
    const observers = [];
    timelineRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="bg-gray-900 text-gray-300">
      <div className="relative">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/99489a51f_ling-app-IBCrGev2Dck-unsplash.jpg"
          alt="Language learning setup"
          className="absolute inset-0 w-full h-full object-cover opacity-10" />

        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>

        <div className="relative">
          {/* Hero Section */}
          <section className="pt-20 lg:pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
                <Lightbulb className="w-4 h-4 mr-2" />
                Teaching Method
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                The Unlock Fluency Method
              </h1>

              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover how my Method transforms the way you learn and speak English through natural, conversation-focused experiences.
              </p>
            </div>
          </section>

          {/* Conception of the Method Section — Scroll-triggered */}
          <section className="pt-8 pb-16 overflow-hidden relative">
            <img src="/cambridge-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 pointer-events-none"></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="text-3xl font-bold text-center text-white mb-12">The Genesis of my Method</h2>

              <div className="relative">
                {/* Vertical line for desktop */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-stone-200 hidden md:block transform -translate-x-1/2"></div>

                {roadmapSteps.map((step, index) =>
                <div
                  key={index}
                  ref={el => timelineRefs.current[index] = el}
                  className={`mb-4 flex items-center w-full transition-all duration-700 ease-out ${
                    visibleSteps.has(index)
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-12"
                        : "opacity-0 translate-x-12"
                  } ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                    {/* Content for left side (even index) */}
                    {index % 2 === 0 &&
                  <>
                        <div className={`order-1 ${pastelColors[index % pastelColors.length]} rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4`}>
                          <h3 className="mb-3 font-bold text-slate-800 text-xl">{step.title}</h3>
                          <p className="text-sm leading-snug tracking-wide text-slate-700 text-opacity-100" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                        </div>
                        <div className="z-20 flex items-center order-2 bg-sky-500 shadow-xl w-12 h-12 rounded-full transform md:-translate-x-1/2 mx-4 md:mx-0">
                          <step.icon className="mx-auto text-slate-200" />
                        </div>
                        <div className="order-3 w-5/12 hidden md:block"></div> {/* Spacer for right side */}
                      </>
                  }

                    {/* Content for right side (odd index) */}
                    {index % 2 !== 0 &&
                  <>
                        <div className="order-1 w-5/12 hidden md:block"></div> {/* Spacer for left side */}
                        <div className="z-20 flex items-center order-2 bg-sky-500 shadow-xl w-12 h-12 rounded-full transform md:translate-x-1/3 mx-4 md:mx-0">
                          <step.icon className="mx-auto text-slate-200" />
                        </div>
                        <div className={`order-3 ${pastelColors[index % pastelColors.length]} rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4`}>
                          <h3 className="mb-3 font-bold text-slate-800 text-xl">{step.title}</h3>
                          <p className="text-sm leading-snug tracking-wide text-slate-700 text-opacity-100" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                        </div>
                      </>
                  }
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Immersive Process Infographic — with scroll-triggered entrance */}
      <section className="py-16 bg-sky-100" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How The Unlock Fluency Method Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {immersiveFeatures.map((feature, index) =>
            <Card
              key={index}
              className={`bg-white border-amber-50 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default ${
                featuresVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: featuresVisible ? `${index * 150}ms` : "0ms" }}
            >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.bg} ${feature.hoverBg} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                    <feature.icon className="w-6 h-6 text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{feature.text}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Methodology Highlights — reduced gap, hover effects */}
      <section className="pt-2 pb-16 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Method Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologyHighlights.map((item, index) =>
            <Card key={index} className="bg-white border-amber-50 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 ${item.bg} ${item.hoverBg} rounded-full flex items-center justify-center transition-colors duration-300`}>
                    <item.icon className="w-8 h-8 text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Daily Structure — Horizontal Stepper */}
      <section className="py-16 bg-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">A Typical Day in an Unlock Fluency Course</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Immersive Learning?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/courses">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-700 text-white font-semibold px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 hover:bg-sky-600">
                Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
