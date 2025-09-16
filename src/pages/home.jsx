
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
    description: "Join courses designed to transform how you communicate, so you can speak with clarity, charisma, and confidence in any situation.",
    link: "/courses", // Changed to /courses
    cta: "Explore Courses"
  },
  {
    icon: User,
    title: "1-to-1 Personalised Coaching - Unlock Fluency Edition",
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
        <div className="absolute inset-0 flex justify-center items-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/c411c0edd_JPEGimage2.jpeg"
              alt="Unlock Fluency Background"
              className="h-auto w-full object-contain max-w-3xl"
            />
            <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center flex flex-col justify-between min-h-[60vh]">
          <div className="flex-grow flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">The Unlock Fluency Method</h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">Transform your English communication skills with immersive, expert-led coaching designed for real-world confidence.</p>
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
      <section className="py-16 sm:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-100 mb-6">
            A Psycholinguistic Approach to English Learning
          </h2>
          <p className="text-lg text-stone-100 leading-relaxed mb-8 max-w-3xl mx-auto">
            Discover The Unlock Fluency Method – a groundbreaking teaching approach that combines psycholinguistic research with immersive, conversation-focused experiences. Move beyond traditional textbook learning and unlock your natural ability to communicate with confidence and authenticity.
          </p>
          <Link to="/themethod"> {/* Changed to /themethod */}
            <Button className="bg-stone-100 hover:bg-stone-200 text-slate-900 font-semibold px-8 py-3">
              Discover The Method <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section - Dark Navy */}
      <section className="py-16 sm:py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) =>
            <Card key={category.title} className="bg-blue-200/80 border-blue-300 hover:border-blue-400 hover:-translate-y-1 transition-transform duration-300 group">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-lg flex items-center justify-center mb-6 transition-colors">
                    <category.icon className="w-6 h-6 text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-100 mb-3">{category.title}</h3>
                  <p className="text-stone-100 mb-6">{category.description}</p>
                  <Link to={category.link} className="font-semibold text-stone-100 group-hover:text-stone-200 transition-colors flex items-center">
                    {category.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Differentiators Section - Medium Navy */}
      <section className="py-16 sm:py-24 bg-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="text-center">
              <Link to="/themethod" className="text-3xl font-bold tracking-tight text-green-100 sm:text-4xl hover:text-green-200 transition-colors"> {/* Changed to /themethod */}
                The Unlock Fluency Method
              </Link>
              <p className="mt-4 text-lg text-green-100">
                Go beyond traditional learning with a method designed for results.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-3">
              {differentiators.map((item) =>
              <div key={item.title} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 mx-auto">
                    <item.icon className="h-6 w-6 text-green-100" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-green-100">{item.title}</h3>
                  <p className="mt-2 text-base text-green-100">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Light Navy */}
      <section className="py-16 sm:py-24 bg-slate-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Quote className="h-10 w-10 text-stone-100 mx-auto mb-4" />
          <blockquote className="text-xl lg:text-2xl font-medium text-stone-100 leading-relaxed">
            "Dr Grey's method completely changed my relationship with English. I went from being terrified to speak to actually enjoying conversations. The immersive approach made all the difference!"
          </blockquote>
          <footer className="mt-8">
            <div className="text-base text-stone-100 font-semibold">Maria Santos, Spain</div>
            <div className="mt-1 text-sm text-stone-200">Student, Full Day Immersion</div>
          </footer>
          <Link to="/testimonials" className="mt-8 inline-block"> {/* Changed to /testimonials */}
            <Button variant="link" className="text-stone-100 hover:text-stone-200">
              Read more success stories <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA - Lightest Navy */}
      <section className="py-16 sm:py-24 bg-slate-500">
        <div className="max-w-3xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Begin Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-100">Take the first step towards fluent, confident English communication.
          </p>
          <div className="mt-8">
            <Link to="/contact"> {/* Changed to /contact */}
              <Button size="lg" className="bg-white hover:bg-gray-100 text-slate-700 font-semibold shadow-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
