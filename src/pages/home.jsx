
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingLink, { DISCOVERY_CALL_URL } from "@/components/BookingLink";
import useSwipe from "@/hooks/useSwipe";
import WhatsDifferent from "@/components/WhatsDifferent";
import {
  ArrowRight,
  Star,
  Users,
  User,
  Building2,
  Landmark,
  GraduationCap,
  Quote,
  TrendingUp,
  ThumbsUp,
  Award,
  MessageCircle,
  Calendar
} from "lucide-react";


const ways = [
  {
    image: "/images/christina-classroom.jpg",
    alt: "Christina in a classroom",
    title: "Online courses",
    text: "Small-group courses, live online: intensive weeks, weekly evenings, weekends, and clubs.",
    meta: "From £220",
    link: "/courses",
    cta: "See online courses",
  },
  {
    image: "/images/christina-tea.jpg",
    alt: "Christina having afternoon tea",
    title: "1-to-1 coaching",
    text: "Sessions built entirely around your goals, at any level.",
    meta: "From £75",
    href: DISCOVERY_CALL_URL,
    cta: "Book a free call",
  },
  {
    image: "/images/christina-berlin.jpg",
    alt: "Dr Christina Grey",
    position: "top",
    title: "For business",
    text: "Tailored training that helps teams speak up in meetings, presentations, and with clients.",
    meta: "Online or in person",
    link: "/business",
    cta: "Training for teams",
  },
  {
    image: "/images/cambridge.jpg",
    alt: "The Bridge of Sighs in Cambridge",
    title: "Summer retreat",
    text: "A week of English, culture, and confidence in Cambridge, UK.",
    meta: "Once a year, each summer",
    link: "/retreatregistration",
    cta: "Register your interest",
  },
];

export default function Home() {


  const statsSlides = [
    {
      icon: Star,
      stat: "4.89 / 5.0",
      label: "Overall Satisfaction",
      color: "text-brand-600",
    },
    {
      icon: ThumbsUp,
      stat: "100%",
      label: "Recommendation Rate",
      color: "text-brand-600",
    },
    {
      icon: TrendingUp,
      stat: "+45%",
      label: "Speaking Confidence Increase in Just One Week",
      color: "text-brand-600",
    },
    {
      icon: Award,
      stat: "83%",
      label: 'Rated Course Impact as "Excellent"',
      color: "text-brand-600",
    },
    {
      icon: Users,
      stat: "300+",
      label: "Successful Students",
      color: "text-brand-600",
    },
    {
      icon: GraduationCap,
      stat: "15 Years",
      label: "of Research & Teaching Experience",
      color: "text-brand-600",
    },
    {
      icon: Award,
      stat: "98.6%",
      label: "\"Strongly Agreed\" the Instructor Was Efficient, Organised, and Stimulating",
      color: "text-brand-600",
    },
    {
      icon: MessageCircle,
      stat: '"Best English course I\'ve ever attended!"',
      label: null,
      color: "text-brand-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"Your method is brilliant!"',
      label: null,
      color: "text-brand-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"I had no fear to speak."',
      label: null,
      color: "text-brand-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"Felt confident after just a few days."',
      label: null,
      color: "text-brand-400",
      isQuote: true,
    },
  ];

  const [activeStatSlide, setActiveStatSlide] = useState(0);
  const [statsPaused, setStatsPaused] = useState(false);

  const goNextStat = useCallback(() => {
    setActiveStatSlide(prev => (prev + 1) % statsSlides.length);
  }, [statsSlides.length]);

  const goPrevStat = useCallback(() => {
    setActiveStatSlide(prev => (prev - 1 + statsSlides.length) % statsSlides.length);
  }, [statsSlides.length]);

  const statsSwipe = useSwipe(goNextStat, goPrevStat);

  useEffect(() => {
    if (statsPaused) return;
    const timer = setInterval(goNextStat, 4000);
    return () => clearInterval(timer);
  }, [statsPaused, goNextStat]);

  const homeTestimonials = [
    {
      name: "Maria",
      country: "Greece",
      text: "Dr Grey's method completely changed my relationship with English. I went from being terrified to speak to actually enjoying conversations. The immersive approach made all the difference!",
    },
    {
      name: "Hannah",
      country: "Germany",
      text: "I have taken many English classes before, but I felt that I hardly made any progress. The week with you was totally different! I felt much more confident speaking English after just a few days.",
    },
    {
      name: "Hatem",
      country: "Germany",
      text: "The Unlock Fluency Signature courses were a game-changer! I loved the warm-up discussions, the idioms & expressions Christina shared with us daily, and listening to different TED talks. These last two weeks were the best of my life!",
    },
    {
      name: "Kristin",
      country: "Germany",
      text: "Your way of teaching English reminds me of how my daughter learnt to play the violin using the Suzuki method, where children play what they hear. You teach the melody of the language in a wonderful way!",
    },
    {
      name: "Leo",
      country: "Greece",
      text: "I found the method used interactive and inviting. The topics were interesting and this helped us to unlock our English fluency. I really liked that it wasn't always the English language on focus but an interesting topic.",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  const goNextTestimonial = useCallback(() => {
    setActiveTestimonial(prev => (prev + 1) % homeTestimonials.length);
  }, [homeTestimonials.length]);

  const goPrevTestimonial = useCallback(() => {
    setActiveTestimonial(prev => (prev - 1 + homeTestimonials.length) % homeTestimonials.length);
  }, [homeTestimonials.length]);

  const testimonialSwipe = useSwipe(goNextTestimonial, goPrevTestimonial);

  useEffect(() => {
    if (testimonialPaused) return;
    const timer = setInterval(goNextTestimonial, 7000);
    return () => clearInterval(timer);
  }, [testimonialPaused, goNextTestimonial]);

  const heroLines = [
    "Most of my students don't need more grammar. They need the confidence to use what they know.",
    "In my courses, you start speaking from the first minute.",
  ];

return (
    <div className="bg-white text-gray-700">
      {/* Hero Section */}
      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-600 mb-5 whitespace-nowrap">
              Courses · Coaching · Teams · Retreats
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-brand-900 mb-6">
              Unlock the English you already have.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
              {heroLines.map((line, index) => (
                <span
                  key={index}
                  className="animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none"
                  style={{ animationDelay: `${300 + index * 400}ms` }}
                >
                  {line}{" "}
                </span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold">
                  See online courses
                </Button>
              </Link>
              <BookingLink href={DISCOVERY_CALL_URL}>
                <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a free call
                </Button>
              </BookingLink>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-gray-600">
              <span><strong className="text-brand-900">4.89/5</strong> satisfaction</span>
              <span><strong className="text-brand-900">300+</strong> students</span>
              <span><strong className="text-brand-900">PhD</strong> in Linguistics</span>
            </div>
          </div>
          <div className="relative justify-self-center w-full max-w-xs sm:max-w-sm">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-brand-300" aria-hidden="true"></div>
            <img
              src="/images/christina-hero.jpg"
              alt="Dr Christina Grey"
              className="relative w-full aspect-[4/5] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Carousel */}
      <section
        className="py-12 sm:py-16 bg-white border-b border-brand-100"
        onMouseEnter={() => setStatsPaused(true)}
        onMouseLeave={() => setStatsPaused(false)}
        {...statsSwipe}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-base font-bold tracking-widest text-gray-700 uppercase mb-8 transition-opacity duration-500">
            {statsSlides[activeStatSlide]?.isQuote ? "What Students Say" : "By The Numbers"}
          </p>

          <div className="relative h-52 sm:h-44 overflow-hidden">
            {statsSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  index === activeStatSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <slide.icon className={`w-10 h-10 flex-shrink-0 ${slide.color} mb-3`} />
                <div className={`font-extrabold ${slide.isQuote ? "text-gray-900 text-2xl sm:text-4xl italic" : "text-gray-900 text-4xl sm:text-5xl"}`}>
                  {slide.stat}
                </div>
                {slide.label && (
                  <p className="text-gray-700 font-semibold mt-2 text-lg sm:text-xl max-w-lg">{slide.label}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {statsSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStatSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeStatSlide ? "bg-brand-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to stat ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="py-16 sm:py-24 bg-white">
        <WhatsDifferent intro="The Unlock Fluency Method, in plain words." />
        <div className="text-center mt-12">
          <Link to="/themethod" className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
            How the method works <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Ways to work with me */}
      <section className="py-16 sm:py-24 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-12">Ways to work with me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ways.map((way) => {
              const cta = (
                <span className="inline-flex items-center font-semibold text-brand-600 group-hover:text-brand-800">
                  {way.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              );
              return (
                <div key={way.title} className="group bg-white rounded-xl overflow-hidden border border-brand-100 flex flex-col">
                  <img src={way.image} alt={way.alt} className="w-full aspect-[4/3] object-cover" style={{ objectPosition: way.position || "center" }} />
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs font-bold tracking-wider uppercase text-brand-600 mb-2">{way.meta}</p>
                    <h3 className="text-xl font-semibold text-brand-900 mb-2">{way.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{way.text}</p>
                    {way.href ? (
                      <BookingLink href={way.href}>{cta}</BookingLink>
                    ) : (
                      <Link to={way.link}>{cta}</Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Christina */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <img
            src="/images/christina-cambridge.jpg"
            alt="Christina in Cambridge"
            className="w-full max-w-xs mx-auto aspect-[4/5] object-cover rounded-2xl"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-6">Meet Dr Christina Grey</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              I'm a psycholinguist with a PhD in Linguistics, and I've been on stage since I was a child. I trained in drama at the University of Kent and at Tufts as a Fulbright scholar, and I've spoken at conferences across Europe and the US.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My courses bring the two together: the science of how we learn languages, and the stage skills that help you speak with presence. Fluent English, and the confidence to use it.
            </p>
            <Link to="/about" className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
              My story <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section
        className="py-16 sm:py-24 bg-brand-50"
        onMouseEnter={() => setTestimonialPaused(true)}
        onMouseLeave={() => setTestimonialPaused(false)}
        {...testimonialSwipe}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-brand-900 mb-10">What Students Say</h2>

          <div className="relative h-72 sm:h-56 overflow-hidden">
            {homeTestimonials.map((t, index) => (
              <div
                key={t.name}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  index === activeTestimonial
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <Quote className="h-8 w-8 text-brand-400 mb-4" />
                <blockquote className="text-lg lg:text-xl font-medium text-gray-800 leading-relaxed italic max-w-2xl">
                  "{t.text}"
                </blockquote>
                <footer className="mt-6">
                  <div className="text-base text-gray-800 font-semibold">{t.name}, {t.country}</div>
                </footer>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {homeTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeTestimonial ? "bg-brand-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Link to="/testimonials" className="mt-8 inline-block">
            <Button variant="link" className="text-brand-600 hover:text-brand-700">
              Read more success stories <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-white">
            Ready to start speaking?
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto bg-brand-300 hover:bg-brand-200 text-brand-900 font-semibold">
                See online courses
              </Button>
            </Link>
            <BookingLink href={DISCOVERY_CALL_URL}>
              <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-brand-300 text-brand-300 hover:bg-brand-300 hover:text-brand-900 font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                Book a free call
              </Button>
            </BookingLink>
          </div>
        </div>
      </section>
    </div>);

}
