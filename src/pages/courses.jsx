
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
    { level: 'intermediate', levelCode: 'B1/B2', title: "Unlock Fluency Signature", description: "An intensive, intermediate-to-advanced fluency sprint to boost your fluency. This course is designed to build confidence in speaking spontaneously and expressing opinions clearly. Focuses on essential vocabulary, daily conversations, and real-life scenarios through guided discussions, role plays, and mini-debates. Includes a personalised 45-minute video consultation with Dr Grey at the end of the course.", length: "5 days", duration: "6 hours daily", participants: "6-16", format: "Online", price: "£200/230€" },
    { level: 'intermediate', levelCode: 'B1/B2', title: "Maintain Fluency", description: "A week-long evening course designed to strengthen fluency for real-life scenarios. Works well as a confidence booster, or to maintain fluency after the Unlock Fluency Signature course.", length: "5 days", duration: "3 hours daily", participants: "6-16", format: "Online", price: "£140/160€" },
    { level: 'intermediate', levelCode: 'B1/B2', title: "Weekend Boost", description: "A weekend immersion course designed to build consistent, practical fluency for everyday use. Works well as a refresher course and is the recommended next step after the Unlock Fluency Signature course.", footnote: "Get in touch with me if you only want to attend a single weekend.", length: "4 consecutive weekends", duration: "3 hours daily", participants: "6-16", format: "Online", price: "£170/200€" },
    { level: 'mixed-levels', title: "Series Club", description: "Let's watch a popular English series together! This course is designed to improve listening comprehension, everyday expressions, and natural conversation skills.", length: "8 weeks", duration: "1 x 3-hour session weekly", participants: "6-16", format: "Online", price: "£170/200€" },
];

const teamCourses = {
    intermediate: [
        { title: "Unlock Fluency Signature", description: "An intensive, intermediate-to-advanced fluency sprint to boost your fluency. This course is designed to build confidence in speaking spontaneously and expressing opinions clearly. Focuses on essential vocabulary, daily conversations, and real-life scenarios through guided discussions, role plays, and mini-debates.", length: "5 days", duration: "6 hours daily", maxParticipants: 20 },
    ],
    mixed: [
        { title: "Unlock Fluency Workshop", description: "Tailored workshop for companies, NGOs, and organisations. The workshop can be tailored to focus on the team's specific goals such as small talk, interviews, presentations, or networking.", length: "1 half/full day", duration: "6 hours daily", maxParticipants: 20 },
        { title: "Custom Unlock Fluency", description: "For organisations with unique needs. Tailored immersive courses designed around your industry, goals, and team structure. Option to combine elements from different tracks.", length: "custom", duration: "custom", maxParticipants: "custom" },
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
              <Button className={`w-full bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold`}>
                <Building2 className="w-4 h-4 mr-2" />
                Enquire About This Course
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
            Your English Learning Journey
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Immersive courses and coaching designed to build real fluency and confidence. Each course is crafted for your specific level and learning goals.
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
      <section className="py-16 bg-gray-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            1-to-1 Personalised Coaching
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
                <CardTitle className="text-xl text-blue-900">One-to-One Coaching - Unlock Fluency Edition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-900 mb-6">
                  Personalised sessions tailored to your specific needs, goals, and learning style. Perfect for intensive progress and targeted improvement.
                </p>
                <p className="text-blue-900 mb-6">
                  Contact me for a personalised coaching plan and quote. Prices start at £40 per 45 minutes.
                </p>
                <Link to="/contact">
                  <Button className="w-full bg-sky-300 hover:bg-sky-400 text-blue-900 font-semibold">
                    Book a Personal Session <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Immersive Courses for Teams & Organisations */}
      <section className="py-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Unlock Fluency Courses for Organisations
          </h2>
           <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-8">
              Help your team speak with confidence in meetings, presentations, and international collaborations. My corporate training solutions are designed to improve fluency and ease in professional settings. Get in touch for a personalised quote.
            </p>
            
            <div className="mb-8 flex justify-center">
              <Card className="bg-gray-700 border-gray-600 max-w-fit">
                <CardContent className="p-4">
                  <p className="text-gray-200 text-sm text-center">
                    Course duration and level can be customised to meet your specific needs and schedule.<br/>
                    These courses can take place either online or in person upon request. Available also for individuals.
                  </p>
                </CardContent>
              </Card>
            </div>
          
          <CourseSection courses={allTeamCourses.map(c => ({...c, level: c.level}))} isTeam={true} />
          
          <CertificationNote />
        </div>
      </section>
    </div>);
}
