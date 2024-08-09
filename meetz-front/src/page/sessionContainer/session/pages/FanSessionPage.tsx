import { useOpenvidu } from "../../../../hooks/session/useOpenvidu";
import { useEffect, useState } from "react";
import logo_white from "/src/assets/images/logo-white.png";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import FanSession from "../components/FanSession";
import useSessionTimer from "../../../../hooks/session/useSessionTimer";
import { MeetingInfoDto } from "../../../../types/types";

function FanSessionPage() {
  const { session, publisher, subscriber, joinSession } = useOpenvidu();
  const { formatTime } = useSessionTimer();
  const { getSessionId } = useSessionStore();
  const [meetingInfo] = useState<MeetingInfoDto>(
    JSON.parse(sessionStorage.getItem("mi") || "")
  );
  useEffect(() => {
    if (getSessionId !== "") {
      joinSession();
    }
  }, [getSessionId]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div>
          <img className="w-56 mb-[48px]" src={logo_white} />
        </div>
        <div className="flex w-[846px] justify-between">
          <p className="text-xl text-white font-bold">
            {meetingInfo.meetingName}
          </p>
          <p className="text-2xl text-[#FE9374] font-semibold">{formatTime}</p>
        </div>

        <div className="flex w-[846px]" style={{ transform: "none" }}>
          {session && publisher && (
            <FanSession
              publisher={publisher}
              subscriber={subscriber}
              fanName={meetingInfo.nickname}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FanSessionPage;
