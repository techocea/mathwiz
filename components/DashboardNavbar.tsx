"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

interface DashboardTypeProps {
  dashboardType: "student" | "admin";
}

const DashboardNavbar = ({ dashboardType }: DashboardTypeProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b py-4 px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        {dashboardType === "student" ? (
          <div className="flex items-center gap-2">
            <Image
              src="/mathwiz.png"
              width={95}
              height={95}
              priority
              quality={100}
              alt="a good maths in negombo"
            />
            <h1 className="font-bold text-xl uppercase bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
              mathwiz.lk
            </h1>
          </div>
        ) : (
          <h1 className="font-bold text-xl uppercase bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Admin Panel
          </h1>
        )}
        {dashboardType === "admin" ? (
          <nav className="hidden lg:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${
                    item.path === pathname
                      ? "text-blue-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon size={24} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
      <div className="hidden lg:flex gap-4 items-center">
        {dashboardType === "student" ? <p>Student User</p> : <p>Admin User</p>}

        <div>
          <LogoutButton />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden z-50 relative">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
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
                  {ADMIN_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${
                          item.path === pathname
                            ? "text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon size={24} />
                        {item.name}
                      </Link>
                    );
                  })}
                </ul>

                <div className="flex flex-col gap-4 p-4 pt-8">
                  {dashboardType === "student" ? <p>Student</p> : <p>Admin</p>}
                  <LogoutButton />
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default DashboardNavbar;
