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
  ArrowRight,
  Star,
  BookMarked,
  Podcast,
  Volume2,
  Mail,
  Sparkles,
  Download,
  Lock
} from "lucide-react";

export default function Resources() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const premiumResources = [
    {
      title: "Germanisms",
      subtitle: "Common Mistakes Germans Make in English",
      description: "A comprehensive reference guide covering 20 common errors German speakers make in English — from false friends to tense confusion — each with psycholinguistic explanations, correction exercises, and a gap-fill with full answer keys.",
      price: "£10",
      tags: ["German speakers", "Grammar", "Reference"],
      bgColor: "bg-red-200",
      buyButtonId: "buy_btn_1TEDqS9rCOr3Bkkr2VWFDHhm",
      publishableKey: "pk_live_51S8Rvg9rCOr3BkkrPYdnWicDCfJZ7LmSZsV9zzUXDEUQFTkTJrHH4BAwON8NqPyzAaI7ICOhPGkK5qK3DEAa7Q5x00Xu1GCvCI",
    },
    {
      title: "Business English Essentials",
      subtitle: "Common Mistakes & How to Fix Them",
      description: "A professional reference guide covering 13 key business English areas — from polite requests and meeting language to email conventions and hedging — with exercises, a gap-fill, and complete answer keys.",
      price: "£10",
      tags: ["Business English", "Professional", "Reference"],
      bgColor: "bg-blue-200",
      buyButtonId: "buy_btn_1TEFCf9rCOr3Bkkro9t31iGD",
      publishableKey: "pk_live_51S8Rvg9rCOr3BkkrPYdnWicDCfJZ7LmSZsV9zzUXDEUQFTkTJrHH4BAwON8NqPyzAaI7ICOhPGkK5qK3DEAa7Q5x00Xu1GCvCI",
    },
    {
      title: "English Email Essentials",
      subtitle: "Write Professional Emails with Confidence",
      description: "A practical guide to writing clear, polite, and professional emails in English — covering openings, closings, requests, apologies, and tone — with exercises and a full answer key.",
      price: "£10",
      tags: ["Email Writing", "Professional", "Reference"],
      bgColor: "bg-green-200",
    },
  ];

  const biweeklyResources = [
    {
      title: "The Lexicon",
      icon: BookOpen,
      description: "Discover fascinating English words and their stories. Every two weeks, explore etymology, usage, and cultural context.",
      items: [
        "Vocabulary with real-world examples",
        "Etymology and cultural context",
        "Usage tips and common mistakes to avoid"
      ],
      bgColor: "bg-red-200",
      type: "whatsapp"
    },
    {
      title: "Phrases Unlocked",
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
      title: "Break the Ice",
      icon: Lightbulb,
      description: "Fun and engaging conversation starters to help you break the ice in any social or professional setting.",
      items: [
        "Conversation starters and topics",
        "Tips for natural small talk",
        "Cultural context for different situations"
      ],
      bgColor: "bg-yellow-200",
      type: "whatsapp"
    }
  ];

  const monthlyResources = [
    {
      title: "Talk of the Month",
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
      title: "The Podcast Edit",
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
      title: "Voices of English",
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

  const renderFreeCard = (section, index) => (
    <Card key={index} className={`${section.bgColor} border-gray-400 hover:-translate-y-2 hover:shadow-xl hover:border-gray-600 transition-all duration-300 flex flex-col group`}>
      <CardHeader>
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          <section.icon className="w-6 h-6 text-gray-200" />
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
            Resources
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Resources to Unlock Your Fluency
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Premium handouts to accelerate your learning — plus free resources to support your English journey every week.
          </p>
        </div>
      </section>

      {/* Premium Resources */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Premium Resources</h2>
          </div>
          <p className="text-gray-400 mb-8 ml-9">Downloadable handouts created by me — buy once, keep forever</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumResources.map((product, index) => (
              <Card key={index} className={`${product.bgColor} border-gray-400 hover:-translate-y-2 hover:shadow-xl hover:border-gray-600 transition-all duration-300 flex flex-col`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-gray-200" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{product.title}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{product.subtitle}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-800 mb-5 flex-grow leading-relaxed">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-white/60 text-gray-700 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  {product.buyButtonId ? (
                    <div className="flex justify-center">
                      <stripe-buy-button
                        buy-button-id={product.buyButtonId}
                        publishable-key={product.publishableKey}
                      />
                    </div>
                  ) : (
                    <Button size="sm" disabled className="w-full bg-gray-400 text-gray-600 font-semibold cursor-not-allowed">
                      <Lock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-700" />
      </div>

      {/* Free Resources header */}
      <section className="pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl font-bold text-white">Free Resources</h2>
          </div>
          <p className="text-gray-400 ml-9">Complimentary content shared regularly with my community — no cost, no catch</p>
        </div>
      </section>

      {/* Bi-weekly Resources */}
      <section className="pb-12 lg:pb-16 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Bi-weekly</h3>
          <p className="text-gray-400 mb-8">Shared every two weeks in my WhatsApp community group</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biweeklyResources.map((section, index) => renderFreeCard(section, index))}
          </div>
        </div>
      </section>

      {/* Monthly Resources */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Monthly</h3>
          <p className="text-gray-400 mb-8">Delivered straight to your inbox with my Newsletter</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monthlyResources.map((section, index) => renderFreeCard(section, index))}
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
