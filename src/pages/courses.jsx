import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingLink, { DISCOVERY_CALL_URL } from "@/components/BookingLink";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Building2 } from "lucide-react";
import courses from "@/data/courses.json";


const CourseCard = ({ course }) => (
  <div className="bg-white border border-brand-200 rounded-xl p-6 flex flex-col">
    <div className="flex justify-between items-start gap-4 mb-3">
      <h3 className="text-xl font-semibold text-brand-900">{course.title}</h3>
      <Badge className="bg-brand-900 text-white border-brand-900 shrink-0">{course.price}</Badge>
    </div>
    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{course.hook}</p>
    <p className="text-sm font-semibold text-brand-700 mb-6">
      {[...course.cardFacts, course.format].join(" · ")}
    </p>
    {course.tba ? (
      <div className="grid grid-cols-2 gap-3">
        <Link to={`/courses/${course.slug}`}>
          <Button className="w-full bg-transparent border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white font-semibold">
            Course details
          </Button>
        </Link>
        <Link to="/retreatregistration">
          <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold">
            Register interest
          </Button>
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3">
        <Link to={`/courses/${course.slug}`}>
          <Button className="w-full bg-transparent border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white font-semibold">
            Course details
          </Button>
        </Link>
        <BookingLink href={course.bookingUrl}>
          <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold">
            Book now
          </Button>
        </BookingLink>
      </div>
    )}
  </div>
);

export default function Courses() {

  return (
    <div className="bg-brand-50">
      {/* Header */}
      <section className="bg-gray-900 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl text-white mb-5">Online Courses</h1>
          <p className="text-lg text-gray-300">
            Small groups of 6 to 12, live on Google Meet, designed and taught by me, plus a summer retreat in Cambridge once a year. Every online course includes a certificate, a personalised skills assessment, and an English level report.
          </p>
        </div>
      </section>

      {/* Group courses */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl text-brand-900 text-center mb-10">Group courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter((course) => !course.hidden).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 1-to-1 */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white border border-brand-200 rounded-xl p-8 text-center">
            <h2 className="text-3xl text-brand-900 mb-3">1-to-1 coaching</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Sessions built entirely around your goals, at any level, including beginners.
            </p>
            <p className="text-brand-700 font-semibold mb-6">From £75. Start with a free discovery call.</p>
            <BookingLink href={DISCOVERY_CALL_URL}>
              <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11 px-6">
                <Calendar className="w-4 h-4 mr-2" />
                Book a discovery call
              </Button>
            </BookingLink>
          </div>
        </div>
      </section>

      {/* Pointer to the business page */}
      <section className="py-16 lg:py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            Want to try The Unlock Fluency Method for your company?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Tailored courses, workshops, and retreats for teams, online or in person.
          </p>
          <Link to="/business">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11 px-6">
              <Building2 className="w-4 h-4 mr-2" />
              Visit For Business
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
