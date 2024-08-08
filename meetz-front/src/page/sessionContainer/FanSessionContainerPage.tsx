import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";
import { EventSourcePolyfill } from "event-source-polyfill";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import fetchUserData from "../../lib/fetchUserData";
import FanSessionPage from "./session/pages/FanSessionPage";
import FanSettingPage from "./setting/pages/FanSettingPage";
import { useOpenvidu } from "../../hooks/session/useOpenvidu";
import useSaveImage from "../../hooks/session/useSaveImage";
type SessionInfo = {
  timer: number;
  starName: string;
  nextStarName: string;
  sessionId: string;
};
const FanSessionContainerPage = () => {
  const [wait, setWait] = useState(200);
  const [remain, setRemain] = useState(200);
  const [meetingDone, setMeetingDone] = useState(false);
  const [progressMeeting, setProgressMeeting] = useState(false);
  const {
    settingDone,
    setGetSessionId,
    setTimer,
    setStartName,
    setNextStarName,
  } = useSessionStore();
  const { sendImage } = useSaveImage();
  const { leaveSession } = useOpenvidu();

  //로딩될 때마다 SSE 연결 시도
  useEffect(() => {
    fetchSSE();
  }, []);
  useEffect(() => {
    if (wait === 0) {
      setProgressMeeting(true);
    }
  }, [wait]);
  useEffect(() => {
    if (!settingDone && progressMeeting) {
      alert("카메라 설정이 완료되어야 미팅 입장이 진행됩니다.");
    }
  }, [progressMeeting]);
  useEffect(() => {
    if (meetingDone) {
      console.log("Sending image to server...");
      sendImage();
    }
  }, [meetingDone]);
  useEffect(() => {
    // 상태가 업데이트된 후 이동할 페이지를 결정
    if (remain === -1) {
      console.log("Remain is -1, navigating to SessionSwitchPage");
    }
  }, [remain]);
  //fetchSSE 연결
  const fetchSSE = () => {
    console.log("SSE 연결 시도");
    const { accessToken } = fetchUserData();
    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_DEPLOYED_URL}/api/sessions/sse`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "text/event-stream",
        },
        heartbeatTimeout: 7200 * 1000,
      }
    );

    //SSE와 연결 되었을 때
    eventSource.onopen = () => {
      console.log("!SSE 연결 성공!");
    };

    //SSE에게 메시지를 전달 받았을 때
    eventSource.onmessage = async (e: any) => {
      const res = await e.data;
      const parseData = JSON.parse(res);
      console.log(parseData);
      const info: SessionInfo = {
        timer: parseData.timer,
        starName: parseData.currentStarName,
        nextStarName: parseData.nextStarName,
        sessionId: parseData.viduToken,
      };
      await leaveSession();
      await setInfo(info);
      setWait(parseData.waitingNum);
      setRemain(parseData.remainStarNum);
      //현재 임시로 remain이 0인 경우 사진 발송 진행!
      if (parseData.remainStarNum === -1) {
        setMeetingDone(true);
      }
      //SSE에러 발생 시 SSE와 연결 종료
      eventSource.onerror = (e: any) => {
        eventSource.close();
        if (e.error) {
          console.error(e.error);
        }
        if (e.target.readyState === EventSourcePolyfill.CLOSED) {
          console.log("EventSourcePolyFill-CLOSED");
        }
      };
    };
  };

  //
  const setInfo = async (info: SessionInfo) => {
    return new Promise<void>((resolve) => {
      setTimer(info.timer);
      setStartName(info.starName);
      setNextStarName(info.nextStarName);
      setGetSessionId(info.sessionId);
      resolve();
    });
  };
  if (remain === -1) {
    return <SessionSwitchPage />;
  }
  if (wait === 0 && settingDone) {
    return <FanSessionPage />;
  }

  return <FanSettingPage />;
  // return <FanSessionPage />;
};

export default FanSessionContainerPage;
