"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function PerformanceChart() {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get("/api/admin/submissions/mark"); // Your GET route
                const data = await response.data;

                if (data.submissions) {
                    // 1. Take the last 6 submissions
                    // 2. Map to { paper: string, score: number }
                    // 3. Reverse so they appear chronologically (left to right)
                    const formattedData = data.submissions
                        .slice(0, 6)
                        .map((sub: any) => ({
                            paper: sub.resourceId?.title || "Paper",
                            score: sub.score || 0,
                            date: new Date(sub.createdAt).toLocaleDateString(),
                        }))
                        .reverse();

                    setPerformanceData(formattedData);
                }
            } catch (error) {
                console.error("Failed to fetch performance data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading)
        return (
            <div className="h-[320px] flex items-center justify-center">
                Loading trends...
            </div>
        );

    return (
        <div className="pt-10 border-t border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Performance Insights
                            </h3>
                            <p className="text-slate-400 text-sm font-medium">
                                Your score trends over the last {performanceData.length} papers
                            </p>
                        </div>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f1f5f9"
                                />
                                <XAxis
                                    dataKey="paper"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
                                    dy={15}
                                    // Truncate long titles
                                    tickFormatter={(value) =>
                                        value.length > 10 ? `${value.substring(0, 10)}...` : value
                                    }
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "16px",
                                        border: "none",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                        padding: "12px",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#14b8a6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
