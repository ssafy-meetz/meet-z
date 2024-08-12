import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";
import { useOpenvidu } from "./useOpenvidu";

const useSessionTimer = () => {
  const { session } = useOpenvidu();
  const { timer } = useSessionStore();
  const [time, setTime] = useState(0);
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
  useEffect(() => {
    setTime(timer);
  }, [timer]);
  return { formatTime };
};
export default useSessionTimer;
