import { Session as OVSession, Subscriber, Publisher } from "openvidu-browser";
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

function StarSessionPage() {
  const { session, publisher, subscriber, joinSession } = useOpenvidu();
  const { remain, getSessionId, setGetSessionId } = useSessionStore();
  const { openModal, confirmModal, setOpenModal } = useReportModal();
  const { accessToken } = fetchUserData();
  const { formatTime } = useSessionTimer();

  const openReportModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    getSession();
  });

  const getSession = async () => {
    if (accessToken) {
      const id = await getStarSessionId(accessToken);
      setGetSessionId(id);
    }
  };
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
