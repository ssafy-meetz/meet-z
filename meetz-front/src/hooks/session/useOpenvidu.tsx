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

  // Leaving session
  const leaveSession = useCallback(() => {
    if (!session) return;
    console.log(session);
    session.disconnect();
    console.log("~기존 세션 종료 완료~");
    setOV(null);
    setSession(null);
    setSessionId("");
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  // Joining session
  const joinSession = () => {
    if (session) {
      leaveSession();
    }
    if (sessionId === "") return;
    const OVs = new OpenVidu();
    const newSession = OVs.initSession();
    setOV(OVs);
    setSession(newSession);
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
        const token = await createToken(sessionId);
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
  }, [session, OV, setSessionId]);
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
