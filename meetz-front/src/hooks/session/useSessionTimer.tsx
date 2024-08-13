import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";

const useSessionTimer = () => {
  const { timer } = useSessionStore();
  const [time, setTime] = useState(timer);
  const [formatTime, setFormatTime] = useState("");
  useEffect(() => {
    setTime(timer);
    const secondId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(secondId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(secondId);
  }, [timer]);
  useEffect(() => {
    const formatTime = (totalTime: number) => {
      const minutes = Math.floor(totalTime / 60);
      const seconds = Math.floor(totalTime % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    setFormatTime(formatTime(time));
  }, [time]);
  return { formatTime };
};
export default useSessionTimer;
