import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote, Globe, Calendar, ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";

// Static testimonial data, removing the need for the Entities SDK
const staticTestimonials = [
  {
    id: 1,
    rating: 5,
    testimonial_text: "Dr Grey's method completely changed my relationship with English. I went from being terrified to speak to actually enjoying conversations. The immersive approach made all the difference!",
    student_name: "Maria Samiou",
    student_country: "Greece",
  },
  {
    id: 2,
    rating: 5,
    testimonial_text: "You are a great teacher and I hope many more students will be able to enjoy your lessons! Many, many thanks for your patience and your tireless eﬀorts!",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 3,
    rating: 4,
    testimonial_text: "I really enjoyed the Weekend Boost course. It was a great way to refresh my skills and learn new conversational techniques in a supportive environment.",
    student_name: "Fatima Al-Fassi",
    student_country: "UAE",
  },
  {
    id: 4,
    rating: 5,
    testimonial_text: "As a professional, I needed to improve my English for meetings. The 1-to-1 coaching with Dr Grey was tailored perfectly to my needs and gave me the tools to succeed.",
    student_name: "Lars Eriksen",
    student_country: "Norway",
  },
  {
    id: 5,
    rating: 5,
    testimonial_text: "The Series Club was so much fun! It felt less like a class and more like hanging out with friends, but my listening skills and vocabulary improved dramatically.",
    student_name: "Isabella Rossi",
    student_country: "Italy",
  },
  {
    id: 6,
    rating: 5,
    testimonial_text: "Your way of teaching English reminds me of how my daughter learnt to play the violin. She learnt using the Suzuki method, where the children play what they hear. You teach the melody of the language and that is a wonderful way! Thank you very much!!",
    student_name: "Kristin",
    student_country: "Germany",
  },

   {
    id: 7,
    rating: 5,
    testimonial_text: "I feel more confident when I speak. I can make jokes in English! This is new and definitely enhances my communication. I love jokes, humour and laughter! Thanks for that!!",
    student_name: "Renate",
    student_country: "Germany",
  },
   {
    id: 8,
    rating: 5,
    testimonial_text: "My learning goal was basically to refresh my English and regain my ability to speak fluently about diﬀerent topics. The title 'Unlock English Fluency' was ideal and it fully met my expectations and encouraged me to continue working towards this goal. Thank you!",
    student_name: "Mauro",
    student_country: "Italy",
  },
   {
    id: 9,
    rating: 5,
    testimonial_text: "Thank you Christina for your whole class! I learned a lot. Not only English as a language, but also about English politeness, how to watch TED Talks, how to debate, how to do small talk and so on. It was not just an English lesson indeed. I feel that my English is slowly unlocking now. I'll keep studying.",
    student_name: "Yumi",
    student_country: "Japan",
  },
   {
    id: 10,
    rating: 5,
    testimonial_text: "To be honest, I was quite skeptical at first about taking an online course, because I usually prefer courses in person. But I was very positively surprised by how well it worked! You were so motivating and present throughout the sessions. Your clear pronunciation and the structure made it easy to follow and very enjoyable.",
    student_name: "Lena",
    student_country: "Germany",
  },
   {
    id: 11,
    rating: 5,
    testimonial_text: "I can't believe the course is over! I loved the choice of topics (I didn't realise that I had booked two courses in one! The unlock-your-fluency-course AND the how-to-improve-your-life-course! 🥳 ). Length and speed were fine and appropriate. No suggestions for improvement. My favourite part was teaching grammar without explaining grammar rules! I had to speak a lot and that was very good. I feel a bit more confident and have developed a bit more self-confidence.",
    student_name: "Kristin",
    student_country: "Germany",
  },
];


export default function Testimonials() {
  const [testimonials] = useState(staticTestimonials);
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-amber-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
  };

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
       <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b5a86bc1bc9c6abe7fbc5b/312d18cf7_luis-desiro-itIxtxz0YU4-unsplash.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      />

      <section className="py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Student Success Stories
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Results, Real Confidence
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from students who have unlocked their English potential with Dr Grey's immersive teaching approach.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {currentTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-gray-600/60 border border-gray-500 flex flex-col backdrop-blur-sm">
                    <CardContent className="p-8 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                          <Quote className="w-8 h-8 text-gray-400" />
                        </div>
                        <blockquote className="text-gray-200 mb-6 leading-relaxed">
                          "{testimonial.testimonial_text}"
                        </blockquote>
                      </div>
                      <div className="border-t border-gray-400 mt-auto pt-6">
                        <div className="font-semibold text-white">
                          {testimonial.student_name}
                        </div>
                        <div className="text-gray-300 text-sm flex items-center mt-1">
                          <Globe className="w-3 h-3 mr-1.5" />
                          {testimonial.student_country}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white bg-gray-900/50 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <span className="text-gray-200 font-medium bg-gray-900/50 px-4 py-2 rounded-full">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white bg-gray-900/50 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-gray-500">No approved testimonials found.</div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join a vibrant community of students who have transformed their English skills and unlocked new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-slate-50 text-gray-900 px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 hover:bg-sky-600">
                Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}