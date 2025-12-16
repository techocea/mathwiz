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
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Load timer state from localStorage on initial load
  useEffect(() => {
    const savedTimerState = localStorage.getItem("timerState");
    if (savedTimerState) {
      try {
        const { isRunning, examId, endTime } = JSON.parse(savedTimerState);

        const isSubmitted = localStorage.getItem(`examSubmitted_${examId}`) === "true";
        setHasSubmitted(isSubmitted);

        if (isRunning && endTime && !isSubmitted) {
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
            localStorage.removeItem("timerState");
          }
        }
      } catch (error) {
        console.error("Failed to parse timer state:", error);
        localStorage.removeItem("timerState");
      }
    }
  }, []);

  useEffect(() => {
    if (currentExamId) {
      const isSubmitted = localStorage.getItem(`examSubmitted_${currentExamId}`) === "true";
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
    if (!isRunning) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      return;
    }
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
      if (isRunning && currentExamId !== examId) {
        toast.warning("You already have an exam in progress!");
        return;
      }

      // Check if this exam is already submitted
      if (localStorage.getItem(`examSubmitted_${examId}`) === "true") {
        toast.error("This paper has already been submitted.");
        return;
      }

      if (isRunning && currentExamId === examId) {
        return;
      }

      const durationInMilliSeconds = durationInMinutes * 60 * 1000;
      setTimeRemaining(durationInMilliSeconds);
      setIsRunning(true);
      setIsTimeUp(false);
      setHasSubmitted(false);
      setCurrentExamId(examId);
      toast.info(`Timer started for ${durationInMinutes} minutes`);
    },
    [isRunning, currentExamId]
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
    setHasSubmitted(false);
    setCurrentExamId(null);
    localStorage.removeItem("timerState");
  }, [stopTimer]);

  const setExamSubmitted = useCallback((examId: string) => {
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
  }, [currentExamId, stopTimer]);

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
