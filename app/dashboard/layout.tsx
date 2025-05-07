import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { TimerProvider } from "@/components/contexts/TimerContext";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { OurFileRouter } from "../api/uploadthing/core";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mathwiz - Portal",
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
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <NextSSRPlugin routerConfig={extractRouterConfig(OurFileRouter)} />
          {children}
        </body>
      </html>
    </TimerProvider>
  );
}
