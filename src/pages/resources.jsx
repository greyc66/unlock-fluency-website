import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";
import {
  BookOpen,
  Lightbulb,
  Globe,
  BookMarked,
  Podcast,
  Volume2,
  Download,
  Lock
} from "lucide-react";

export default function Resources() {
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

  const whatsappResources = [
    { title: "The Lexicon", icon: BookOpen, text: "Fascinating English words and their stories: usage, etymology, and cultural context." },
    { title: "Phrases Unlocked", icon: BookMarked, text: "The quirky proverbs and idioms that make British English unique, and how to use them." },
    { title: "Break the Ice", icon: Lightbulb, text: "Conversation starters and small-talk tips for social and professional settings." },
  ];

  const newsletterResources = [
    { title: "Talk of the Month", icon: Globe, text: "A TED talk picked for English learners, with vocabulary and discussion questions." },
    { title: "The Podcast Edit", icon: Podcast, text: "English podcasts worth your time, with listening exercises and vocabulary highlights." },
    { title: "Voices of English", icon: Volume2, text: "A different English accent each month, with pronunciation tips and cultural insights." },
  ];

  const resourceList = (items) => (
    <ul className="space-y-5 mb-8 flex-grow">
      {items.map((r) => (
        <li key={r.title} className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shrink-0">
            <r.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">{r.title}</h4>
            <p className="text-gray-600 text-sm">{r.text}</p>
          </div>
        </li>
      ))}
    </ul>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-brand-200 p-6 sm:p-8 flex flex-col">
              <p className="text-sm font-bold tracking-wider uppercase text-brand-600 mb-1">Every two weeks</p>
              <h3 className="text-2xl text-brand-900 font-display mb-6">In my WhatsApp community</h3>
              {resourceList(whatsappResources)}
              <a href="https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11">
                  <img src="/whatsapp.png" alt="" className="w-5 h-5 mr-2" />
                  Join the WhatsApp community
                </Button>
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-brand-200 p-6 sm:p-8 flex flex-col">
              <p className="text-sm font-bold tracking-wider uppercase text-brand-600 mb-1">Every month</p>
              <h3 className="text-2xl text-brand-900 font-display mb-6">In my newsletter</h3>
              {resourceList(newsletterResources)}
              <NewsletterForm id="resources-email" compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
