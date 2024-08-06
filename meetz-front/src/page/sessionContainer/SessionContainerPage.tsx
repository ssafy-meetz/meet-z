import { useEffect, useState } from "react";
import FanSettingPage from "./setting/pages/FanSettingPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import { useSessionStore } from "../../zustand/useSessionStore";
import StarSessionPage from "./session/pages/StarSessionPage";
import FanSessionPage from "./session/pages/FanSessionPage";
import { EventSourcePolyfill } from "event-source-polyfill";
import fetchUserData from "../../lib/fetchUserData";

const SessionContainerPage = () => {
  // const storedRole:String|null = window.sessionStorage.getItem('rl');
  const storedRole: String | null = "FAN";
  const storedMeetingId: String | null = window.sessionStorage.getItem("mi");
  const {
    wait,
    fanId,
    remain,
    settingDone,
    setWait,
    setFanId,
    setRemain,
    setSettingDone,
  } = useSessionStore();
  //SSE 연결
  useEffect(() => {
    fetchSSE();
  }, []);
  const fetchSSE = () => {
    const { accessToken } = fetchUserData();
    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_DEPLOYED_URL}/api/sessions/sse`,
      {
        headers: {
          //   "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "text/event-stream",
        },
        heartbeatTimeout: 7200 * 1000,
      }
    );
    eventSource.onopen = () => {
      console.log("!SSE 연결 성공!");
    };
    eventSource.onmessage = async (e) => {
      const res = await e.data;
      const parseData = JSON.parse(res);
      console.log(parseData);
    };
    eventSource.onerror = (e: any) => {
      eventSource.close();
      if (e.error) {
      }
      if (e.target.readyState === EventSourcePolyfill.CLOSED) {
      }
    };
  };

  if (storedRole === "STAR") {
    if (settingDone) {
      return <StarSessionPage />;
    }
    if (remain === 0) {
      return <SessionSwitchPage />;
    }
    // return <StarLoadingPage />
    return <StarSessionPage />;
  }

  if (storedRole === "FAN") {
    if (wait === 0 && settingDone) {
      return <FanSessionPage />;
    }
    if (remain === 0) {
      return <SessionSwitchPage />;
    }
    // return <FanSettingPage />
    return <FanSessionPage />;
  }
};
export default SessionContainerPage;
