import { useState, useCallback, useEffect } from "react";
import {
  OpenVidu,
  Session as OVSession,
  Subscriber,
  Publisher,
} from "openvidu-browser";
import { useSessionStore } from "../../zustand/useSessionStore";
import { createSession, createToken } from "../../apis/session/openviduAPI";

export const useOpenvidu = () => {
  const [session, setSession] = useState<OVSession | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const { getSessionId } = useSessionStore();

  // Leaving session
  const leaveSession = useCallback(async () => {
    if (session) {
      try {
        await new Promise<void>((resolve) => {
          session.disconnect();
          resolve();
        });
      } catch (error) {
        console.error("Error leaving session:", error);
      }
      setOV(null);
      setSession(null);
      setSubscriber(null);
      setPublisher(null);
    }
  }, [session]);

  // Joining session
  const joinSession = () => {
    if (getSessionId === "") return;
    const OVs = new OpenVidu();
    const newSession = OVs.initSession();
    setOV(OVs);
    setSession(newSession);
    setSessionId(getSessionId);
  };

  useEffect(() => {
    // Cleanup on component unmount or leaveSession change
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session) return;

    session.on("streamCreated", (event) => {
      const subscribers = session.subscribe(event.stream, "");
      setSubscriber(subscribers);
    });

    const getToken = async (): Promise<string> => {
      // 지금은 openvidu한테 바로 만들어달라고 하지만 여기서 백엔드랑 통신할거임
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
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
  }, [session, OV, sessionId]);
  return {
    session,
    sessionId,
    publisher,
    subscriber,
    joinSession,
    setSessionId,
    leaveSession,
  };
};
