"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ChevronLeft,
  Loader2,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { HIGHLIGHTS, TIMETABLE } from "@/lib/constants";
import PageWrapper from "@/components/layout/PageWrapper";
import ScrollTriggered from "@/components/layout/ScrollTriggered";
import ContactItem from "@/components/shared/Contact-Item";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/contact", {
        name,
        email,
        contact,
        message,
      });

      if (res.status === 200) {
        toast.success("Form submitted successfully");
        setName("");
        setEmail("");
        setContact("");
        setMessage("");
      } else {
        toast.error("Failed to submit the form");
      }
    } catch (error) {
      console.log("Error in submitting the form: ", error);
      toast.error("Failed to submit the form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <main className="flex scroll-smooth h-full flex-col items-center">
        {/* NAVBAR */}
        <div className="w-full">
          <Navbar />
        </div>
        {/* HERO SECTION */}
        <motion.section
          ref={ref}
          style={{ y }}
          id="hero"
          className="w-full flex-1"
        >
          <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/2.png"
                fill
                priority
                alt="Best tuition in Negombo"
                quality={100}
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="flex flex-col items-center justify-center text-white space-y-6 px-4 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-[40px] h-1 bg-white border-2 border-white" />
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
                    best maths class in negombo
                  </h2>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                  CHAMODA
                  <br /> LIYANAGE
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-w-md">
                  <Link href="/dashboard/student">
                    <Button
                      variant="default"
                      size="lg"
                      className="uppercase cursor-pointer rounded-none w-full"
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
                      view results
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <ScrollTriggered>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Text Content */}
              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4 text-left">
                  <h3 className="text-primary text-xs sm:text-sm uppercase font-semibold">
                    about the tutor &gt;&gt;
                  </h3>
                  <h3 className="text-3xl sm:text-4xl font-bold text-secondary">
                    CHAMODA LIYANAGE
                  </h3>
                  <div className="border-l-4 border-primary pl-4 mt-2 text-muted text-sm sm:text-base">
                    <p>
                      Chamoda Liyanage is a B.Sc(Hons) Electrical & Electronic
                      Engineering graduate of the University of Peradeniya. With
                      7+ years of experience teaching Combined Maths in Negombo,
                      Chamoda has won the hearts of students across town with
                      his unique teaching style.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-6 mt-10">
                  <div>
                    <h4 className="uppercase font-bold text-lg text-secondary">
                      acbs - negombo
                    </h4>
                    <Link
                      href="/"
                      className="flex gap-2 items-center justify-start hover:text-primary transition-all text-sm font-medium hover:underline capitalize"
                    >
                      see timetable{" "}
                      <ChevronLeft className="rotate-180 w-4 h-4" />
                    </Link>
                  </div>
                  <div>
                    <h4 className="uppercase font-bold text-lg text-secondary">
                      online paper class
                    </h4>
                    <p className="text-sm font-medium capitalize text-muted">
                      Every Thursday 7.00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mt-10 lg:mt-0 flex-1 flex items-center justify-center w-full">
                <div className="relative w-[360px] sm:w-[320px] md:w-[342px] h-[420px] sm:h-[460px] md:h-[500px]">
                  <Image
                    src="/banner.png"
                    width={150}
                    height={150}
                    alt="Spinning badge"
                    className="absolute -top-8 -left-8 z-10 animate-spin [animation-duration:6s]"
                  />
                  <Image
                    src="/main.jpg"
                    width={342}
                    height={433}
                    priority
                    quality={100}
                    alt="best tuition in Negombo"
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollTriggered>
        </section>

        {/* HIGHLIGHTS */}
        <ScrollTriggered>
          <section
            id="highlights"
            className="bg-accent w-full py-16 px-4 sm:px-8 md:px-16 lg:px-24"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className="lg:max-w-2xl grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {HIGHLIGHTS.map((highlight) => (
                  <Card
                    key={highlight.id}
                    className={clsx(
                      "flex flex-col max-w-[250px] w-full py-6 px-4 rounded-lg shadow-lg",
                      highlight.shadowColor && `shadow-${highlight.shadowColor}`
                    )}
                  >
                    <CardHeader className="flex flex-col items-center text-center space-y-4">
                      <CardTitle className="flex items-center gap-3 justify-center">
                        <div
                          className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            highlight.bgColor,
                            highlight.itemColor
                          )}
                        >
                          <highlight.icon size={24} />
                        </div>
                        <h3
                          className={clsx(
                            "text-2xl sm:text-3xl font-bold",
                            highlight.textColor
                          )}
                        >
                          {highlight.label}
                        </h3>
                      </CardTitle>
                      <p
                        className={clsx(
                          "text-sm sm:text-base font-medium capitalize",
                          highlight.textColor
                        )}
                      >
                        {highlight.description}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollTriggered>

        {/* TOP RESULTS SECTION */}
        {/* <section
          id="top-rankers"
          className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24 h-full"
        >
          <ScrollTriggered>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-teal-500 text-sm uppercase font-semibold">
                &lt;&lt; top results from our paper class &gt;&gt;
              </h3>
              <h3 className="text-4xl font-bold text-secondary">TOP RANKERS</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-8 mt-10">
                {["/paper1.jpg", "/paper2.jpg"].map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[500px] lg:h-[400px]"
                  >
                    <Image
                      src={image}
                      width={442}
                      height={433}
                      priority
                      quality={100}
                      alt="best tuition in negombo"
                      className="rounded-lg shadow-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollTriggered>
        </section> */}

        {/* ONLINE PAPER CLASS */}
        <section
          id="online"
          className="w-full py-24 px-4 sm:px-8 md:px-16 lg:py-32 lg:px-24"
        >
          <ScrollTriggered>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
              <div className="flex-1 flex items-center justify-center mt-10 lg:mt-0">
                <div className="relative w-[360px] sm:w-[320px] md:w-[342px] h-[420px] sm:h-[460px] md:h-[500px]">
                  <Image
                    src="/banner.png"
                    width={150}
                    height={150}
                    alt="banner"
                    className="absolute -top-8 -left-8 z-10 animate-spin [animation-duration:6s] transition-all"
                  />
                  <Image
                    src="/online.jpg"
                    width={402}
                    height={433}
                    priority
                    quality={100}
                    alt="best tuition in negombo"
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-blue-500 text-sm uppercase font-semibold">
                    online paper class &gt;&gt;
                  </h3>
                  <h3 className="text-4xl font-bold capitalize text-secondary">
                    enhance your paper writing skills with mathwiz.lk
                  </h3>
                  <div className="border-l-[4px] border-blue-500 pl-4 mt-4 text-muted">
                    <p className="text-sm sm:text-base">
                      Our website provides:
                    </p>
                    <ul className="text-sm sm:text-base pl-6">
                      <li className="list-disc">
                        The ability to write papers online.
                      </li>
                      <li className="list-disc">
                        The website trains the student to write the paper on
                        time.
                      </li>
                      <li className="list-disc">
                        By joining our paper class, the student will face the
                        real A/L exam experience.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex gap-4 items-center justify-start">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <PhoneCall size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="uppercase font-bold text-xl text-secondary">
                        need more details
                      </h3>
                      <a
                        href="tel:+94717028634"
                        className="text-4xl font-bold text-primary"
                      >
                        +94 71 702 8634
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollTriggered>
        </section>

        {/* TIMETABLE */}
        <ScrollTriggered>
          <section
            id="timetable"
            className="bg-accent py-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full h-full"
          >
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
              <h3 className="text-blue-500 text-sm uppercase font-semibold">
                &lt;&lt; our class timetable &gt;&gt;
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-10 w-full">
                {TIMETABLE.map((timetable) => (
                  <Card
                    key={timetable.id}
                    className="flex flex-col text-center w-full py-0 rounded-none shadow-lg"
                  >
                    <CardHeader className="bg-gradient-to-r from-[#000000] to-[#2563EB]">
                      <CardTitle className="flex gap-2 py-2.5 items-center text-white uppercase justify-center w-full">
                        {timetable.city}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-5 px-6">
                      <CardDescription>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-center font-semibold capitalize text-black text-xl">
                            {timetable.type}
                          </h3>
                          <div className="flex flex-col text-center text-white gap-2">
                            <div className="p-2 bg-gradient-to-r from-[#000000] to-[#2563EB]">
                              {timetable.day1} - {timetable.day1Start} -{" "}
                              {timetable.day1Finish}
                            </div>
                            <div className="p-2 bg-gradient-to-r from-[#000000] to-[#2563EB]">
                              {timetable.day2} - {timetable.day2Start} -{" "}
                              {timetable.day2Finish}
                            </div>
                          </div>
                        </div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollTriggered>

        {/* CONTACT SECTION */}

        <ScrollTriggered>
          <section
            id="contact"
            className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24 h-full"
          >
            <div className="flex flex-col lg:flex-row items-start justify-center gap-20">
              <div className="flex-1 w-full">
                <h3 className="text-blue-500 text-sm uppercase font-semibold mb-8">
                  Get in Touch &gt;&gt;
                </h3>
                <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    aria-label="Name"
                    className="border-b-2 border-gray-200 p-2 placeholder:uppercase placeholder:text-xs focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-label="Email"
                    className="border-b-2 border-gray-200 p-2 placeholder:uppercase placeholder:text-xs focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="phone"
                    placeholder="Phone Number *"
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        // Accept only if value is digits
                        setContact(e.target.value);
                      }
                    }}
                    value={contact}
                    aria-label="Phone"
                    className="border-b-2 border-gray-200 p-2 placeholder:uppercase placeholder:text-xs focus:outline-none focus:border-primary"
                  />
                  <textarea
                    name="message"
                    placeholder="Message *"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    rows={4}
                    aria-label="Message"
                    className="border-b-2 border-gray-200 p-2 placeholder:uppercase placeholder:text-xs focus:outline-none focus:border-primary resize-none"
                  />
                  <Button
                    size="lg"
                    type="submit"
                    disabled={isLoading}
                    className="w-fit rounded-none cursor-pointer   hover:bg-primary/90 transition"
                  >
                    {isLoading ? (
                      <div className="flex gap-2 ">
                        Please wait
                        <Loader2 className="animate-spin transition-all" />
                      </div>
                    ) : (
                      <p>Send Message</p>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info + Image */}
              <div className="flex-1 w-full">
                <div className="relative w-full h-[540px] rounded-lg overflow-hidden">
                  <Image
                    src="/3.png"
                    alt="Contact background"
                    fill
                    priority
                    className="object-cover"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col gap-4 justify-center px-8 py-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Our Contacts
                    </h3>
                    <p className="text-white text-sm">
                      Give us a call or drop by anytime. We aim to respond
                      within 24 hours on business days.
                    </p>

                    <div className="flex flex-col gap-4 mt-4">
                      <ContactItem
                        icon={<MapPin className="text-white" />}
                        title="Our Address"
                        text="ACBS Negombo"
                      />
                      <ContactItem
                        icon={<Mail className="text-white" />}
                        title="Our Mailbox"
                        text="chamodasj@gmail.com"
                      />
                      <ContactItem
                        icon={<PhoneCall className="text-white" />}
                        title="Our Phone"
                        text="071 702 8634"
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      {[
                        {
                          href: "https://www.instagram.com/chamoda_liyanage/",
                          src: "/Instagram.png",
                          alt: "Instagram",
                        },
                        {
                          href: "#",
                          src: "/Facebook.png",
                          alt: "Facebook",
                        },
                        { href: "#", src: "/TikTok.png", alt: "TikTok" },
                        { href: "#", src: "/YouTube.png", alt: "YouTube" },
                      ].map((item, index) => (
                        <Link key={index} href={item.href} target="_blank">
                          <Image
                            src={item.src}
                            width={35}
                            height={35}
                            className="w-[35px] h-[35px]"
                            alt={item.alt}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollTriggered>
      </main>
    </PageWrapper>
  );
}
