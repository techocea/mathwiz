import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "@/app/globals.css";
import {TimerProvider} from "@/app/providers/TimerContext";

import {Toaster as Sonner} from "@/components/ui/sonner";
import React from "react";
import QueryProvider from "../providers/QueryProvider";

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
                <body className={`${poppins.className} antialiased`}>
                <Sonner position="top-right"/>
                {children}
                </body>
                </html>
            </TimerProvider>
        </QueryProvider>
    );
}
