"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { toast } from "@/components/ui/sonner";

type TimerContextType = {
    startTimer: (durationInMinutes: number, examId: string) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    setExamSubmitted: (examId: string) => void;
    timeRemaining: number;
    isRunning: boolean;
    isTimeUp: boolean;
    hasSubmitted: boolean;
    currentExamId: string | null;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }
    return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                           children,
                                                                       }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
    const [currentExamId, setCurrentExamId] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const endTimeRef = useRef<number | null>(null);

    // FIXED: Single source of truth initialization
    useEffect(() => {
        const savedTimerState = localStorage.getItem("timerState");
        if (savedTimerState) {
            const { examId, endTime } = JSON.parse(savedTimerState);
            const now = Date.now();

            // Check submission status
            const isSubmitted = localStorage.getItem(`examSubmitted_${examId}`) === "true";

            // CRITICAL FIX: Handle time-up scenario FIRST
            if (endTime <= now) {
                // Time is up - mark as submitted automatically
                localStorage.setItem(`examSubmitted_${examId}`, "true");
                setHasSubmitted(true);
                setIsTimeUp(true);
                setCurrentExamId(examId); // Keep examId for reference
                localStorage.removeItem("timerState");
                return;
            }

            // If manually submitted before time up
            if (isSubmitted) {
                setHasSubmitted(true);
                setCurrentExamId(examId);
                setIsTimeUp(false);
                localStorage.removeItem("timerState");
                return;
            }

            // Timer still running
            endTimeRef.current = endTime;
            setCurrentExamId(examId);
            setTimeRemaining(endTime - now);
            setIsRunning(true);
            setHasSubmitted(false);
            setIsTimeUp(false);
        }
    }, []);

    // Sync hasSubmitted when currentExamId changes
    useEffect(() => {
        if (currentExamId) {
            const isSubmitted =
                localStorage.getItem(`examSubmitted_${currentExamId}`) === "true";
            setHasSubmitted(isSubmitted);
        }
    }, [currentExamId]);

    // Save timer state to localStorage whenever it changes
    useEffect(() => {
        if (isRunning && currentExamId && endTimeRef.current) {
            localStorage.setItem(
                "timerState",
                JSON.stringify({
                    isRunning,
                    examId: currentExamId,
                    endTime: endTimeRef.current,
                })
            );
        }
    }, [timeRemaining, isRunning, currentExamId]);

    // Timer tick function
    useEffect(() => {
        let interval: number;

        if (isRunning && endTimeRef.current) {
            interval = window.setInterval(() => {
                const now = Date.now();
                const remaining = Math.max(0, endTimeRef.current! - now);

                setTimeRemaining(remaining);

                if (remaining <= 0) {
                    setIsRunning(false);
                    setIsTimeUp(true);
                    setHasSubmitted(true); // CRITICAL: Set this immediately

                    if (currentExamId) {
                        localStorage.setItem(`examSubmitted_${currentExamId}`, "true");
                    }

                    localStorage.removeItem("timerState");
                    toast.error("Time's up! Your exam has been automatically submitted.");
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, currentExamId]);

    const startTimer = useCallback(
        (durationInMinutes: number, examId: string) => {
            // CRITICAL: Check submission status first
            if (localStorage.getItem(`examSubmitted_${examId}`) === "true") {
                setHasSubmitted(true);
                toast.error("This exam has already been submitted.");
                return;
            }

            const saved = localStorage.getItem("timerState");
            if (saved) {
                const { examId: savedId, endTime: savedEndTime } = JSON.parse(saved);

                // Resume existing timer for same exam
                if (savedId === examId && savedEndTime > Date.now()) {
                    endTimeRef.current = savedEndTime;
                    setCurrentExamId(examId);
                    setTimeRemaining(savedEndTime - Date.now());
                    setIsRunning(true);
                    setHasSubmitted(false);
                    setIsTimeUp(false);
                    return;
                }
            }

            // Start new timer
            const durationInMilliSeconds = durationInMinutes * 60 * 1000;
            const endTime = Date.now() + durationInMilliSeconds;
            endTimeRef.current = endTime;
            setCurrentExamId(examId);
            setTimeRemaining(durationInMilliSeconds);
            setIsRunning(true);
            setIsTimeUp(false);
            setHasSubmitted(false);

            toast.info(`Timer started for ${durationInMinutes} minutes`);
            localStorage.setItem("timerState", JSON.stringify({ examId, endTime }));
        },
        []
    );

    const stopTimer = useCallback(() => {
        setIsRunning(false);
        endTimeRef.current = null;
        localStorage.removeItem("timerState");
    }, []);

    const resetTimer = useCallback(() => {
        stopTimer();
        setTimeRemaining(0);
        setIsTimeUp(false);
        setHasSubmitted(false);
        setCurrentExamId(null);
        localStorage.removeItem("timerState");
    }, [stopTimer]);

    const setExamSubmitted = useCallback(
        (examId: string) => {
            localStorage.setItem(`examSubmitted_${examId}`, "true");
            setHasSubmitted(true);

            if (currentExamId === examId) {
                stopTimer();
                setTimeRemaining(0);
                setIsTimeUp(false);
                setCurrentExamId(null);
                localStorage.removeItem(`examStartTime_${examId}`);
            }

            toast.success("Paper successfully submitted!");
        },
        [currentExamId, stopTimer]
    );

    // Handle visibility change for accurate timing
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isRunning && endTimeRef.current) {
                const now = Date.now();
                const remaining = Math.max(0, endTimeRef.current - now);

                // CRITICAL: Check if time ran out while tab was hidden
                if (remaining <= 0 && currentExamId) {
                    setIsRunning(false);
                    setIsTimeUp(true);
                    setHasSubmitted(true);
                    setTimeRemaining(0);
                    localStorage.setItem(`examSubmitted_${currentExamId}`, "true");
                    localStorage.removeItem("timerState");
                    toast.error("Time's up! Your exam has been automatically submitted.");
                } else {
                    setTimeRemaining(remaining);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isRunning, currentExamId]);

    return (
        <TimerContext.Provider
            value={{
                startTimer,
                stopTimer,
                resetTimer,
                setExamSubmitted,
                timeRemaining,
                isRunning,
                isTimeUp,
                hasSubmitted,
                currentExamId,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};