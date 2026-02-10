"use client";

import {
  MapPin,
  Phone,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  FOOTER_SOCIALS,
  HIGHLIGHTS,
  PAPER_CLASS_FEATURES,
  TIMETABLE,
} from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollTriggered from "@/components/layout/ScrollTriggered";
import FloatingSymbols from "@/components/shared/FloatingSymbols";
import ContactForm from "@/components/shared/ContactForm";
import { ContactData } from "@/types";
import TestimonialSlider from "@/components/shared/TestimonialSlider";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const onSubmit = async (data: ContactData) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/contact", {
        name: data.name,
        contact: data.contact,
        email: data.email,
        message: data.message,
      });

      if (res.status === 200) {
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      console.log("Error in submitting the form: ", error);
      toast.error("Failed to submit the form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <PageWrapper>
    <main className="flex scroll-smooth h-full w-full flex-col items-center">
      {/* NAVBAR */}
      <div className="w-full">
        <Navbar />
      </div>
      {/* HERO SECTION */}
      <motion.section
        ref={ref}
        style={{ y }}
        id="hero"
        className="relative w-full min-h-screen flex items-center pt-36 lg:py-36 overflow-hidden bg-white math-grid"
      >
        <FloatingSymbols />

        <div className="lg:max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
              G.C.E. Advanced Level 2026 | 2027 | 2028
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-[0.9] tracking-tighter">
              Mastering <br />
              <span className="text-amber-500 font-serif italic font-normal px-2">
                Combined
              </span>{" "}
              <br />
              Mathematics.
            </h1>

            <p className="text-lg text-slate-600 mb-12 max-w-xl leading-relaxed font-normal">
              Unlock the engineering mindset. Sri Lanka's most logical approach
              to
              <span className="text-slate-900 font-bold"> Pure</span> and
              <span className="text-slate-900 font-bold"> Applied</span>{" "}
              mathematics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/registration"
                className="group relative w-full sm:w-auto px-12 py-5 bg-slate-950 text-white font-bold rounded-full transition-all overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 group-hover:text-slate-950 transition-colors">
                  Start Your Journey
                </span>
              </Link>
              <Link
                href="#time-table"
                className="w-full sm:w-auto px-12 py-5 border-2 border-slate-200 text-slate-950 font-bold rounded-full hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                View Schedule
              </Link>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-100 flex items-center sm:items-start justify-center lg:justify-start gap-10">
              <div>
                <div className="text-3xl font-black text-slate-950 tracking-tighter">
                  100 +
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Active Learners
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-950 tracking-tighter">
                  98%
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  A/B Pass Rate
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>

            <div className="relative z-10 bg-white p-3 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 transform rotate-2 hover:rotate-0 transition-all duration-1000">
              <Image
                src="/3.png"
                width={850}
                height={650}
                alt="Advanced Level Mathematics Education"
                className="rounded-3xl w-full h-[650px] object-cover"
              />

              <div className="absolute top-10 -left-10 dark-glass-card p-6 rounded-3xl shadow-2xl max-w-[240px] animate-float">
                <div className="text-amber-400 font-black text-2xl mb-1">
                  100%
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest leading-tight">
                  Syllabus Coverage Guarantee
                </div>
              </div>

              <div
                className="absolute bottom-12 -right-10 glass-card p-6 rounded-3xl shadow-2xl max-w-[240px] animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/s${i}/40/40`}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Success Community
                  </span>
                </div>
                <div className="text-slate-950 font-bold text-sm leading-tight">
                  Join the next cohort of University Entrants.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* HIGHLIGHTS */}
      <ScrollTriggered>
        <section
          id="highlights"
          className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden"
        >
          <div className="lg:max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.id}
                  className="relative group text-center md:text-left flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 p-4"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.itemColor} transform group-hover:rotate-12 transition-all duration-500 shadow-sm border border-white/50 flex-shrink-0`}
                  >
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-slate-950 tracking-tighter mb-1">
                      {item.label}
                    </h1>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] w-full">
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle divider for desktop */}
                  {item.id < 3 && (
                    <div className="hidden lg:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-12 bg-slate-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollTriggered>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24"
      >
        <ScrollTriggered>
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-500/10 blur-[100px] rounded-full group-hover:bg-amber-500/20 transition-all duration-700"></div>
              <div className="relative bg-slate-50 p-3 rounded-4xl shadow-2xl overflow-hidden border border-slate-100">
                <Image
                  src="/main.jpg"
                  width={800}
                  height={650}
                  alt="Chamoda Liyanage - Lead Combined Maths Tutor"
                  className="w-full h-[650px] rounded-3xl object-cover filter hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="dark-glass-card p-8 rounded-2xl border border-white/20 shadow-2xl">
                    <h4 className="text-white font-black text-2xl mb-2 tracking-tight">
                      Chamoda Liyanage
                    </h4>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      B.Sc(Hons) Electrical & Electronic Engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-6">
                  The Lead Strategist
                </h2>
                <h1 className="text-5xl md:text-6xl font-black text-slate-950 leading-[0.9] tracking-tighter">
                  Where Logic <br />
                  Meets{" "}
                  <span className="font-serif italic font-normal text-amber-500">
                    Mastery
                  </span>
                  .
                </h1>
              </div>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                Chamoda Liyanage is a B.Sc(Hons) Electrical & Electronic
                Engineering graduate of the University of Peradeniya. With 7+
                years of experience teaching Combined Maths in Negombo, Chamoda
                has won the hearts of students across town with his unique
                teaching style.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  {
                    title: "Precision",
                    desc: "Short-cut logic for complex Pure Maths.",
                  },
                  {
                    title: "Visualisation",
                    desc: "Mental mapping for Applied mechanics.",
                  },
                  {
                    title: "Prediction",
                    desc: "Paper patterns based on 15yr data.",
                  },
                  {
                    title: "Mentorship",
                    desc: "Direct 1-on-1 guidance for top ranks.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="text-slate-950 font-bold text-lg mb-2 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                      {item.title}
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  href="#contact"
                  className="group relative w-full sm:w-auto px-12 py-5 bg-slate-950 text-white font-bold rounded-full transition-all overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 group-hover:text-slate-950 transition-colors">
                    Experience a Session
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollTriggered>
      </section>

      {/* ONLINE PAPER CLASS */}
      <section
        id="paper-class"
        className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden w-full math-grid-dark"
      >
        <div className="px-6 relative z-10">
          <div className="mx-auto text-center mb-24">
            <h2 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
              Exam Excellence Strategy
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-wider">
              The{" "}
              <span className="font-serif italic font-normal text-amber-500">
                Elite
              </span>{" "}
              Paper Program.
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Moving beyond theory. Our paper class is the final refinery where
              students are forged into top rankers through rigorous testing and
              logical analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 lg:max-w-5xl w-full mx-auto">
            {PAPER_CLASS_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/[0.03] border border-white/10 p-10 lg:p-12 rounded-3xl hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 border border-amber-500/20">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-white mb-4 tracking-tight group-hover:text-amber-500 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Animated Progress Line Decor */}
                <div className="absolute bottom-0 left-12 right-12 h-1 bg-white/5 overflow-hidden rounded-full">
                  <div className="w-full h-full bg-gradient-to-right from-amber-500 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:max-w-5xl w-full mx-auto mt-24 p-12 bg-amber-500 rounded-4xl relative overflow-hidden group shadow-2xl shadow-amber-500/20">
            <div className="absolute -bottom-32 right-0 p-8 text-slate-950/10 text-[180px] font-black pointer-events-none select-none italic font-serif">
              A+
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h4 className="text-3xl lg:text-4xl font-black text-slate-950 mb-4 tracking-normal">
                  Ready to conquer the 2027/28 Exam?
                </h4>
                <p className="text-slate-900/80 text-base leading-relaxed font-normal">
                  Limited seats available for the next Physical Paper session in
                  Negombo & Nugegoda.
                </p>
              </div>
              <Link
                href="/registration"
                className="px-12 py-5 bg-slate-950 text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl whitespace-nowrap"
              >
                Secure My Rank
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIMETABLE */}
      <ScrollTriggered>
        <section id="time-table" className="py-24 lg:py-32 bg-white relative">
          <div className="lg:max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row lg:items-end justify-between mb-12 lg:mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-6">
                  Strategic Locations
                </h2>
                <h3 className="text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter">
                  Class <br />
                  <span className="font-serif italic font-normal text-amber-500">
                    Logistics
                  </span>
                  .
                </h3>
              </div>
              <p className="text-slate-500 md:max-w-xs text-sm border-l-2 border-amber-500 pl-8">
                Join the most sought-after physical and online mathematics
                batches across Sri Lanka's educational hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {TIMETABLE.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-50 border border-slate-100 p-10 rounded-2xl hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:border-amber-500/20 transition-all duration-700"
                >
                  <div className="flex justify-between w-full mb-10">
                    <div>
                      <h4 className="text-3xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-amber-600 transition-colors">
                        {item.city}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex px-4 py-1.5 bg-slate-950 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {item.type}
                        </div>
                        {item.isTemporary && (
                          <div className="inline-flex px-4 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
                            Temporary
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-5 border-b border-slate-200 group-hover:border-amber-500/10 transition-colors">
                      <span className="font-black text-slate-950 uppercase tracking-widest text-xs">
                        Primary Session
                      </span>
                      <div className="text-right">
                        <span className="block font-bold text-slate-900 text-lg">
                          {item.day1}
                        </span>
                        <span className="block text-sm font-bold text-slate-400 uppercase tracking-tighter">
                          {item.day1Start} - {item.day1Finish}
                        </span>
                      </div>
                    </div>

                    {item.day2 && (
                      <div className="flex items-center justify-between py-5 border-b border-slate-200 group-hover:border-amber-500/10 transition-colors">
                        <span className="font-black text-slate-950 uppercase tracking-widest text-xs">
                          Support Session
                        </span>
                        <div className="text-right">
                          <span className="block font-bold text-slate-900 text-lg">
                            {item.day2}
                          </span>
                          <span className="block text-sm font-bold text-slate-400 uppercase tracking-tighter">
                            {item.day2Start} - {item.day2Finish}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                      Enrolling: Open
                    </span>
                    <a
                      href="/registration"
                      className="text-sm font-black text-slate-950 hover:text-amber-600 transition-colors flex items-center group/btn"
                    >
                      <span>Reserve Spot</span>
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <div className="inline-block p-2 bg-slate-50 rounded-full">
              <div className="px-10 py-4 bg-white rounded-full shadow-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-slate-500 font-bold text-sm">
                  Need Batch Information?
                </span>
                <a
                  href="#contact"
                  className="text-amber-600 font-black text-sm uppercase tracking-widest hover:underline decoration-2"
                >
                  Contact Academy Office →
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollTriggered>

      {/* TESTIMONIALS */}
      <ScrollTriggered>
        <section id="testimonials" className="py-24 lg:py-32 bg-white">
          <div className="lg:max-w-6xl w-full mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">
                  Success Stories
                </h2>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                  Voices of Excellence
                </h3>
              </div>
              <p className="text-slate-500 md:max-w-xs text-sm border-l-2 border-amber-500 pl-8">
                Proven results that speak louder than words. Our students
                consistently secure top island ranks.
              </p>
            </div>

            <TestimonialSlider />
          </div>
        </section>
      </ScrollTriggered>

      {/* CONTACT SECTION */}
      <ScrollTriggered>
        <section
          id="contact"
          className="py-24 lg:py-32 bg-white relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-50"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-2xl border border-slate-100">
              <div className="p-10 md:p-16 bg-slate-900 text-white">
                <h2 className="text-4xl font-bold mb-6">Enroll Now.</h2>
                <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                  Unlock your true potential. Our classes are designed to guide
                  you from basic concepts to advanced paper techniques.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                      <Phone />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                        Direct Hotline
                      </div>
                      <div className="text-xl font-bold">+94 71 702 8634</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                      <MapPin />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                        Regional Office
                      </div>
                      <div className="text-xl font-bold">Negombo & Wattala</div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/5">
                  <span className="text-slate-500 text-sm block mb-4 uppercase font-bold tracking-tighter">
                    Connect with us
                  </span>
                  <div className="flex space-x-4">
                    {FOOTER_SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-amber-500 text-sm font-bold transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-16">
                <ContactForm loading={isLoading} onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </section>
      </ScrollTriggered>
    </main>
    // </PageWrapper>
  );
}
