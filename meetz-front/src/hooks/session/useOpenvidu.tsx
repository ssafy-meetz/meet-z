import { useState, useCallback, useEffect } from "react";
import {
  OpenVidu,
  Session as OVSession,
  Subscriber,
  Publisher,
} from "openvidu-browser";
import { useSessionStore } from "../../zustand/useSessionStore";
import { createToken } from "../../apis/session/openviduAPI";

export const useOpenvidu = () => {
  const [session, setSession] = useState<OVSession | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const { getSessionId } = useSessionStore();

  // Leaving session
  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession(null);
    setSessionId("");
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  // Joining session
  const joinSession = () => {
    if (session) {
      console.log("~기존 세션 종료~");
      session.disconnect();
    }
    if (getSessionId === "") return;
    const OVs = new OpenVidu();
    const newSession = OVs.initSession();
    setOV(OVs);
    setSession(newSession);
    setSessionId(getSessionId);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, []);

  useEffect(() => {
    if (!session) return;

    session.on("streamDestroyed", (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (!session) return;

    session.on("streamCreated", (event) => {
      const subscribers = session.subscribe(event.stream, "");
      setSubscriber(subscribers);
    });

    const getToken = async (): Promise<string> => {
      try {
        const token = await createToken(getSessionId);
        return token;
      } catch (error) {
        throw new Error("Failed to get token.");
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });
              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, getSessionId]);
  return {
    session,
    sessionId,
    publisher,
    subscriber,
    joinSession,
    setSessionId,
    leaveSession,
    setSubscriber,
  };
};
