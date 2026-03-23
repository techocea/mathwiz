"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ASSESSMENT_TYPES } from "@/lib/constants";
import { ArrowRight, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const StudentDashboard = () => {
    const router = useRouter();

    const zoomLink = true;

    return (
        <div>
            <PageHeader
                title="Welcome to Student Portal"
                description="Select an assessment type to view your marked answers and marking schemes."
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`group relative overflow-hidden rounded-3xl p-12 transition-all duration-700 ${zoomLink
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-400"
                    }`}
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-110"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="max-w-xl space-y-6">
                        <div className="flex items-center gap-3">
                            <span
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${zoomLink
                                    ? "bg-teal-500 text-slate-950"
                                    : "bg-slate-200 text-slate-500"
                                    }`}
                            >
                                {zoomLink ? (
                                    <>
                                        <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
                                        Live Session Active
                                    </>
                                ) : (
                                    "No Active Session"
                                )}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                            Combined Maths: <br />
                            <span className="text-teal-400">Integration Mastery</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Join Mathwiz for today's deep dive into complex integration
                            techniques. Live Q&A session starts in 5 minutes.
                        </p>
                    </div>

                    <button
                        disabled={!zoomLink}
                        className={`group flex items-center justify-center gap-4 px-10 py-5 rounded-2xl font-black text-base transition-all ${zoomLink
                            ? "bg-white text-slate-950 hover:bg-teal-400 hover:scale-105 active:scale-95 shadow-xl"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                    >
                        <Video className="w-6 h-6" />
                        Join Live Class
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </button>
                </div>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ASSESSMENT_TYPES.map((type, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        onClick={() => router.push(`/dashboard/student/${type.value}`)}
                        className="group bg-white p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:border-teal-500/20 transition-all duration-500 text-left flex flex-col items-start gap-8"
                    >
                        <CardHeader className="flex items-center justify-between w-full">
                            <span className="text-3xl">{type.icon}</span>
                            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardHeader>
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                                {type.label}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ASSESSMENT_TYPES.map((type) => (
                    <Card
                        key={type.value}
                        onClick={() => router.push(`/dashboard/student/${type.value}`)}
                        className="group relative bg-card rounded-xl border shadow-card hover:shadow-card-hover px-6 text-left transition-all duration-200 hover:border-primary/30 cursor-pointer"
                    >
                        <CardHeader className="flex items-center justify-between w-full">
                            <span className="text-3xl">{type.icon}</span>
                            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                {type.label}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                View marked answers & schemes
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div> */}
        </div>
    );
};

export default StudentDashboard;
