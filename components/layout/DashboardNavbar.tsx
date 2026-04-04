"use client";

import {
  X,
  Menu,
  Users,
  Files,
  SquareCheckBig,
  LayoutDashboard,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "@/components/shared/LogoutButton";
import { DesktopNavbarProps } from "@/global";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";


const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

  const { data: student } = useCurrentStudent();


  const isActive = (path: string) => pathname === path;

  const DesktopNavLink = ({ href, icon: Icon, label }: DesktopNavbarProps) => (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-blue-600 ${isActive(href) ? "text-blue-600" : "text-muted-foreground"
        }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 z-50 bg-white border-b py-3 px-6 lg:px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        {/* Logo Section */}
        <Link
          href={
            pathname.includes("admin")
              ? "/dashboard/admin"
              : "/dashboard/student"
          }
          className="flex items-center gap-2 group"
        >
          <Image
            src="/mathwiz.png"
            width={95}
            height={95}
            priority
            quality={100}
            alt="a good maths in negombo"
          />
          <h1 className="font-bold text-lg lg:text-xl uppercase bg-gradient-to-r from-blue-700 to-cyan-500 text-transparent bg-clip-text hidden sm:block">
            mathwiz.lk
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {pathname.startsWith("/dashboard/admin") && (
            <>
              <DesktopNavLink
                href="/dashboard/admin"
                icon={LayoutDashboard}
                label="Dashboard"
              />

              {/* Desktop Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDesktopDropdownOpen(true)}
                onMouseLeave={() => setIsDesktopDropdownOpen(false)}
              >
                <div
                  className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition-colors ${pathname.includes("/resources")
                    ? "text-blue-600"
                    : "text-muted-foreground"
                    }`}
                >
                  <BookOpen size={20} className="mr-1" />
                  Resources
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isDesktopDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>

                <AnimatePresence>
                  {isDesktopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden py-2"
                    >
                      {ADMIN_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <DesktopNavLink
                href="/dashboard/admin/students"
                icon={Users}
                label="Students"
              />
              <DesktopNavLink
                href="/dashboard/admin/payment-slips"
                icon={Files}
                label="Payments"
              />
              <DesktopNavLink
                href="/dashboard/admin/inquiries"
                icon={SquareCheckBig}
                label="Inquiries"
              />
            </>
          )}
        </nav>
      </div>

      {/* Desktop Logout */}
      {pathname.startsWith("/dashboard/student") ? (
        <div className="flex gap-2 items-center justify-center">
          <p className="text-secondary font-medium max-sm:text-sm">{student?.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="hidden lg:block">
          <LogoutButton />
        </div>
      )}

      {/* Mobile Menu Button */}
      {pathname.startsWith("/dashboard/admin") && (
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={28} className="text-gray-700" />
          </button>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />

            {/* Side Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[280px] h-screen bg-white shadow-2xl z-[70] flex flex-col"
            >
              {/* Mobile Drawer Header */}
              <div className="p-6 flex items-center justify-between border-b">
                <span className="font-bold text-blue-600">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {/* Dashboard */}
                <MobileNavLink
                  href="/dashboard/admin"
                  icon={<LayoutDashboard size={20} />}
                  label="Dashboard"
                  active={isActive("/dashboard/admin")}
                  onClick={() => setIsOpen(false)}
                />

                {/* Resources Accordion */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${isResourcesOpen
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen size={20} />
                      <span className="font-medium text-sm">Resources</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50/50 rounded-lg ml-4 mt-1 border-l-2 border-blue-100"
                      >
                        {ADMIN_NAV_ITEMS.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="block p-3 pl-8 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavLink
                  href="/dashboard/admin/students"
                  icon={<Users size={20} />}
                  label="Students"
                  active={isActive("/dashboard/admin/students")}
                  onClick={() => setIsOpen(false)}
                />

                <MobileNavLink
                  href="/dashboard/admin/payment-slips"
                  icon={<Files size={20} />}
                  label="Payment Slips"
                  active={isActive("/dashboard/admin/payment-slips")}
                  onClick={() => setIsOpen(false)}
                />

                <MobileNavLink
                  href="/dashboard/admin/inquiries"
                  icon={<SquareCheckBig size={20} />}
                  label="Inquiries"
                  active={isActive("/dashboard/admin/inquiries")}
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Logout at bottom */}
              <div className="p-6 border-t bg-gray-50">
                <LogoutButton />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileNavLink = ({ href, icon, label, active, onClick }: any) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-sm ${active
      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
      : "text-gray-600 hover:bg-gray-100"
      }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default DashboardNavbar;
