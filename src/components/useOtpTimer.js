import { useEffect, useState } from "react";

const useOtpTimer = (initialSeconds = 300) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return {
    minutes,
    seconds,
    expired: secondsLeft === 0,
    reset: () => setSecondsLeft(initialSeconds)
  };
};

export default useOtpTimer;
