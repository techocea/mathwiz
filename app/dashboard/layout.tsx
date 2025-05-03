import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import DashboardNavbar from "@/components/DashboardNavbar";
import { TimerProvider } from "@/components/contexts/TimerContext";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mathwiz",
  description: "Leading Maths Class in Negombo",
  icons: {
    icon: "/mathwiz.png",
    shortcut: "/mathwiz.png",
    apple: "/mathwiz.png",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TimerProvider>
      {/* <Toaster /> */}
      <Sonner position="top-right" closeButton />
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <DashboardNavbar />
          {children}
        </body>
      </html>
    </TimerProvider>
  );
}
