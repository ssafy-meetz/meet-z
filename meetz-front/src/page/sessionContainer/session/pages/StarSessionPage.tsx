import { useOpenvidu } from "../../../../hooks/session/useOpenvidu";
import { useEffect, useState } from "react";
import logo_white from "/src/assets/images/logo-white.png";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import StarSession from "../components/StarSession";
import { useReportModal } from "../../../../zustand/useReportModal";
import ReportFanModal from "../components/ReportFanModal";
import CompleteReportFanModal from "../components/CompleteReportFanModal";
import fetchUserData from "../../../../lib/fetchUserData";
import getStarSessionId from "../../../../apis/session/getStarSessionId";
import useSessionTimer from "../../../../hooks/session/useSessionTimer";
import useOpenviduStore from "../../../../zustand/useOpenviduStore";

function StarSessionPage() {
  const { joinSession } = useOpenvidu();
  const { remain } = useSessionStore();
  const { sessionId, session, publisher, subscriber, setSessionId } =
    useOpenviduStore();
  const { openModal, confirmModal, setOpenModal } = useReportModal();
  const { accessToken } = fetchUserData();
  const { formatTime } = useSessionTimer();

  const openReportModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    if (accessToken) {
      const id = await getStarSessionId(accessToken);
      setSessionId(id);
    }
  };
  useEffect(() => {
    if (sessionId !== "") {
      joinSession(sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div>
          <img className="w-56 mb-[48px]" src={logo_white} />
        </div>
        <div className="flex w-[846px] justify-between">
          <p className="text-xl text-white font-bold">
            남은 팬의 수 : {remain}
          </p>
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
