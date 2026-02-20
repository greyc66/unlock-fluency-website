import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote, Globe, Calendar, BookOpen, ArrowRight } from "lucide-react";
import useSwipe from "@/hooks/useSwipe";

// Static testimonial data, removing the need for the Entities SDK
const staticTestimonials = [
  {
    id: 1,
    rating: 5,
    testimonial_text: "Dr Grey's method completely changed my relationship with English. I went from being terrified to speak to actually enjoying conversations. The immersive approach made all the difference!",
    student_name: "Maria",
    student_country: "Greece",
  },
  {
    id: 2,
    rating: 5,
    testimonial_text: "The Unlock Fluency Signature courses were a game-changer (I attended two)! I loved the warm-up discussions, the idioms & expressions Christina shared with us daily, and listening to different TED talks. This course will help my job prospects as I feel more confident speaking in English. These last two weeks were the best of my life! Thank you!",
    student_name: "Hatem",
    student_country: "Germany",
  },
  {
    id: 3,
    rating: 4,
    testimonial_text: "I really enjoyed the Weekend Boost course. It was a great way to refresh my skills and learn new conversational techniques in a supportive environment.",
    student_name: "Fatima",
    student_country: "UAE",
  },
  {
    id: 4,
    rating: 5,
    testimonial_text: "As a professional, I needed to improve my English for meetings. The 1-to-1 coaching with Dr Grey was tailored perfectly to my needs and gave me the tools to succeed.",
    student_name: "Lars",
    student_country: "Norway",
  },
  {
    id: 5,
    rating: 5,
    testimonial_text: "I really enjoyed the conversations on various topics, all of which were interesting to me in different ways. Before, I felt really insecure about speaking English and always felt that, although I understood a lot, I couldn't access my knowledge when I wanted to speak. I have taken many English classes before, but I felt that I hardly made any progress. The week with you was totally different! I felt much more confident speaking English after just a few days. I was really surprised how comfortable I was speaking English by day 5. I don't know which part of your course made the difference, but it really worked. I am very grateful for this week with you and would love to participate again in the future. Thank you so much for helping me to feel more confident when speaking English!",
    student_name: "Hannah",
    student_country: "Germany",
  },
  {
    id: 6,
    rating: 5,
    testimonial_text: "Dr Grey is an excellent teacher and a wonderful person. The course was very good structured, the agenda each day was clear and reasonable. The exercises were appropriately challenging and very well guided. Very interesting and varied topics were covered, so that besides the main aspect of fluent speaking, I was able to learn a lot. Through her open and attentive manner, Christina ensured that I felt very comfortable in the course. I am looking forward to booking another of her courses next year!",
    student_name: "Petra",
    student_country: "Germany",
  },
  {
    id: 7,
    rating: 5,
    testimonial_text: "I can't believe the course is over! I loved the choice of topics (I didn't realise that I had booked two courses in one! The unlock-your-fluency-course AND the how-to-improve-your-life-course! 🥳). Length and speed were fine and appropriate. No suggestions for improvement. My favourite part was teaching grammar without explaining grammar rules! I had to speak a lot and that was very good. I feel a bit more confident and have developed a bit more confidence.",
    student_name: "Kristin",
    student_country: "Germany",
  },
   {
    id: 8,
    rating: 5,
    testimonial_text: "To be honest, I was quite skeptical at first about taking an online course, because I usually prefer courses in person. But I was very positively surprised by how well it worked! You were so motivating and present throughout the sessions. Your clear pronunciation and the structure made it easy to follow and very enjoyable.",
    student_name: "Lena",
    student_country: "Germany",
  },
 {
    id: 9,
    rating: 5,
    testimonial_text: "Thank you Christina for your whole class! I learned a lot. Not only English as a language, but also English politeness, how to watch TED talks, how to debate, how to do a small talk and so on. It was not just an English class indeed. I feel that my English is slowly unlocking now.",
    student_name: "Yumi",
    student_country: "Japan",
  },
   {
    id: 10,
    rating: 5,
    testimonial_text: "I really enjoyed the course: the teaching method allowed for both interaction and reflection on grammar, lexicon and idioms. My learning goal was basically to refresh my English and regain my ability to speak fluently about diﬀerent topics. The title 'Unlock English Fluency' was ideal and it fully met my expectations and encouraged me to continue working towards this goal.",
    student_name: "Mauro",
    student_country: "Italy",
  },
   {
    id: 11,
    rating: 5,
    testimonial_text: "It was a pleasure joining your English course. Your friendly, open, curious way of teaching was perfect and the course for was what I have been looking for and what I needed. The content preparation, the structure of the lessons, and the discussions in the breakout rooms were absolutely great.",
    student_name: "Matthias",
    student_country: "Germany",
  },
   {
    id: 12,
    rating: 5,
    testimonial_text: "I really liked the method, especially with the diﬀerent content you had prepared for each day. My favourite part was the discussions in smaller groups. I also found it helpful when you went deeper into topics like the useful vocab and phrases. And you were right, practicing these helps a lot. Sometimes need a bit of extra time for thinking, and through practicing using your phrases, I feel much more fluent.",
    student_name: "Nils",
    student_country: "Germany",
  },
   {
    id: 13,
    rating: 5,
    testimonial_text: "You are a great teacher and I hope many more students will be able to enjoy your lessons! Many, many thanks for your patience and your tireless eﬀorts to familiarise us with English. Your way of teaching English reminds me of how my daughter learnt to play the violin using the Suzuki method, where children play what they hear. You teach the melody of the language in a wonderful way! Thank you very much!",
    student_name: "Kristin",
    student_country: "Germany",
  },
   {
    id: 14,
    rating: 5,
    testimonial_text: "The current topics we discussed were motivating and interesting. The very well-balanced combination of input from your side (explaining, repeating, asking) and ours (asking, talking, hearing) was very beneficial for me. I feel more confident when I speak. I can make jokes in English! This is new and definitely enhances my communication. I love jokes, humour and laughter! Thanks for that!!!",
    student_name: "Renate",
    student_country: "Germany",
  },
   {
    id: 15,
    rating: 5,
    testimonial_text: "It was truly the best English course I've ever attended. I liked the mix of assignments. I also learned a lot about the topics of the day. That was a really nice mix! I liked the pacing – it was tight, but strangely I wasn’t so tired. It was perfect for me.",
    student_name: "Hanna",
    student_country: "Germany",
  },
 {
    id: 16,
    rating: 5,
    testimonial_text: "Your method is brilliant. Thank you for your positive energy and patience with us. You unlocked English fluency for 10 people more in the last week.",
    student_name: "Alena",
    student_country: "Germany",
  },
   {
    id: 17,
    rating: 5,
    testimonial_text: "Thank you for the informative and engaging five days. You made English feel familiar to me again, and I love it! The content and topics you chose were very suitable. I found them informative and great for practicing diﬀerent aspects of the language. What was especially helpful were your phrases. I also really appreciate your approach in the course. You keep an eye on everyone, and I value that. I enjoyed your stories and examples as well. I truly loved the course.",
    student_name: "Nada",
    student_country: "Germany",
  },
   {
    id: 18,
    rating: 5,
    testimonial_text: "I really enjoyed this course. The method is unique and helpful for me. I took the course a second time because I love this approach. Teaching a wide range of topics can be challenging, but I now have a better understanding of the content.",
    student_name: "Ebru",
    student_country: "Turkey",
  },
   {
    id: 19,
    rating: 5,
    testimonial_text: "I was not sure about doing this course online but my doubts turned out to be very short-lived. I had the possibility to speak a lot and also learned a lot in general. Your structure made it really easy to follow and understand even challenging talks. Thank you for your time and being really nice and patient.",
    student_name: "Bettina",
    student_country: "Germany",
  },
   {
    id: 20,
    rating: 5,
    testimonial_text: "I really enjoyed the course and would like to thank you for the opportunity. I liked your methods and the content was relevant to my goals. I think the daily talks and handouts and the many opportunities to talk were most valuable. I’m sure I’ll join another one of courses in the future!",
    student_name: "Blazej",
    student_country: "Poland",
  },
   {
    id: 21,
    rating: 5,
    testimonial_text: "Just what I needed was to ‘unblock’ my English, incorporate it fresh vocabulary, grammar, etc... VERY useful and in line with my goals. I highly recommend to continue with this methodology where there is a variety of tools and current and interesting topics to talk about that enrich us all. In general I can only CONGRATULATE you for the course, I loved it! Thank you very much for your energy, joy and willingness to do the class and for us to learn.",
    student_name: "Francisca",
    student_country: "Chile",
  },
   {
    id: 22,
    rating: 5,
    testimonial_text: "I really enjoyed the lessons. The tasks were clear and unambiguous. I also thought it was very good that you challenged me a lot in some areas. The course included everything or even more than I had imagined. I was impressed by you and your teaching method.",
    student_name: "Andreas",
    student_country: "Germany",
  },
   {
    id: 23,
    rating: 5,
    testimonial_text: "I enjoyed teaching method you used, it suited me personally. It was aligned with my values and needs: to be funny, creative and stimulating. For me, doing something diﬀerently is always a bonus. I appreciate the personal touch, Dr. Grey. The content was really appealing and relevant and it covered many everyday situations.",
    student_name: "Sonja",
    student_country: "Croatia",
  },
   {
    id: 24,
    rating: 5,
    testimonial_text: "I liked the course very much, it motivated me to work further on my English. I loved your English! The content was relevant, I was especially interested in the subject of stress perception. Looking forward to your next course!",
    student_name: "Klaudia",
    student_country: "Germany",
  },
  {
    id: 25,
    rating: 5,
    testimonial_text: "I really enjoyed the course because I like your teaching method - I believe you learn a language primarily by hearing and speaking and that's what we did. Thank you again for the course, it was an intense and exciting week!",
    student_name: "Julia",
    student_country: "Germany",
  },
  {
    id: 26,
    rating: 5,
    testimonial_text: "I would like thank you for your guidance during the curse. I really enjoyed your teaching method. The best was the opportunity to speak a lot and to hear you how you speak. The topics and content were very useful and can be applied to real life!",
    student_name: "Kamilla",
    student_country: "Poland",
  },
  {
    id: 27,
    rating: 5,
    testimonial_text: "Your course was really well-prepared and met all my expectations. You know exactly what you are talking about! My goal was to unlock my fluency and since you made us talk a lot about diﬀerent topics and diﬀerent methods, I did just that!",
    student_name: "Nicola",
    student_country: "Germany",
  },
  {
    id: 28,
    rating: 5,
    testimonial_text: "I found the course very well structured and I really liked the diﬀerent approaches to practicing English actively. I liked the listening comprehension and following Q&A and group discussion section the most. I also found changing speaking partners every day helpful to get used to diﬀerent pronunciations. All in all, it was the perfect course to get more speaking practice very quickly. Thank you very much - your teaching is very lively and fun and time always passed by fast.",
    student_name: "Tina",
    student_country: "Germany",
  },
  {
    id: 29,
    rating: 5,
    testimonial_text: "I found the method used interactive and inviting. In my opinion, everybody was invited to (and actually did) engage. I really liked the sharing of personal stories and experiences for two reasons: not only it promotes a safe space (as you mentioned during the first class) but it also opens a window into the world of native speakers (expressions used, for example). I was really satisfied with the content. The topics were interesting and this helped us to unlock our english fluency. I really liked that it wasn’t always the English language on focus but an interesting topic.",
    student_name: "Leo",
    student_country: "Greece",
  },
  {
    id: 30,
    rating: 5,
    testimonial_text: "I really enjoyed your teaching method. You made us talk together in many diﬀerent ways using a great variety of terms. I also liked the pacing of the course. It was an encouraging restart for me!",
    student_name: "Silvia",
    student_country: "Germany",
  },
  {
    id: 31,
    rating: 5,
    testimonial_text: "I really enjoyed your method and the course was wonderful. The topics that you chose were really nice and relevant. As I said in one class “these topics should be mandatory for everyone”. Thank you Christina!",
    student_name: "Tiago",
    student_country: "Spain",
  },
  {
    id: 32,
    rating: 5,
    testimonial_text: "The course was very important for my speaking skills. I got a lot of practice and I‘m really glad I overcame my fear of speaking English. I also liked that there was an interesting main topic every day. Thank you so much!",
    student_name: "Hannah",
    student_country: "Germany",
  },
  {
    id: 33,
    rating: 5,
    testimonial_text: "I really liked the structure of the course. My improved English will help me to communicate better and work more efficiently with others. It will also support my company in international tasks. I will use what I’ve learned to communicate better in everyday situations and at work, especially in conversations and emails.",
    student_name: "Karsten",
    student_country: "Germany",
  },
  {
    id: 34,
    rating: 4,
    testimonial_text: "I liked that Christina let us talk without correcting too much and I really enjoyed the breakout rooms. In Berlin, we have many English speakers as clients so it will be very helpful for my work. After attending the course, I think I will also be more confident talking with my English-speaking friends.",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 35,
    rating: 5,
    testimonial_text: "I really liked the current and relevant topics and the playfulness of Christina’s method. After the course, I would be open to welcoming English-speaking clients instead of rejecting them.",
    student_name: "Fabrice",
    student_country: "Germany",
  },
  {
    id: 36,
    rating: 5,
    testimonial_text: "I really like that I wasn’t afraid to speak. The course has helped me to better read and understand medical reports and to communicate with friends in other countries.",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 37,
    rating: 5,
    testimonial_text: "I liked everything about the course, the debates, and the topics. I feel that my speaking and communication skills are better now and I am confident to speak English with others. ",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 38,
    rating: 4,
    testimonial_text: "I really liked working with different people throughout the week. I feel it will be easier for me to start a conversation or participate in a discussion in English after attending Christina’s Signature course.",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 39,
    rating: 5,
    testimonial_text: "I really liked that you were forced to speak in a lot of everyday situations and the motivation Christina provided. Now, I’m a bit more relaxed and will speak more confidently and I'll be able to engage more people with my storytelling when presenting or discussing topics in English.",
    student_name: "Melanie",
    student_country: "Germany",
  },
  {
    id: 40,
    rating: 5,
    testimonial_text: "Speaking feels more natural since we learned very useful sentences that can be used in a universal environment. I really liked Christina’s motivation and how she challenged us without putting someone on the spot.",
    student_name: "Wiebke",
    student_country: "Germany",
  },
  {
    id: 41,
    rating: 5,
    testimonial_text: "I liked everything about the course: the TED talks, Christina’s positive mindset, the great work environment, and the interesting topics. I‘m very motivated to keep learning English. I have the feeling I speak a bit more fluently and confidently now.",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 42,
    rating: 5,
    testimonial_text: "The Signature course was very entertaining and the content varied, the time always passed very quickly. Communication with colleagues and customers outside Germany will be better now!",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 43,
    rating: 5,
    testimonial_text: "During the Signature course, I had to talk about different topics that I didn't necessarily know well and I've learnt I'm able to improvise more than I thought. Christina’s course brought back some confidence in me! I will feel more confident when I'm working with international clients and as a freelance guide I'll accept more English-speaking guided tour requests. In Christina’s course I learnt that I shouldn't feel ashamed if I don't know some words and as a non-native speaker it's ok to ask someone if they could repeat or explain something in another way just to understand it.",
    student_name: "Paula",
    student_country: "Spain",
  },
  {
    id: 44,
    rating: 5,
    testimonial_text: "The Signature course was brilliant! I liked the topics we tackled very much. I now feel more comfortable speaking to people in English and I am motivated to continue practising. Thanks for your efforts Christina!",
    student_name: "Wiebke",
    student_country: "Germany",
  },
  {
    id: 45,
    rating: 5,
    testimonial_text: "This is the second Signature course I attended and I really enjoyed the variety of methods (e.g. listening, writing, but mostly speaking) in different scenarios. You were forced to speak a lot! I now feel more comfortable and by that I'll deliver better results at work!",
    student_name: "Melanie",
    student_country: "Germany",
  },
  {
    id: 46,
    rating: 5,
    testimonial_text: "The course provided me with the tools to speak freely and the content was really well chosen. Everyone had something to contribute and no one was overlooked. Everyone was encouraged to speak. I will now be able to speak more freely with international artists and scientists. I wouldn’t change a thing!",
    student_name: "Heike",
    student_country: "Germany",
  },
  {
    id: 47,
    rating: 5,
    testimonial_text: "I really enjoyed the different topics, the variety of polite english expressions, the idioms and the expressions Christina shared in general. I hope it will be easier to work with my Danish colleagues so that we can work better together now that my confidence has improved. I’ll be able to better handle my duties and also negotiate with ‘the other side’. :)",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 48,
    rating: 5,
    testimonial_text: "This was my second time attending Christina’s Signature course and I loved the mixture of speaking, reading, and listening. Communication with colleagues is now a lot smoother and it’s inspired me to try and speak English spontaneously. Thank you!",
    student_name: "Alena",
    student_country: "Germany",
  },
  {
    id: 49,
    rating: 5,
    testimonial_text: "The positive energy from the lecturer and the topics that we had were very enjoyable. The topics were not boring, but topics that you need in real life. I am now more fluent in English and that will make me able to communicate better. I will continue to learn English! Thanks Christina!",
    student_name: "Anonymous",
    student_country: "China",
  },
  {
    id: 50,
    rating: 5,
    testimonial_text: "Christina makes you feel very comfortable and you can follow her voice easily. The way she explained and organised the course was brilliant and everything we learned will be useful for my studies!",
    student_name: "Sila",
    student_country: "Turkey",
  },
  {
    id: 51,
    rating: 5,
    testimonial_text: "My favourite thing about the course was the teacher! I will be giving some workshops and will be doing some moderations  in English and Christina’s course helped me to improve my performance.",
    student_name: "Martina",
    student_country: "Germany",
  },
  {
    id: 52,
    rating: 5,
    testimonial_text: "Empowering/encouraging teacher + immersive approach + TED talks = perfect course! This course has given me more confidence in expressing myself in English. I’ll definitely take another course with Christina!",
    student_name: "Anonymous",
    student_country: "Germany",
  },
  {
    id: 53,
    rating: 5,
    testimonial_text: "As I speak and understand English better now, I am more confident in practising English in professional settings. The the topics were very relevant for ‘real life’ situations. The course was perfect! ",
    student_name: "Susanne",
    student_country: "Germany",
  },
  {
    id: 54,
    rating: 5,
    testimonial_text: "Christina's willingness to clarify any doubts, always with a smile on her face was what I liked most about the course! It was perfect. I would only think it would be better if next time we did the course in Cambridge ;-) Now I think I can start doing news in English!",
    student_name: "Ximena",
    student_country: "Columbia",
  },
];


// IDs of featured testimonials for the carousel
const FEATURED_IDS = [5, 2, 29, 7, 13];

export default function Testimonials() {
  const featured = FEATURED_IDS.map(id => staticTestimonials.find(t => t.id === id));
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % featured.length);
  }, [featured.length]);

  const goPrev = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  const featuredSwipe = useSwipe(goNext, goPrev);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, 7000);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  const renderStars = (rating, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? "text-amber-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
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
            Hear from students who have unlocked their English potential with my immersive teaching approach.
          </p>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="pb-16 lg:pb-20">
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          {...featuredSwipe}
        >
          <div className="relative">
            <div className="overflow-hidden">
              {featured.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ease-in-out ${index === activeSlide ? "opacity-100 translate-x-0 relative" : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"}`}
                >
                  <Card className="bg-gray-600/60 border border-gray-500 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12 text-center">
                      <Quote className="w-10 h-10 text-amber-400/60 mx-auto mb-6" />
                      <blockquote className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                        "{testimonial.testimonial_text}"
                      </blockquote>
                      <div className="flex justify-center mb-3">
                        {renderStars(testimonial.rating, "w-5 h-5")}
                      </div>
                      <div className="font-semibold text-white text-lg">
                        {testimonial.student_name}
                      </div>
                      <div className="text-gray-300 text-sm flex items-center justify-center mt-1">
                        <Globe className="w-3.5 h-3.5 mr-1.5" />
                        {testimonial.student_country}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featured.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeSlide ? "bg-amber-400" : "bg-gray-600 hover:bg-gray-500"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials - Masonry Grid */}
      <section className="pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            More Success Stories
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {staticTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gray-600/60 border border-gray-500 backdrop-blur-sm break-inside-avoid">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                    <Quote className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  </div>
                  <blockquote className="text-gray-200 mb-4 leading-relaxed text-sm">
                    "{testimonial.testimonial_text}"
                  </blockquote>
                  <div className="border-t border-gray-400 pt-4">
                    <div className="font-semibold text-white text-sm">
                      {testimonial.student_name}
                    </div>
                    <div className="text-gray-300 text-xs flex items-center mt-1">
                      <Globe className="w-3 h-3 mr-1.5" />
                      {testimonial.student_country}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 lg:py-24 bg-gray-950">
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