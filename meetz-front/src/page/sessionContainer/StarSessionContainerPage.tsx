import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import StarSessionPage from "./session/pages/StarSessionPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import fetchUserData from "../../lib/fetchUserData";
import { EventSourcePolyfill } from "event-source-polyfill";
type SessionInfo = {
  fanId: string;
  timer: number;
  starName: string;
  fanName: string;
  remain: string;
};
const StarSessionContainerPage = () => {
  const {
    settingDone,
    remain,
    setTimer,
    setStartName,
    setFanId,
    setFanName,
    setRemain,
  } = useSessionStore();
  useEffect(() => {
    fetchSSE();
  }, []);

  const setInfo = (info: SessionInfo) => {
    return new Promise<void>((resolve) => {
      setTimer(info.timer);
      setStartName(info.starName);
      setFanId(info.fanId);
      setFanName(info.fanName);
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
        fanId: parseData.fanId,
        timer: parseData.timer,
        starName: parseData.starName,
        fanName: parseData.currentFanName,
        remain: parseData.remainFanNum,
      };

      setInfo(info);
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

  if (remain === -1) {
    return <SessionSwitchPage />;
  }
  if (settingDone) {
    return <StarSessionPage />;
  }

  return <StarLoadingPage />;
};
export default StarSessionContainerPage;
