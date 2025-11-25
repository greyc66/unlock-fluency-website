
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Star,
  Users,
  User,
  GraduationCap,
  Sparkles,
  Quote,
  Building2
} from "lucide-react";

export default function Home() {

  const categories = [
  {
    icon: Users,
    title: "Unlock Fluency Courses for Individuals",
    description: "Join immersive courses designed to transform how you communicate. Speak with clarity, charisma, and confidence in any situation.",
    link: "/courses", // Changed to /courses
    cta: "Explore Courses"
  },
  {
    icon: User,
    title: "One-to-one Personalised Coaching",
    description: "Receive personalised, intensive training tailored to your unique goals and learning style.",
    link: "/contact", // Changed to /contact
    cta: "Book a Session"
  },
  {
    icon: Building2,
    title: "Unlock Fluency Courses for Organisations",
    description: "Unlock your team's global voice. Join immersive English courses tailored for companies, NGOs, and international teams.",
    link: "/courses", // Changed to /courses
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
            <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">Together, we’ll unlock your fluency so you can communicate with confidence anywhere, with anyone.</p>
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

      {/* Testimonial Section - Light Navy */}
      <section className="py-16 sm:py-24 bg-sky-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Quote className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <blockquote className="text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed">
            "Dr Grey's method completely changed my relationship with English. I went from being terrified to speak to actually enjoying conversations. The immersive approach made all the difference!"
          </blockquote>
          <footer className="mt-8">
            <div className="text-base text-gray-800 font-semibold">Maria Santos, Spain</div>
            <div className="mt-1 text-sm text-gray-600">Student, Full Day Immersion</div>
          </footer>
          <Link to="/testimonials" className="mt-8 inline-block"> {/* Changed to /testimonials */}
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
          <div className="mt-8">
            <Link to="/contact"> {/* Changed to /contact */}
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
