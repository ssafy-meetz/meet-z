import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";
import { EventSourcePolyfill } from "event-source-polyfill";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import fetchUserData from "../../lib/fetchUserData";
import FanSessionPage from "./session/pages/FanSessionPage";
import FanSettingPage from "./setting/pages/FanSettingPage";
import { useOpenvidu } from "../../hooks/session/useOpenvidu";
type SessionInfo = {
  timer: number;
  starName: string;
  nextStarName: string;
  token: string;
};
const FanSessionContainerPage = () => {
  const [wait, setWait] = useState(200);
  const [remain, setRemain] = useState(200);
  const { settingDone, setToken, setTimer, setStartName, setNextStarName } =
    useSessionStore();

  //SSE 연결
  useEffect(() => {
    fetchSSE();
  }, []);

  const setInfo = (info: SessionInfo) => {
    return new Promise<void>((resolve) => {
      setTimer(info.timer);
      setStartName(info.starName);
      setNextStarName(info.nextStarName);
      setToken(info.token);
      resolve();
    });
  };

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
    eventSource.onopen = () => {
      console.log("!SSE 연결 성공!");
    };
    eventSource.onmessage = async (e: any) => {
      const res = await e.data;
      const parseData = JSON.parse(res);
      console.log(parseData);
      const info: SessionInfo = {
        timer: parseData.timer,
        starName: parseData.starName,
        nextStarName: parseData.nextStarName,
        token: parseData.viduToken,
      };
      await setInfo(info);
      setWait(0);
      setRemain(parseData.remainStarNum);

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

  if (wait === 0 && settingDone) {
    return <FanSessionPage />;
  }
  if (remain === 0) {
    return <SessionSwitchPage />;
  }
  return <FanSettingPage />;
  // return <FanSessionPage />;
};

export default FanSessionContainerPage;
