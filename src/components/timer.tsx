"use client";
import { useState, useEffect, useRef } from "react";

type TimerProps = {
  duration: number;
};

export const Timer = ({ duration }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-500 text-white text-2xl p-4 rounded-md">
      {timeLeft} seconds
      <div className="flex mt-4">
        <button
          onClick={startTimer}
          className="bg-green-500 px-4 py-2 rounded mr-2"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="bg-yellow-500 px-4 py-2 rounded mr-2"
        >
          Pause
        </button>
        <button onClick={stopTimer} className="bg-red-500 px-4 py-2 rounded">
          Stop
        </button>
      </div>
    </div>
  );
};
