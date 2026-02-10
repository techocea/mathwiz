"use client";

import React, { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";
import { getThumbnail } from "@/helpers/getThumbnail";

const TestimonialSlider = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    return (
        <div className="w-full px-12 py-12">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-7xl mx-auto"
            >
                <CarouselContent className="-ml-4">
                    {TESTIMONIALS.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                            <div
                                className="group relative cursor-pointer"
                                onClick={() => setSelectedVideo(item.videoUrl)}
                            >
                                <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src={getThumbnail(item.videoUrl)}
                                        alt="testimonial"
                                        width={600}
                                        height={400}
                                        unoptimized
                                        className="w-full h-auto block transition-all duration-700 group-hover:scale-105"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/90 text-amber-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-2xl backdrop-blur-sm">
                                            <Play fill="currentColor" size={32} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <CarouselPrevious className="hidden md:flex -left-12 border-slate-200 text-slate-900 hover:bg-amber-500 hover:text-white transition-colors" />
                <CarouselNext className="hidden md:flex -right-12 border-slate-200 text-slate-900 hover:bg-amber-500 hover:text-white transition-colors" />
            </Carousel>

            {/* Video Modal (Unchanged) */}
            <Dialog
                open={!!selectedVideo}
                onOpenChange={() => setSelectedVideo(null)}
            >
                <DialogContent className="max-w-[95vw] lg:max-w-6xl p-0 bg-transparent border-none overflow-visible shadow-none">
                    {/* Screen Reader Title */}
                    <DialogTitle className="sr-only">Student Success Story Video</DialogTitle>

                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] border border-white/10">
                        {selectedVideo && (
                            <iframe
                                // Ensure we are delivering the video correctly
                                src={selectedVideo.replace("/upload/", "/upload/f_auto,q_auto/")}
                                className="w-full h-full"
                                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        )}

                        {/* Floating Close Button for better UX on large screens */}
                        {/* <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                        >
                            <span className="uppercase tracking-widest">Close</span>
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center backdrop-blur-md z-999">
                                <X size={18} className="text-red-500" />
                            </div>
                        </button> */}
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default TestimonialSlider;
