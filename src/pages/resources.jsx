import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Lightbulb,
  Globe,
  Coffee,
  Users,
  ArrowRight,
  Star,
  Calendar,
  BookMarked,
  Podcast,
  Volume2
} from "lucide-react";

export default function Resources() {
  const resourceSections = [
    {
      title: "Word of the Week",
      icon: BookOpen,
      description: "Discover fascinating English words and their stories. Each week, explore etymology, usage, and cultural context.",
      items: [
        "Weekly vocabulary with real-world examples",
        "Etymology and historical context",
        "Usage tips and common mistakes to avoid"
      ],
      bgColor: "bg-red-200",
      badgeText: "Shared on WhatsApp every Monday"
    },
    {
      title: "Proverb of the Week",
      icon: BookMarked,
      description: "Explore the quirky proverbs that make British culture unique. Perfect conversation starters!",
      items: [
        "Learn proverbs, idioms, and phrases to sound more natural",
        "Cultural context and background",
        "How to use them naturally in conversation"
      ],
      bgColor: "bg-orange-200",
      badgeText: "Shared on WhatsApp every Monday"
    },
    {
     title: "Icebreaker of the Week",
      icon: Lightbulb,
      description: "Fun and engaging conversation starters to help you break the ice in any social or professional setting.",
      items: [
        "Weekly conversation starters and topics",
        "Tips for natural small talk",
        "Cultural context for different situations"
      ],
      bgColor: "bg-yellow-200",
      badgeText: "Shared on WhatsApp every Monday"
    },
    {
      title: "TED Talk of the Month",
      icon: Globe,
      description: "Curated TED Talks to improve your listening skills while learning about fascinating topics.",
      items: [
        "Carefully selected talks for English learners",
        "Vocabulary and phrase breakdowns",
        "Discussion questions to think about"
      ],
      bgColor: "bg-yellow-200",
      badgeText: "Shared in monthly Newsletter"
    },
    {
      title: "Podcast Pick of the Month",
      icon: Podcast,
      description: "Carefully selected English podcasts to improve your listening skills and expand your knowledge.",
      items: [
        "Monthly podcast recommendations",
        "Listening comprehension exercises",
        "Vocabulary highlights from episodes"
      ],
      bgColor: "bg-blue-200",
      badgeText: "Shared in monthly Newsletter"
    },
    {
      title: "Accent Spotlight of the Month",
      icon: Volume2,
      description: "Explore different English accents from around the world and learn to understand various speaking styles.",
      items: [
        "Monthly accent features and examples",
        "Pronunciation guides and tips",
        "Cultural insights about different regions"
      ],
      bgColor: "bg-purple-200",
      badgeText: "Shared in monthly Newsletter"
    }
  ];

  return (
     <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            The Resource Room
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Resources to Unlock Your Fluency
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Free resources, tips, and community events to support your English learning journey beyond the classroom.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceSections.map((section, index) => (
              <Card key={index} className={`${section.bgColor} border-gray-400 hover:border-gray-600 transition-all duration-300 flex flex-col`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <section.icon className="w-6 h-6 text-gray-200" />
                    </div>
                    {section.badgeText && (
                      <Badge className="bg-amber-50 text-blue-900 border-stone-300">{section.badgeText}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-800 mb-6 flex-grow">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Updated without newsletter */}
      <section className="py-16 bg-gray-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Connected with The Unlock Fluency Method Community
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get in touch for exclusive tips and early access to new courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-4">
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