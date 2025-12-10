"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "@/components/ui/sonner";

type TimerContextType = {
  startTimer: (durationInMinutes: number, examId: string) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  timeRemaining: number;
  isRunning: boolean;
  isTimeUp: boolean;
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
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Load timer state from localStorage on initial load
  useEffect(() => {
    const savedTimerState = localStorage.getItem("timerState");
    if (savedTimerState) {
      try {
        const { isRunning, examId, endTime } = JSON.parse(savedTimerState);

        if (isRunning && endTime) {
          const now = new Date().getTime();
          const remaining = Math.max(0, endTime - now);

          if (remaining > 0) {
            setTimeRemaining(remaining);
            setIsRunning(true);
            setCurrentExamId(examId);
            setIsTimeUp(false);
          } else {
            // Time is already up
            setTimeRemaining(0);
            setIsRunning(false);
            setIsTimeUp(true);
            setCurrentExamId(examId);
            localStorage.setItem(`examFinished_${examId}`, 'true');
            localStorage.removeItem("timerState");
          }
        }
      } catch (error) {
        console.error("Failed to parse timer state:", error);
        localStorage.removeItem("timerState");
      }
    }
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (isRunning && currentExamId) {
      const endTime = new Date().getTime() + timeRemaining;
      localStorage.setItem(
        "timerState",
        JSON.stringify({
          timeRemaining,
          isRunning,
          examId: currentExamId,
          endTime,
        })
      );
    }
  }, [timeRemaining, isRunning, currentExamId]);

  // Timer tick function
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const id = window.setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          clearInterval(id);
          setIsRunning(false);
          setIsTimeUp(true);
          toast.error("Time's up! You can no longer complete your paper.");
          localStorage.removeItem("timerState");
          return 0;
        }
        return newTime;
      });
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [isRunning, timeRemaining]);

  const startTimer = useCallback(
    (durationInMinutes: number, examId: string) => {
      if (isRunning) {
        toast.warning("You already have an exam in progress!");
        return;
      }

      // 2. ⚠️ NEW CHECK: Check if THIS specific exam is marked as finished
      const isFinished = localStorage.getItem(`examFinished_${examId}`) === 'true';
      if (isFinished) {
        toast.error("This exam has already been completed or the time has expired.");
        return;
      }

      const durationInMilliSeconds = durationInMinutes * 60 * 1000;
      setTimeRemaining(durationInMilliSeconds);
      setIsRunning(true);
      setIsTimeUp(false);
      setCurrentExamId(examId);
      toast.info(`Timer started for ${durationInMinutes} minutes`);
    },
    [isRunning]
  );

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsRunning(false);
    localStorage.removeItem("timerState");
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeRemaining(0);
    setIsTimeUp(false);
    setCurrentExamId(null);
  }, [stopTimer]);

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        stopTimer,
        resetTimer,
        timeRemaining,
        isRunning,
        isTimeUp,
        currentExamId,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
