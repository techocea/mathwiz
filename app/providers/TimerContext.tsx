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
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [currentExamId, setCurrentExamId] = useState<string | null>(null);
  // const [intervalId, setIntervalId] = useState<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // Load timer state from localStorage on initial load
  useEffect(() => {
    const savedTimerState = localStorage.getItem("timerState");
    if (savedTimerState) {
      const { examId, endTime } = JSON.parse(savedTimerState);
      const isSubmitted =
        localStorage.getItem(`examSubmitted_${examId}`) === "true";
      setHasSubmitted(isSubmitted);

      if (!isSubmitted && endTime > Date.now()) {
        endTimeRef.current = endTime;
        setCurrentExamId(examId);
        setIsRunning(true);
      } else if (endTime <= Date.now()) {
        setIsTimeUp(true);
      }
    }
  }, []);

  useEffect(() => {
    if (currentExamId) {
      const isSubmitted =
        localStorage.getItem(`examSubmitted_${currentExamId}`) === "true";
      setHasSubmitted(isSubmitted);
    } else {
      setHasSubmitted(false);
    }
  }, [currentExamId]);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (isRunning && currentExamId) {
      const endTime = new Date().getTime() + timeRemaining;
      localStorage.setItem(
        "timerState",
        JSON.stringify({
          isRunning,
          examId: currentExamId,
          endTime,
        })
      );
    }
  }, [timeRemaining, isRunning, currentExamId, hasSubmitted]);

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
          localStorage.removeItem("timerState");
          toast.error("Time's up!");
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = useCallback(
    (durationInMinutes: number, examId: string) => {
      if (localStorage.getItem(`examSubmitted_${examId}`) === "true") {
        toast.error("Already submitted.");
        return;
      }

      const saved = localStorage.getItem("timerState");
      if (saved) {
        const { examId: savedId, endTime: savedEndTime } = JSON.parse(saved);

        // If we find the SAME exam in progress, RESUME it, don't restart it
        if (savedId === examId && savedEndTime > Date.now()) {
          endTimeRef.current = savedEndTime;
          setCurrentExamId(examId);
          setIsRunning(true);
          return; // Exit here! We resumed, we didn't restart.
        }
      }

      const durationInMilliSeconds = durationInMinutes * 60 * 1000;
      const endTime = Date.now() + durationInMilliSeconds;
      endTimeRef.current = endTime;
      setCurrentExamId(examId);
      setTimeRemaining(durationInMilliSeconds);
      setIsRunning(true);
      setIsTimeUp(false);
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
        stopTimer(); // Stop the timer if it's the one currently running
        setTimeRemaining(0);
        setIsTimeUp(false); // Not time up, but submitted
        setCurrentExamId(null); // Clear context of the submitted exam
        localStorage.removeItem(`examStartTime_${examId}`);
      }
      toast.success("Paper successfully submitted!");
    },
    [currentExamId, stopTimer]
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning && endTimeRef.current) {
        // Force an immediate update when they return to the tab
        setTimeRemaining(Math.max(0, endTimeRef.current - Date.now()));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning]);

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
