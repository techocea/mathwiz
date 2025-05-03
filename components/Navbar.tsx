"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => {
      if (value > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 flex items-center justify-between w-full ${
          isScrolled ? "shadow-md text-black" : " text-white"
        }`}
      >
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
        <nav className="hidden lg:flex gap-10 items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm hover:text-blue-500 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/registration">
            <Button
              variant={isScrolled ? "default" : "outline"}
              size="sm"
              className="text-sm rounded-none w-full"
            >
              Login
            </Button>
          </Link>
        </nav>

        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isScrolled ? "text-primary" : "text-white "
            } cursor-pointer p-2 focus:outline-none`}
            aria-label="Toggle Menu"
          >
            {isOpen ? null : <Menu size={28} />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black"
                  onClick={() => setIsOpen(false)}
                  style={{ zIndex: 40 }}
                />

                {/* Mobile Navigation */}
                <motion.nav
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-50"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute cursor-pointer top-4 right-4 text-gray-800"
                    aria-label="Close Menu"
                  >
                    <X size={28} />
                  </button>

                  <ul className="flex flex-col p-4 pt-16 space-y-8 text-secondary w-full">
                    {NAV_ITEMS.map((link) => (
                      <li key={link.href} className="border-b border-muted/40">
                        <Link
                          href={link.href}
                          className="hover:text-blue-500 transition-colors w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4 p-4 pt-8">
                    <Link href="/portal">
                      <Button
                        variant="default"
                        size="lg"
                        className="uppercase rounded-none w-full"
                      >
                        student portal
                        <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                    <Link href="#top-rankers">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="uppercase rounded-none w-full"
                      >
                        login
                      </Button>
                    </Link>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
