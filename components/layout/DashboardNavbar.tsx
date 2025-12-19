"use client";

import {
  X,
  Menu,
  Users,
  Files,
  SquareCheckBig,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "@/components/shared/LogoutButton";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 z-50 bg-white border-b py-4 px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        {pathname.startsWith("/dashboard") && (
          <div>
            <Link
              href={
                pathname.includes("admin")
                  ? "/dashboard/admin"
                  : "/dashboard/student"
              }
              className="flex items-center gap-2"
            >
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
            </Link>
          </div>
        )}
        <nav className="hidden lg:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 lg:ml-6">
          {pathname.startsWith("/dashboard/admin") && (
            <>
              <Link
                href="/dashboard/admin"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${pathname === "/dashboard/admin"
                  ? "text-blue-500"
                  : "text-muted-foreground"
                  }`}
              >
                <LayoutDashboard size={24} />
                Dashboard
              </Link>
              <div className="relative">
                <div
                  onClick={handleClickDropdown}
                  className="cursor-pointer flex items-center justify-center gap-2 text-muted-foreground"
                >
                  <LayoutDashboard size={24} />
                  Resources
                </div>

                {isDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute z-10 top-10 left-0 right-0 h-auto w-48 rounded-md transition-all bg-white border border-slate-200 shadow-lg"
                  >
                    <div className="flex flex-col rounded-md">
                      {ADMIN_NAV_ITEMS.map((item, idx, array) => {
                        const lastIndex = array.length - 1;

                        return (
                          <Link
                            key={idx}
                            href={item.path}
                            className={`flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground ${idx === 0
                              ? " rounded-tl-md rounded-tr-md"
                              : idx === lastIndex
                                ? "rounded-bl-md rounded-br-md"
                                : ""
                              } hover:bg-blue-500 hover:text-white`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/dashboard/admin/students"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${pathname === "/dashboard/admin/students"
                  ? "text-blue-500"
                  : "text-muted-foreground"
                  }`}
              >
                <Users size={24} />
                Students
              </Link>
              <Link
                href="/dashboard/admin/payment-slips"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${pathname === "/dashboard/admin/payment-slips"
                  ? "text-blue-500"
                  : "text-muted-foreground"
                  }`}
              >
                <Files size={24} />
                Payment Slips
              </Link>
              <Link
                href="/dashboard/admin/inquiries"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${pathname === "/dashboard/admin/inquiries"
                  ? "text-blue-500"
                  : "text-muted-foreground"
                  }`}
              >
                <SquareCheckBig size={24} />
                Inquiries
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="hidden lg:flex gap-4 items-center">
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
                  {/* {ADMIN_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500 ${item.path === pathname
                            ? "text-blue-500"
                            : "text-muted-foreground"
                          }`}
                      >
                        <Icon size={24} />
                        {item.name}
                      </Link>
                    );
                  })} */}
                </ul>

                <div className="flex flex-col gap-4 p-4 pt-8">
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
