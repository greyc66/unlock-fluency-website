
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useSwipe from "@/hooks/useSwipe";
import {
  GraduationCap,
  Users,
  Globe,
  BookOpen,
  CheckCircle,
  Star,
  Heart,
  Book,
  Utensils,
  Leaf,
  Coffee,
  Quote,
  TrendingUp,
  ArrowRight,
  Building2
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

const qualifications = [
  "PhD in Linguistics (Humboldt-Universität zu Berlin and University of Cambridge)",
  "Drama training at the University of Kent and Tufts University (Fulbright scholar)",
  "15+ years of research and teaching",
];

const chapters = [
  {
    title: "The scientist",
    photos: [
      { src: "/images/christina-graduation.jpg", alt: "Christina at her graduation" },
      { src: "/images/christina-research-poster.jpg", alt: "Christina presenting her research poster" },
      { src: "/images/christina-award.jpg", alt: "Christina holding a research award" },
    ],
    text: [
      "That curiosity became a career in linguistics: a BA in English Language and Linguistics, an MSc in Literature, an MA in Linguistics, and a PhD in Linguistics at Humboldt-Universität zu Berlin and the University of Cambridge.",
      "For my PhD I studied how bilingual children acquire language naturally, and I kept asking myself: why can't adults learn with that same immersive joy? Along the way, my research has also been recognised with an award.",
    ],
  },
  {
    title: "The performer",
    photos: [
      { src: "/images/christina-presenting.jpg", alt: "Christina presenting at a conference" },
    ],
    text: [
      "I never really left the stage. I studied drama at the University of Kent, then spent a year at Tufts University in the US as a Fulbright scholar in Theatre Studies. Since then I've presented my work at conferences in the UK, the US, Greece, Germany, Ireland, the Netherlands, and beyond.",
      "Theatre taught me what textbooks don't: how to use your voice, hold a room, and keep going when the nerves kick in. I bring those techniques into every course.",
    ],
  },
  {
    title: "The teacher",
    photos: [],
    text: [
      "I've taught English since 2012, from private tutoring and language schools to many years at the Volkshochschule (VHS) in Berlin.",
      "Having lived in different countries and seen different education systems, I kept meeting the same learner: someone who could ace a grammar test but froze in a simple conversation.",
    ],
  },
];

const journey = [
  { year: "2008", title: "Private English tutor" },
  { year: "2011", title: "BA in English Language & Linguistics", place: "Aristotle University of Thessaloniki and University of Kent" },
  { year: "2011–12", title: "English teacher", place: "Kern" },
  { year: "2013", title: "MSc in Literature", place: "University of Edinburgh" },
  { year: "2014", title: "Fulbright scholar in Theatre Studies", place: "Tufts University" },
  { year: "2016", title: "MA in Linguistics", place: "Humboldt-Universität zu Berlin" },
  { year: "2016–18", title: "English teacher", place: "VHS Pankow and Mitte, Berlin" },
  { year: "2020", title: "PhD in Linguistics", place: "Humboldt-Universität zu Berlin and University of Cambridge" },
  { year: "2025", title: "English teacher", place: "VHS Pankow, Berlin" },
  { year: "Today", title: "Founder", place: "The Unlock Fluency Method" },
];

const funFacts = [
  { icon: Globe, text: "I live in Cambridge, UK." },
  { icon: Leaf, text: "Proud plant-eater." },
  { icon: Book, text: "Self-proclaimed book addict." },
  { icon: Utensils, text: "Favourite food: pancakes." },
  { icon: Heart, text: "There's no such thing as too much cinnamon." },
  { icon: Coffee, text: "Matcha lover." },
];

export default function About() {
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

  const quoteCarousel = (quotes, active, setActive, setPaused, swipe, extraClass) => (
    <div
      className={`text-center md:text-left ${extraClass}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...swipe}
    >
      <div className="relative h-40 sm:h-36 overflow-hidden">
        {quotes.map((q, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
              index === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
            }`}
          >
            <Quote className="w-7 h-7 text-brand-400 mb-3 mx-auto md:mx-0 flex-shrink-0" />
            <blockquote className="text-lg text-gray-800 italic leading-relaxed mb-3">
              "{q.text}"
            </blockquote>
            <p className="text-gray-500 font-semibold text-sm">{q.name}, {q.country}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center md:justify-start gap-1.5 mt-4">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === active ? "bg-brand-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-700">
      {/* Hero */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-brand-300" aria-hidden="true" />
                <img
                  src="/images/christina-portrait.jpg"
                  alt="Dr Christina Grey"
                  className="relative w-full aspect-[4/5] object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className={`transition-all duration-1000 ease-out delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <Badge className="bg-white/10 text-brand-200 border-white/20 mb-6 px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Psycholinguist · Drama-trained · Fluency coach
              </Badge>
              <h1 className="text-4xl lg:text-[2.6rem] text-white mb-6 leading-tight">
                Meet Dr Christina Grey
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I help people who already know English speak it with confidence. I'm a language scientist, I trained in drama, and I've been teaching English since 2012. The Unlock Fluency Method brings all three together.
              </p>
              <ul className="space-y-3">
                {qualifications.map((q) => (
                  <li key={q} className="flex items-start text-gray-200">
                    <CheckCircle className="w-5 h-5 text-brand-300 mr-3 mt-0.5 flex-shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Counters */}
      <section ref={statsRef} className="py-12 sm:py-16 bg-white border-b border-brand-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-brand-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">{studentsCount}+</div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Successful Students</p>
            </div>
            <div className="flex flex-col items-center">
              <GraduationCap className="w-8 h-8 text-brand-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">{yearsCount}+</div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Years Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-brand-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {typeof satisfactionCount === 'number' ? satisfactionCount.toFixed(2) : satisfactionCount}
              </div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Overall Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="w-8 h-8 text-brand-600 mb-2" />
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">{recommendCount}%</div>
              <p className="text-gray-700 font-semibold mt-1 text-sm sm:text-base">Recommendation Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* My story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-6">My story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I grew up with three languages and spent my childhood on stage as a child actor. Switching between languages every day made me curious about how the brain learns them, and the stage taught me that confidence is something you can practise.
            </p>
          </div>

          <div className="space-y-20">
            {chapters.map((chapter, index) => (
              <div key={chapter.title} className={`grid grid-cols-1 gap-10 items-center ${chapter.photos.length ? "md:grid-cols-2" : "max-w-3xl mx-auto text-center"}`}>
                {chapter.photos.length > 0 && <div className={`grid gap-3 ${chapter.photos.length === 3 ? "grid-cols-3" : chapter.photos.length === 2 ? "grid-cols-2" : "grid-cols-1 max-w-xs mx-auto w-full"} ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  {chapter.photos.map((photo) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                    />
                  ))}
                </div>}
                <div>
                  <h3 className="font-display text-3xl text-brand-900 mb-4">{chapter.title}</h3>
                  {chapter.text.map((paragraph) => (
                    <p key={paragraph} className="text-lg text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* The method: where the three paths meet */}
            <div className="bg-brand-50 rounded-2xl p-8 lg:p-12">
              <h3 className="font-display text-3xl text-brand-900 mb-4">The method</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Unlock Fluency Method was born where those three paths meet. It follows the natural stages of language acquisition: meaningful input, lots of active speaking, memory support, and a positive approach to mistakes. Grammar comes along the way.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                My philosophy fits in one line: true language mastery is built on connection, not perfection. One of my favourite student reviews says, <em>"This isn't just an English course; it's a course about culture, life, and beyond."</em> That's exactly what I designed it to be, and I keep refining it with every group's feedback.
              </p>
              <Link to="/themethod" className="inline-flex items-center font-semibold text-brand-600 hover:text-brand-800">
                How the method works <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academic and professional journey */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 text-center mb-12">Academic and professional journey</h2>
          <ol className="border-l-2 border-brand-200 space-y-6">
            {journey.map((item) => (
              <li key={`${item.year}-${item.title}`} className="pl-6 relative">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-brand-600" aria-hidden="true"></span>
                <p className="text-sm font-bold tracking-wider text-brand-600">{item.year}</p>
                <p className="font-semibold text-brand-900">{item.title}</p>
                {item.place && <p className="text-gray-600">{item.place}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Some facts about me */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-10 items-center">
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
            <img src="/images/christina-croissant.jpg" alt="Christina with a croissant in a café" className="w-full aspect-[3/4] object-cover rounded-2xl" />
            <img src="/images/christina-teddy.jpg" alt="Christina with a giant teddy bear" className="w-full aspect-[3/4] object-cover rounded-2xl mt-8" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl text-brand-900 mb-6">Some facts about me</h2>
            <div className="flex flex-wrap gap-3">
              {funFacts.map((fact) => (
                <div key={fact.text} className="bg-brand-50 text-brand-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium">
                  <fact.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{fact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Quote Carousels */}
      <section className="py-12 lg:py-16 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {quoteCarousel(leftQuotes, leftActive, setLeftActive, setLeftPaused, leftSwipe, "")}
            {quoteCarousel(rightQuotes, rightActive, setRightActive, setRightPaused, rightSwipe, "md:border-l md:border-brand-200 md:pl-12")}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-8">Ready to start speaking?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto bg-brand-300 hover:bg-brand-200 text-brand-900 font-semibold h-11">
                <BookOpen className="w-5 h-5 mr-2" />
                See online courses
              </Button>
            </Link>
            <Link to="/business">
              <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-brand-300 text-brand-300 hover:bg-brand-300 hover:text-brand-900 font-semibold h-11">
                <Building2 className="w-5 h-5 mr-2" />
                For business
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
