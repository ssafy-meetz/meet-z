import React, { useEffect, useState } from "react";
import SetCam from "../components/SetCam";
import SetMemo from "../components/SetMemo";
import SetNickname from "../components/SetNickname";
import SetWait from "../components/SetWait";
import ChattingBox from "../components/ChattingBox";
import StepBox from "../components/StepBox";
import logo from "/src/assets/images/logo.png";
import useEnvSettingStore from "../../../../zustand/useEnvSettingStore";
import useCheckAuth from "../../../../hooks/meeting/useCheckAuth";
import { messageDto } from "../../../../types/types";
import getChatDetailForFan from "../../../../apis/managerChat/getChatDetailForFan";
import fetchUserData from "../../../../lib/fetchUserData";
import { useSessionStore } from "../../../../zustand/useSessionStore";

const FanSettingPage: React.FC = () => {
  useCheckAuth("FAN");
  const { accessToken } = fetchUserData();
  const { currentStep, isChattingBoxVisible, toggleChattingBox } =
    useEnvSettingStore();
  const [meetingName, setMeetingName] = useState("");
  const [fanId, setFanId] = useState(0);
  const [managerId, setManagerId] = useState(0);

  const mi: string | null = window.sessionStorage.getItem('mi');

  const [chatHistory, setChatHistory] = useState<messageDto[]>([]);

  const steps = [
    { step: 1, label: "닉네임 설정" },
    { step: 2, label: "웹캠 연결" },
    { step: 3, label: "메모 작성" },
    { step: 4, label: "대기" },
  ];

  const fetchChatHistory = async () => {
    try {
      const { chats, fanId, managerId } = await getChatDetailForFan(accessToken || "");
      setChatHistory(chats);
      setFanId(fanId);
      setManagerId(managerId);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (mi) {
      const data = JSON.parse(mi);
      setMeetingName(data.meetingName)
    }

    fetchChatHistory();
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f9f9f9]">
      <div className="max-w-screen-xl w-screen px-24 ">
        <div className="flex justify-between items-end font-medium text-xl mb-2">
          <img src={logo} alt="logo" className="w-[169px] h-[32px]" />
          <span className="text-[#ff7777] font-semibold text-shadow-shine cursor-default">
            {meetingName}
          </span>
        </div>
        <div className="flex border-2 rounded-3xl border-[#d9d9d9] bg-white shadow-2xl">
          {isChattingBoxVisible ? (
            <ChattingBox isChattingBoxVisible={isChattingBoxVisible} chatHistory={chatHistory} setChatHistory={setChatHistory} fanId={fanId} managerId={managerId} />
          ) : (
            <StepBox
              steps={steps}
              currentStep={currentStep}
              toggleChattingBox={toggleChattingBox}
            />
          )}

          {currentStep === 1 && <SetNickname />}
          {currentStep === 2 && <SetCam />}
          {currentStep === 3 && <SetMemo />}
          {currentStep === 4 && <SetWait />}
        </div>
      </div>
    </div>
  );
};

export default FanSettingPage;
