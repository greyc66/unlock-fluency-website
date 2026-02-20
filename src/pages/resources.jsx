import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewsletterPopup from "../components/NewsletterPopup";
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
  Volume2,
  Mail
} from "lucide-react";

export default function Resources() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const weeklyResources = [
    {
      title: "Word of the Week",
      icon: BookOpen,
      description: "Discover fascinating English words and their stories. Each week, explore etymology, usage, and cultural context.",
      items: [
        "Weekly vocabulary with real-world examples",
        "Etymology and cultural context",
        "Usage tips and common mistakes to avoid"
      ],
      bgColor: "bg-red-200",
      type: "whatsapp"
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
      type: "whatsapp"
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
      type: "whatsapp"
    }
  ];

  const monthlyResources = [
    {
      title: "TED Talk of the Month",
      icon: Globe,
      description: "Curated TED Talks to improve your listening skills while learning about fascinating topics.",
      items: [
        "Carefully selected talks for English learners",
        "Vocabulary and phrase breakdowns",
        "Discussion questions to think about"
      ],
      bgColor: "bg-green-200",
      type: "newsletter"
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
      type: "newsletter"
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
      type: "newsletter"
    }
  ];

  const renderCard = (section, index) => (
    <Card key={index} className={`${section.bgColor} border-gray-400 hover:-translate-y-2 hover:shadow-xl hover:border-gray-600 transition-all duration-300 flex flex-col group`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <section.icon className="w-6 h-6 text-gray-200" />
          </div>
        </div>
        <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-800 mb-6 flex-grow">{section.description}</p>
        <ul className="space-y-2 mb-6">
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start space-x-2">
              <ArrowRight className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800 text-sm">{item}</span>
            </li>
          ))}
        </ul>
        {section.type === "whatsapp" ? (
          <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
              <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 mr-2" />
              Join WhatsApp Group
            </Button>
          </a>
        ) : (
          <button onClick={() => setShowNewsletter(true)} className="w-full">
            <Button size="sm" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </Button>
          </button>
        )}
      </CardContent>
    </Card>
  );

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

          <p className="text-xl text-white max-w-3xl mx-auto">
            Free resources and tips to support your English learning journey beyond the classroom.
          </p>
        </div>
      </section>

      {/* Weekly Resources */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2">Weekly Resources</h2>
          <p className="text-gray-400 mb-8">Shared every week in my WhatsApp community group</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weeklyResources.map((section, index) => renderCard(section, index))}
          </div>
        </div>
      </section>

      {/* Monthly Resources */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2">Monthly Resources</h2>
          <p className="text-gray-400 mb-8">Delivered straight to your inbox with my Newsletter</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monthlyResources.map((section, index) => renderCard(section, index))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Connect with The Unlock Fluency Method Community
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                Join the WhatsApp Group
              </Button>
            </a>
            <button onClick={() => setShowNewsletter(true)}>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4">
                <Mail className="w-5 h-5 mr-2" />
                Subscribe to Newsletter
              </Button>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      {showNewsletter && (
        <NewsletterPopup onClose={() => setShowNewsletter(false)} />
      )}
    </div>
  );
}
