"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a slight delay for better UX
        const timer = setTimeout(() => {
            // Optional: Check localStorage so it only shows once per session
            const hasSeenPopup = sessionStorage.getItem("hasSeenPromo");
            if (!hasSeenPopup) {
                setIsOpen(true);
                sessionStorage.setItem("hasSeenPromo", "true");
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-transparent shadow-2xl">
                <DialogTitle className="sr-only">Promotion - District 01 - Gampaha District, Negombo, Chamoda Liyanage - Combined Maths, mathwiz.lk</DialogTitle>
                <div className="relative aspect-square w-full">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <Image
                        src="/district01.jpeg"
                        alt="Promotion"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
