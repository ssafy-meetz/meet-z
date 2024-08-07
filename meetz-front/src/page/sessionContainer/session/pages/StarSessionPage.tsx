import { Session as OVSession, Subscriber, Publisher } from "openvidu-browser";
import { useOpenvidu } from "../../../../hooks/session/useOpenvidu";
import { useEffect, useState } from "react";
import logo_white from "/src/assets/images/logo-white.png";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import StarSession from "../components/StarSession";
import { useReportModal } from "../../../../zustand/useReportModal";
import ReportFanModal from "../components/ReportFanModal";
import CompleteReportFanModal from "../components/CompleteReportFanModal";

function StarSessionPage() {
  const { session, publisher, subscriber, joinSession } = useOpenvidu();
  const [time, setTime] = useState(0);
  const [formatTime, setFormatTime] = useState("");
  const { timer, remain, token } = useSessionStore();
  const { openModal, confirmModal, setOpenModal } = useReportModal();
  const openReportModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (token !== "") {
      joinSession();
    }
  }, [token]);

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
  }, []);
  useEffect(() => {
    const formatTime = (totalTime: number) => {
      const minutes = Math.floor(totalTime / 60);
      const seconds = Math.floor(totalTime % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    setFormatTime(formatTime(time));
  }, [time]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div>
          <img className="w-56 mb-[48px]" src={logo_white} />
        </div>
        <div className="flex w-[846px] justify-between">
          <p className="text-xl text-white font-bold">{remain}</p>
          <p className="text-2xl text-[#FE9374] font-semibold">{formatTime}</p>
        </div>

        <div className="flex w-[846px]" style={{ transform: "none" }}>
          {session && publisher && (
            <StarSession publisher={publisher} subscriber={subscriber} />
          )}
        </div>
        <div className="flex w-[864px] justify-end">
          <button
            onClick={openReportModal}
            className="text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white"
          >
            🚨신고
          </button>
        </div>
      </div>
      {openModal && <ReportFanModal />}
      {confirmModal && <CompleteReportFanModal />}
    </div>
  );
}

export default StarSessionPage;
