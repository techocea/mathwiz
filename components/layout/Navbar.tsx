"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100" : "bg-transparent py-8"}`}
    >
      <div className="lg:max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="#/" className="flex items-center space-x-3 group">
          <div>
            <Image
              src="/mathwiz.png"
              width={95}
              height={95}
              priority
              quality={100}
              alt="a good maths in negombo"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold text-slate-500 hover:text-slate-950 transition-all uppercase tracking-[0.15em] relative group"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <Link
            href="/registration"
            className="px-8 py-3 bg-slate-950 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all transform active:scale-95"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          className="lg:hidden z-[100] text-slate-950 hover:bg-transparent relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X size={32} className="transition-transform duration-300 rotate-0" />
          ) : (
            <Menu size={32} className="transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 h-screen bg-white z-50 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-10 px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-black text-slate-950 tracking-tighter hover:text-amber-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/registration"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-xs py-5 bg-slate-950 text-white text-center text-sm font-black uppercase tracking-widest rounded-full"
          >
            Join Class
          </Link>
        </div>
      </div>
    </nav>
  );
}
