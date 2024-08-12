import { useState, useCallback, useEffect } from "react";
import {
  OpenVidu,
  Session as OVSession,
  Subscriber,
  Publisher,
} from "openvidu-browser";
import { createToken } from "../../apis/session/openviduAPI";
import useOpenviduStore from "../../zustand/useOpenviduStore";

export const useOpenvidu = () => {
  const {
    session,
    subscriber,
    publisher,
    OV,
    sessionId,
    setSession,
    setSubscriber,
    setPublisher,
    setOV,
    setSessionId,
  } = useOpenviduStore();

  const [isLeaving, setIsLeaving] = useState(false);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);

  // Leaving session
  const leaveSession = useCallback(async () => {
    if (isLeaving || !session) return;

    setIsLeaving(true);
    console.log("세션 종료 시도");

    try {
      await session.disconnect();
      console.log("기존 세션 종료 완료");
    } catch (error) {
      console.error("세션 종료 과정 중 에러: ", error);
    } finally {
      setOV(null);
      setSession(null);
      setSessionId("");
      setSubscriber(null);
      setPublisher(null);
      setIsLeaving(false);
      console.log("세션 초기화 완료");
    }
  }, [session, isLeaving]);

  // Joining session
  const joinSession = useCallback(async (newSessionId: string) => {
    if (isLeaving || !newSessionId) return;

    console.log("새로운 세션 초기화");
    const OVs = new OpenVidu();
    const newSession = OVs.initSession();
    setOV(OVs);
    setSession(newSession);
    setSessionId(newSessionId);

    const getToken = async (): Promise<string> => {
      try {
        return await createToken(newSessionId);
      } catch (error) {
        throw new Error("Failed to get token.");
      }
    };

    try {
      const token = await getToken();
      await newSession.connect(token);
      console.log("세션 연결 성공");

      const newPublisher = OVs.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        mirror: true,
      });

      setPublisher(newPublisher);
      await newSession.publish(newPublisher);
      console.log("스트림 발행 성공");
    } catch (error) {
      console.error("세션 연결 또는 스트림 발행 실패: ", error);
    }
  }, [isLeaving]);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session) return;

    session.on("streamDestroyed", (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });

    session.on("streamCreated", (event) => {
      const newSubscriber = session.subscribe(event.stream, "");
      setSubscriber(newSubscriber);
    });

  }, [session, subscriber]);

  return {
    joinSession,
    leaveSession,
  };
};
