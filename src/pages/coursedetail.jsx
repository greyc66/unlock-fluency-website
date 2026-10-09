import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookingLink from "@/components/BookingLink";
import { ArrowLeft, Calendar, CheckCircle, Quote, Info } from "lucide-react";
import courses from "@/data/courses.json";

const WHATSAPP_URL = "https://chat.whatsapp.com/ChydClk2Z7X4UiVz5cwYD0";

// Courses with dates to be announced (the summer retreat) collect registrations of interest instead of bookings.
const BookButton = ({ course, className = "" }) => {
  const button = (
    <Button className={`bg-brand-600 hover:bg-brand-700 text-white font-semibold h-11 px-6 ${className}`}>
      <Calendar className="w-4 h-4 mr-2" />
      {course.tba ? "Register your interest" : "See dates and book"}
    </Button>
  );
  return course.tba
    ? <Link to="/retreatregistration" className="block">{button}</Link>
    : <BookingLink href={course.bookingUrl} className="block">{button}</BookingLink>;
};

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug && !c.hidden);


  if (!course) return <Navigate to="/courses" replace />;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-900 py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center text-sm font-semibold text-brand-300 hover:text-brand-200 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            All courses
          </Link>
          <h1 className="text-4xl lg:text-5xl text-white mb-4">{course.title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">{course.hook}</p>
          <p className="text-sm font-semibold text-brand-300">
            {[...course.cardFacts, course.format, course.price].join(" · ")}
          </p>
          {course.tba && (
            <p className="mt-6 inline-flex items-start gap-2 rounded-lg bg-white/10 px-4 py-3 text-gray-100">
              <Info className="w-5 h-5 mt-0.5 shrink-0 text-brand-300" />
              Dates for the next retreat will be announced. For now, you can register your interest.
            </p>
          )}
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main content */}
          <div className="space-y-12 min-w-0">
            <div>
              <h2 className="text-2xl lg:text-3xl text-brand-900 mb-4">Who it's for</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{course.whoFor}</p>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl text-brand-900 mb-4">What you'll practise</h2>
              <ul className="space-y-3">
                {course.practise.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl text-brand-900 mb-4">{course.sessionTitle}</h2>
              <ol className="border-l-2 border-brand-200 space-y-5">
                {course.session.map((step) => (
                  <li key={step.time} className="pl-5 relative">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-brand-600" aria-hidden="true"></span>
                    <p className="font-semibold text-brand-900">{step.time}</p>
                    <p className="text-gray-700">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl text-brand-900 mb-4">{course.includedTitle || "What's included"}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-brand-50 rounded-lg p-4 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl text-brand-900 mb-4">Dates</h2>
              {course.tba ? (
                <p className="text-gray-700 leading-relaxed mb-6">{course.datesNote}</p>
              ) : (
                <p className="text-gray-700 leading-relaxed mb-6">
                  Upcoming dates and times are in my booking calendar. I add new dates regularly; join my{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 font-semibold underline">WhatsApp community</a>{" "}
                  to hear about them first.
                </p>
              )}
              <BookButton course={course} />
            </div>

            {course.testimonial && (
              <figure className="bg-brand-50 rounded-xl p-8">
                <Quote className="w-8 h-8 text-brand-400 mb-4" />
                <blockquote className="text-lg lg:text-xl text-brand-900 italic leading-relaxed">
                  "{course.testimonial.text}"
                </blockquote>
                <figcaption className="mt-4 font-semibold text-gray-600">
                  {course.testimonial.name}{course.testimonial.country && `, ${course.testimonial.country}`}
                </figcaption>
              </figure>
            )}
          </div>

          {/* At a glance */}
          <aside className="lg:sticky lg:top-28 self-start bg-white border border-brand-200 rounded-xl p-6">
            <p className="font-display text-3xl text-brand-900 mb-4">{course.price}</p>
            <dl className="space-y-3 mb-6">
              {course.schedule.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold tracking-wider uppercase text-gray-500">{item.label}</dt>
                  <dd className="text-brand-900">{item.value}</dd>
                </div>
              ))}
            </dl>
            {course.footnote && <p className="text-sm text-brand-700 italic mb-6">{course.footnote}</p>}
            <BookButton course={course} className="w-full" />
          </aside>
        </div>
      </section>
    </div>
  );
}
