
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useSwipe from "@/hooks/useSwipe";
import {
  ArrowRight,
  Star,
  Users,
  User,
  GraduationCap,
  Sparkles,
  Quote,
  Building2,
  TrendingUp,
  ThumbsUp,
  Award,
  MessageCircle,
  Calendar
} from "lucide-react";

export default function Home() {

  useEffect(() => {
    if (!document.getElementById('setmore_script')) {
      const setmoreScript = document.createElement('script');
      setmoreScript.id = 'setmore_script';
      setmoreScript.type = 'text/javascript';
      setmoreScript.src = 'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
      document.head.appendChild(setmoreScript);
    }
  }, []);

  const statsSlides = [
    {
      icon: Star,
      stat: "4.89 / 5.0",
      label: "Overall Satisfaction",
      color: "text-amber-500",
    },
    {
      icon: ThumbsUp,
      stat: "100%",
      label: "Recommendation Rate",
      color: "text-emerald-600",
    },
    {
      icon: TrendingUp,
      stat: "+45%",
      label: "Speaking Confidence Increase in Just One Week",
      color: "text-sky-600",
    },
    {
      icon: Award,
      stat: "83%",
      label: 'Rated Course Impact as "Excellent"',
      color: "text-rose-500",
    },
    {
      icon: Users,
      stat: "300+",
      label: "Successful Students",
      color: "text-violet-600",
    },
    {
      icon: GraduationCap,
      stat: "15 Years",
      label: "of Research & Teaching Experience",
      color: "text-amber-500",
    },
    {
      icon: Award,
      stat: "98.6%",
      label: "\"Strongly Agreed\" the Instructor Was Efficient, Organised, and Stimulating",
      color: "text-emerald-600",
    },
    {
      icon: MessageCircle,
      stat: '"Best English course I\'ve ever attended!"',
      label: null,
      color: "text-rose-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"Your method is brilliant!"',
      label: null,
      color: "text-rose-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"I had no fear to speak."',
      label: null,
      color: "text-rose-400",
      isQuote: true,
    },
    {
      icon: MessageCircle,
      stat: '"Felt confident after just a few days."',
      label: null,
      color: "text-rose-400",
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

  const heroSentences = [
    "The words are there... but accessing them feels impossible.",
    "You've taken courses. Practised grammar. But nothing clicks.",
    "Your English isn't broken. It's blocked.",
    "The Unlock Fluency Method changes that.",
  ];

  const [visibleSentences, setVisibleSentences] = useState(0);

  useEffect(() => {
    if (visibleSentences >= heroSentences.length) return;
    const timer = setTimeout(() => {
      setVisibleSentences(prev => prev + 1);
    }, visibleSentences === 0 ? 800 : 2000);
    return () => clearTimeout(timer);
  }, [visibleSentences, heroSentences.length]);

  const categories = [
  {
    icon: Users,
    title: "Unlock Fluency for Individuals",
    description: "Join immersive courses designed to transform how you communicate. Speak with clarity, charisma, and confidence in any situation.",
    link: "/courses",
    cta: "Explore Courses"
  },
  {
    icon: User,
    title: "One-to-one Personalised Coaching",
    description: "Receive personalised, intensive training tailored to your unique goals and learning style.",
    link: "/contact?subject=1-to-1+Personalised+Coaching",
    cta: "Book a Session"
  },
  {
    icon: Building2,
    title: "Unlock Fluency for Organisations",
    description: "Unlock your team's global voice. Join immersive English courses tailored for companies, NGOs, and international teams.",
    link: "/corporate",
    cta: "Learn More"
  }];


  const differentiators = [
  {
    icon: GraduationCap,
    title: "PhD Level Expertise",
    description: "Learn from Dr Grey, an expert in Linguistics with 10+ years of experience."
  },
  {
    icon: Sparkles,
    title: "Immersive Method",
    description: "Go beyond theory. The Unlock Fluency courses build practical skills and lasting confidence."
  },
  {
    icon: Star,
    title: "Proven Results",
    description: "Join a vibrant community of students who have transformed their English fluency."
  }];


return (
    <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gray-900/60"></div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center flex flex-col justify-between min-h-[60vh]">
          <div className="flex-grow flex flex-col justify-center">
            {/* Foreground logo remains */}
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/d415b06e7_logo_updated.png"
              alt="Unlock Fluency Logo"
              className="h-24 sm:h-32 lg:h-40 mx-auto mb-8 object-contain"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">The Unlock Fluency Method</h1>
            <div className="text-base lg:text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed space-y-2">
              {heroSentences.map((sentence, index) => (
                <span
                  key={index}
                  className={`transition-all duration-700 ease-in-out ${
                    index < visibleSentences
                      ? "opacity-100"
                      : "opacity-0"
                  } ${index === heroSentences.length - 1 ? "block text-sky-300 font-semibold mt-2" : "inline"}`}
                >
                  {sentence}{index < heroSentences.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="pb-8">
            <Link to="/courses"> {/* Changed to /courses */}
              <Button size="lg" className="bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold shadow-lg shadow-sky-500/20">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Stats Carousel */}
      <section
        className="py-12 sm:py-16 bg-sky-100"
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
                  index === activeStatSlide ? "bg-emerald-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to stat ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Method Teaser Section - Darkest Navy */}
      <section className="py-16 sm:py-24 bg-sky-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            A Psycholinguistic Approach to English Learning
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Discover The Unlock Fluency Method: a groundbreaking teaching approach that draws from research at the intersection of cognitive science and the neuroscience of language and combines it with immersive, conversation-focused experiences. Unlock the confidence to express yourself effortlessly; in English and in life.
          </p>
          <Link to="/themethod"> {/* Changed to /themethod */}
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 shadow-lg">
              Discover The Method <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      

            {/* Dr. Grey Intro Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1 flex justify-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/39b956fec_IMG_45862.jpg"
                alt="Dr. Christina Grey"
                className="aspect-[4/5] w-full max-w-xs object-cover rounded-2xl border-2 border-gray-200 shadow-xl"
              />
            </div>
            <div className="md:col-span-2">
             <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Your Fluency Coach: <br /> Meet Dr Christina Grey
          </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hello! I'm Dr Grey, a psycholinguist with a passion for helping people connect through language. I don't just teach English; I teach you how to think, feel, and communicate with confidence. My method is built from a decade of research, but my teaching is built on personal connection. Let's start your journey together. To learn more about me, please visit my <Link to="/about" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">About</Link> page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Dark Navy */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) =>
            <Card key={category.title} className="bg-white border-gray-200 hover:border-gray-300 hover:-translate-y-1 transition-transform duration-300 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-green-600 group-hover:bg-green-700 rounded-lg flex items-center justify-center mb-6 transition-colors">
                    <category.icon className="w-6 h-6 text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <Link to={category.link} className="font-semibold text-emerald-600 group-hover:text-blue-800 transition-colors flex items-center">
                    {category.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Differentiators Section - Medium Navy */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="text-center">
              <Link to="/themethod" className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl hover:text-gray-900 transition-colors"> {/* Changed to /themethod */}
                The Unlock Fluency Method
              </Link>
              <p className="mt-4 text-lg text-gray-700">
                Go beyond traditional textbook learning with a method designed for results. I’m here to help you speak with confidence, ease, and a presence that stands out.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-3">
              {differentiators.map((item) =>
              <div key={item.title} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 mx-auto">
                    <item.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-700">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section
        className="py-16 sm:py-24 bg-sky-100"
        onMouseEnter={() => setTestimonialPaused(true)}
        onMouseLeave={() => setTestimonialPaused(false)}
        {...testimonialSwipe}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10">What Students Say</h2>

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
                <Quote className="h-8 w-8 text-rose-400 mb-4" />
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
                  index === activeTestimonial ? "bg-emerald-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Link to="/testimonials" className="mt-8 inline-block">
            <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
              Read more success stories <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA - Lightest Navy */}
      <section className="py-16 sm:py-24 bg-sky-100">
        <div className="max-w-3xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Ready to Begin Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">Take the first step towards fluent, confident communication.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg">
                Get in Touch
              </Button>
            </Link>
            <a style={{ float: 'none', textDecoration: 'none' }} id="Setmore_button_iframe" href="https://theunlockfluencymethod.setmore.com/services/9273b47e-a6d3-4413-8922-d4ccb8b666e7">
              <Button size="lg" className="bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Discovery Call
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>);

}
