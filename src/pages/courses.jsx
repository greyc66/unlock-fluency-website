
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationNote from "@/components/CertificationNote";
import {
  Clock,
  Users,
  CheckCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  User,
  Building2,
  TrendingUp,
  Sparkles,
  Zap,
  Repeat,
  Trophy,
  Users2,
  MessageSquare,
  BarChart,
  Target,
  FileText,
  Monitor
} from "lucide-react";

// --- Data ---
const individualCoursesList = [
    { level: 'intermediate', levelCode: 'B1/B2', title: "Unlock Fluency Signature - Morning", description: "An intensive, intermediate-to-advanced fluency sprint. I've designed this immersive course to give you the confidence to speak spontaneously and express your opinions freely. At the end of the course, you get a 45-minute video consultation with me.", length: "5 consecutive days", duration: "6 hours daily", participants: "6-12", format: "Online", price: "£300" },
    { level: 'intermediate', levelCode: 'B1/B2', title: "Maintain Fluency - Evening", description: "An immersive, evening course I've designed to strengthen fluency and confidence in real-life scenarios. A great way to start talking and boost your confidence!", length: "5 consecutive days", duration: "3 hours daily", participants: "6-12", format: "Online", price: "£200" },
    { level: 'intermediate', levelCode: 'B1/B2', title: "Weekend Boost - Morning", description: "A weekend immersion course I've designed to build consistent, practical fluency for everyday use. Want to refresh your English skills and start off your weekends with a smile? This is the right course for you!", footnote: "Get in touch with me if you only want to attend a single weekend.", length: "4 consecutive weekends", duration: "3 hours daily", participants: "6-12", format: "Online", price: "£250" },
    { level: 'mixed-levels', title: "Series Club - Evening", description: "Let's watch a popular series together! Fancy hanging out with friends and improving your English at the same time? I've designed this course to improve your listening comprehension and natural conversation skills.", length: "8 consecutive weeks", duration: "1 x 3-hour session weekly", participants: "6-12", format: "Online", price: "£220" },
    { level: 'mixed-levels', title: "Book Club - Evening", description: "Are you a book lover like me? Join me for a book club that brings stories to life! We’ll read, laugh, debate, and boost your English naturally with every chapter. Fun discussions, new vocabulary, and real confidence in speaking, all in one place!", length: "8 consecutive weeks", duration: "1 x 3-hour session weekly", participants: "6-12", format: "Online", price: "£220" },
];

const teamCourses = {
    intermediate: [
        { title: "Custom Unlock Fluency Course", description: "I bring The Unlock Fluency Method straight into your industry. Tailored to your team’s daily challenges to boost confidence, clarity, and impact; right where it matters most.", length: "custom", duration: "custom", maxParticipants: "custom" },
    ],
    mixed: [
        { title: "Custom Unlock Fluency Workshop", description: "Need something targeted? My focused workshops use my methodology to build the exact skill your team needs: negotiating, presenting, leading meetings, or anything in between.", length: "Half or full day(s)", duration: "custom", maxParticipants: "custom" },
        { title: "Custom Unlock Fluency Retreat", description: "Take your team’s communication to the next level with a bespoke fluency retreat at any destination you choose, or in Cambridge with me. We’ll combine focused English training with an unforgettable, industry-specific learning experience.", length: "custom", duration: "custom", maxParticipants: "custom" },
    ]
};


// --- Components ---

const CourseCard = ({ course, isTeam = false }) => {
  const cardBgClass = isTeam ? "bg-stone-200 border-stone-300" : "bg-stone-200 border-stone-300";
  const textClass = "text-blue-900";

  return (
    <Card className={`${cardBgClass} flex flex-col transition-all duration-300`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
            <CardTitle className={`text-xl ${textClass}`}>
              {course.title}
            </CardTitle>
            <div className="flex flex-col gap-2">
              {course.format && <Badge className="bg-amber-500/20 text-amber-800 border-amber-500/30">Online</Badge>}
              {course.price && <Badge className="bg-green-300 text-green-900 border-green-400">{course.price}</Badge>}
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className={`${textClass} mb-6 leading-relaxed flex-grow`}>
          {course.description}
        </p>

        {course.footnote && (
          <p className={`text-xs ${textClass} mb-4 italic`}>
            {course.footnote}
          </p>
        )}
        
        <div className={`space-y-3 mb-6 text-sm ${textClass}`}>
          <div className="flex items-center"><BarChart className="w-4 h-4 mr-2" /> <strong>Length:</strong><span className="ml-2">{course.length}</span></div>
          <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> <strong>Duration:</strong><span className="ml-2">{course.duration}</span></div>
          
          {course.participants && ( // For individual courses
            <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> <strong>Participants:</strong><span className="ml-2">{course.participants}</span></div>
          )}

          {!course.participants && course.maxParticipants && ( 
            <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> <strong>Max Participants:</strong><span className="ml-2">{course.maxParticipants}</span></div>
          )}
        </div>

        <div className="mt-auto">
          {isTeam ? (
            <Link to="/contact" className="block">
              <Button className={`w-full bg-sky-200 hover:bg-sky-300 text-blue-900 font-semibold`}>
                <Building2 className="w-4 h-4 mr-2" />
                Enquire Now
              </Button>
            </Link>
          ) : (
            <a style={{ float: 'none', textDecoration: 'none' }} id="Setmore_button_iframe" href="https://theunlockfluencymethod.setmore.com">
              <Button className="w-full bg-sky-200 hover:bg-sky-300 text-blue-900 font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CourseSection = ({ courses, isTeam }) => {
    if (!courses || courses.length === 0) {
        return <p className="text-gray-500 text-center col-span-full">No courses available for this level.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} isTeam={isTeam} />
        ))}
      </div>
    );
};

export default function Courses() {
  const [activeTeamTab, setActiveTeamTab] = useState("all-levels");

  useEffect(() => {
    // Load Setmore booking widget script
    const setmoreScript = document.createElement('script');
    setmoreScript.id = 'setmore_script';
    setmoreScript.type = 'text/javascript';
    setmoreScript.src = 'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
    
    if (!document.getElementById('setmore_script')) {
        document.head.appendChild(setmoreScript);
    }
    
    // Cleanup function is not strictly necessary if other pages use it,
    // but good practice if this were the only page.
    return () => {
        const existingScript = document.getElementById('setmore_script');
        // We can choose to remove it or leave it. Leaving it is safer if navigating between pages that use it.
    };
  }, []);

  const allTeamCourses = [
      ...teamCourses.intermediate.map(c => ({...c, level: 'intermediate', levelCode: 'B1/B2'})),
      ...teamCourses.mixed.map(c => ({...c, level: 'mixed-levels'}))
  ];

  return (
    <div className="bg-gray-900">
      {/* Header Section */}
      <section className="py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 mb-6 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Course Offerings
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Learning Journey
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I've personally designed each of these courses to be an immersive and supportive experience. Whichever path you choose, I'll be there to guide you as you build real fluency. I can't wait to see your confidence grow!
          </p>
        </div>
      </section>

      {/* Immersive Courses for Individuals */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Unlock Fluency Courses for Individuals
          </h2>
          <p className="text-center text-gray-400 mb-12">
            These courses are ideal for English learners of B1/B2 levels and above.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {individualCoursesList.map((course, index) => (
              <CourseCard key={index} course={course} isTeam={false} />
            ))}
          </div>
        </div>
      </section>

      {/* 1-to-1 Personalised Coaching */}
      <section className="py-16 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            One-to-one Personalised Coaching
          </h2>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-stone-200 border-stone-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <Badge className="bg-amber-500/20 text-amber-800 border-amber-500/30 mb-4">Online</Badge>
                    <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-200" />
                    </div>
                </div>
                <CardTitle className="text-xl text-blue-900">One-to-One Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-900 mb-6">
                  Let’s focus entirely on you. In one-to-one coaching, we target your specific goals with tailored strategies that help you grow quickly and confidently.
                </p>
                <p className="text-blue-900 mb-6">
                  Contact me for a personalised coaching plan and quote. Prices start at £75.
                </p>
                <div className="flex justify-center">
                <Link to="/contact">
                  <Button className="bg-sky-200 hover:bg-sky-300 text-blue-900 font-semibold px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
      Book a Personal Session
    </Button>
  </Link>
</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Immersive Courses for Teams & Organisations */}
      <section className="py-16 lg:pb-24 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Unlock Fluency Courses for Organisations
          </h2>
           <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-8">
              I help teams communicate with confidence in meetings, presentations, and international collaborations. My corporate training is tailored to your goals, your schedule, and your industry so your team can speak with clarity and ease. Available online or in person; get in touch for a personalised quote for your organisation or for individual learners.
            </p>
            
          
          <CourseSection courses={allTeamCourses.map(c => ({...c, level: c.level}))} isTeam={true} />
          
          <CertificationNote />
        </div>
      </section>
    </div>);
}
