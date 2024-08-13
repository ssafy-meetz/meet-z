import { useState, useEffect } from "react";
import logo from "/src/assets/images/sessionlogo.png";
import meetz from "/src/assets/images/meetz.png";
import SessionLoading from "../../../../common/SessionLoading";
import { useSessionStore } from "../../../../zustand/useSessionStore";

const LoadingSession = () => {
  const [message, setMessage] = useState("스타와 팬을 연결 중이에요");
  const [fadeIn, setFadeIn] = useState(true);
  const { timer } = useSessionStore();
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Fade out

      setTimeout(() => {
        setMessage((prevMessage) =>
          prevMessage === "스타와 팬을 연결 중이에요"
            ? `${timer}초 후에 시작됩니다. 잠시만 기다려주세요`
            : "스타와 팬을 연결 중이에요"
        );
        setFadeIn(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 ">
      <img src={meetz} alt="meetz" className="w-40 animate-bounce -mb-14" />
      <div className="pr-4">
        <SessionLoading />
      </div>
      <div className="flex flex-col items-center gap-5">
        <img src={logo} alt="logo" className="w-[220px] h-[40px]" />
        <span
          className={`text-white font-semibold text-5xl transition-opacity duration-500 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default LoadingSession;
