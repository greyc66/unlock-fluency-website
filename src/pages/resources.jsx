import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewsletterPopup from "../components/NewsletterPopup";
import {
  BookOpen,
  Lightbulb,
  Globe,
  ArrowRight,
  BookMarked,
  Podcast,
  Volume2,
  Mail,
  Download,
  Lock
} from "lucide-react";

export default function Resources() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const premiumResources = [
    {
      title: "Germanisms",
      subtitle: "Common Mistakes Germans Make in English",
      description: "A comprehensive reference guide covering 20 common errors German speakers make in English, from false friends to tense confusion, each with psycholinguistic explanations, correction exercises, and a gap-fill with full answer keys.",
      price: "£10",
      tags: ["German speakers", "Grammar", "Reference"],
      buyButtonId: "buy_btn_1TEDqS9rCOr3Bkkr2VWFDHhm",
      publishableKey: "pk_live_51S8Rvg9rCOr3BkkrPYdnWicDCfJZ7LmSZsV9zzUXDEUQFTkTJrHH4BAwON8NqPyzAaI7ICOhPGkK5qK3DEAa7Q5x00Xu1GCvCI",
    },
    {
      title: "Business English Essentials",
      subtitle: "Common Mistakes & How to Fix Them",
      description: "A professional reference guide covering 13 key business English areas, from polite requests and meeting language to email conventions and hedging, with exercises, a gap-fill, and complete answer keys.",
      price: "£10",
      tags: ["Business English", "Professional", "Reference"],
      buyButtonId: "buy_btn_1TEFCf9rCOr3Bkkro9t31iGD",
      publishableKey: "pk_live_51S8Rvg9rCOr3BkkrPYdnWicDCfJZ7LmSZsV9zzUXDEUQFTkTJrHH4BAwON8NqPyzAaI7ICOhPGkK5qK3DEAa7Q5x00Xu1GCvCI",
    },
    {
      title: "English Email Essentials",
      subtitle: "Write Professional Emails with Confidence",
      description: "A practical guide to writing clear, polite, and professional emails in English, covering openings, closings, requests, apologies, and tone, with exercises and a full answer key.",
      price: "£10",
      tags: ["Email Writing", "Professional", "Reference"],
      buyButtonId: "buy_btn_1TEWwy9rCOr3BkkrIUcfAeOh",
      publishableKey: "pk_live_51S8Rvg9rCOr3BkkrPYdnWicDCfJZ7LmSZsV9zzUXDEUQFTkTJrHH4BAwON8NqPyzAaI7ICOhPGkK5qK3DEAa7Q5x00Xu1GCvCI",
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
      type: "newsletter"
    }
  ];

  const renderFreeCard = (section, index) => (
    <div key={index} className="bg-white rounded-xl border border-brand-200 p-6 flex flex-col">
      <div className="w-11 h-11 bg-brand-600 rounded-lg flex items-center justify-center mb-4">
        <section.icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-brand-900 mb-2">{section.title}</h3>
      <p className="text-gray-600 mb-5">{section.description}</p>
      <ul className="space-y-2 mb-6 flex-grow">
        {section.items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{item}</span>
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
        <Button size="sm" onClick={() => setShowNewsletter(true)} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold">
          <Mail className="w-4 h-4 mr-2" />
          Subscribe to Newsletter
        </Button>
      )}
    </div>
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-white mb-5">Resources</h1>
          <p className="text-lg text-gray-300">
            Premium handouts and free resources to support your English journey.
          </p>
        </div>
      </section>

      {/* Premium Resources */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 mb-2">Premium handouts</h2>
          <p className="text-gray-600 mb-10">Downloadable handouts to boost your English awareness: buy once, keep forever.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumResources.map((product, index) => (
              <div key={index} className="bg-white rounded-xl border border-brand-200 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-brand-600 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display text-3xl text-brand-900">{product.price}</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-900">{product.title}</h3>
                <p className="text-sm text-brand-700 font-medium mb-3">{product.subtitle}</p>
                <p className="text-gray-600 mb-5 flex-grow leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-brand-50 text-brand-800 px-3 py-1 rounded-full">{tag}</span>
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
                  <Button size="sm" disabled className="w-full bg-gray-200 text-gray-600 font-semibold cursor-not-allowed">
                    <Lock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-16 lg:py-20 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl text-brand-900 mb-2">Free resources</h2>
          <p className="text-gray-600 mb-10">Shared regularly with my community: no cost, no catch.</p>

          <h3 className="text-sm font-bold tracking-wider uppercase text-brand-600 mb-1">Every two weeks</h3>
          <p className="text-gray-600 mb-6">In my WhatsApp community group</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {biweeklyResources.map((section, index) => renderFreeCard(section, index))}
          </div>

          <h3 className="text-sm font-bold tracking-wider uppercase text-brand-600 mb-1">Every month</h3>
          <p className="text-gray-600 mb-6">Straight to your inbox with my newsletter</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyResources.map((section, index) => renderFreeCard(section, index))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-8">
            Join The Unlock Fluency Method community
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold h-11">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                Join the WhatsApp Group
              </Button>
            </a>
            <Button size="lg" onClick={() => setShowNewsletter(true)} className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11">
              <Mail className="w-5 h-5 mr-2" />
              Subscribe to Newsletter
            </Button>
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
