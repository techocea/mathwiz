import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Toaster position="top-right" closeButton />
        {children}
      </body>
    </html>
  );
}
