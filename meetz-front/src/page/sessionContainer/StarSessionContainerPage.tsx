import { useEffect, useState } from "react";
import { useSessionStore } from "../../zustand/useSessionStore";
import StarSessionPage from "./session/pages/StarSessionPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import fetchUserData from "../../lib/fetchUserData";
import { EventSourcePolyfill } from "event-source-polyfill";
import StarEndPage from "./session/pages/StarEndPage";

type SessionInfo = {
  fanId: string;
  timer: number;
  fanName: string;
  remain: number;
};

type FanDto = {
  name: string;
  nickname: string;
};

interface MeetingInfo {
  name: string;
  meetingName: string;
  meetingId: number;
  meetingDuration: number;
  meetingStart: string;
  term: number;
  fanList: FanDto[];
}

const StarSessionContainerPage = () => {
  const [type, setType] = useState(0);
  const { setTakePhoto } = useSessionStore();

  const [meetingInfo] = useState<MeetingInfo>(
    JSON.parse(sessionStorage.getItem("mis") || "")
  );
  const {
    settingDone,
    timer,
    setTimer,
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
      setFanId(info.fanId);
      setFanName(info.fanName);
      setRemain(info.remain);
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
      setType(parseData.type);
      if (parseData.type === 1) {
        await setSessionInfo(parseData);
      } else if (parseData.type === 3) {
        setTakePhoto(true);
      }

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

  const setSessionInfo = async (parseData: any) => {
    const info: SessionInfo = {
      fanId: parseData.currentFanId,
      timer: parseData.timer,
      fanName: parseData.currentFanName,
      remain: parseData.remainFanNum,
    };

    setInfo(info);
  }

  if (type === 4) {
    return <StarEndPage />;
  }
  if (settingDone) {
    return <StarSessionPage />;
  }

  return <StarLoadingPage meetingInfo={meetingInfo} />;
};
export default StarSessionContainerPage;
