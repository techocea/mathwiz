import type { Metadata } from "next";
import { Poppins } from "next/font/google";
//@ts-ignore
import "@/app/globals.css";
import { TimerProvider } from "@/app/providers/TimerContext";

import { Toaster as Sonner } from "@/components/ui/sonner";
import React from "react";
import QueryProvider from "../providers/QueryProvider";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import BlurGradient from "@/components/shared/BlurGradient";

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
        <QueryProvider>
            <TimerProvider>
                <html lang="en">
                    <body className={`${poppins.className} antialiased mt-28 mb-16 container lg:max-w-6xl mx-auto p-6`}>
                        <Sonner position="top-right" />
                        <BlurGradient />
                        <DashboardNavbar />
                        {children}
                    </body>
                </html>
            </TimerProvider>
        </QueryProvider>
    );
}
