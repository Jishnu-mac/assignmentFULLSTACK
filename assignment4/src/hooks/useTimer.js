import { useEffect, useState } from "react";

export default function useTimer(initialMinutes = 10) {
  const initialSeconds = initialMinutes * 60;

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = (minutes = initialMinutes) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const setMinutes = (minutes) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    timeLeft,
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    setMinutes,
  };
}