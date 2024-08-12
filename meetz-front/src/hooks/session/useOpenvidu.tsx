import { useCallback, useEffect, useRef } from "react";
import {
  OpenVidu,
  Session as OVSession,

} from "openvidu-browser";
import { createToken } from "../../apis/session/openviduAPI";
import useOpenviduStore from "../../zustand/useOpenviduStore";

export const useOpenvidu = () => {
  const {
    session,
    subscriber,
    exSession,
    setSession,
    setSubscriber,
    setPublisher,
    setOV,
    setSessionId,
    setExSession
  } = useOpenviduStore();

  //이전에 연결된 session 값을 저장하는 참조값
  const exSessionRef = useRef(exSession);

  //exSession 업데이트 해주기
  useEffect(() => {
    exSessionRef.current = exSession;
    console.log("exSession updated:", exSession);
  }, [exSession]);

  //세션 연결 해제
  const leaveSession = useCallback(async () => {
    console.log("세션 종료 시도");
    console.log("Current exSession:", exSessionRef.current);
    //예전에 연결한 세션 값이 있으면 세션 연결 종료
    if (exSessionRef.current) {
      try {
        const sessionToken = exSessionRef.current.token;
        await exSessionRef.current.disconnect();
        console.log("~기존 세션 종료 완료~" + sessionToken);
      } catch (error) {
        console.error("세션 종료 과정 중 에러: ", error);
      }
    } else {
      console.log("종료할 세션이 없습니다.");
    }
    setExSession(null);
    setSession(null);
    setSubscriber(null);
    setPublisher(null);
    setOV(null);
    setSessionId("");
    console.log("세션 상태 초기화 완료");
  }, [setExSession, setSession, setSubscriber, setPublisher, setOV, setSessionId]);

  //세션 접속하기
  const joinSession = useCallback(async (nextSession: string) => {
    if (nextSession === "") {
      return;
    }

    if(exSession){
      await leaveSession();
    }
    console.log("새로운 세션 초기화");
    const OVs = new OpenVidu();
    const newSession = OVs.initSession();
    setOV(OVs);
    setSession(newSession);
    setSessionId(nextSession);

    try {
      const token = await createToken(nextSession);
      await newSession.connect(token);
      console.log("세션 연결 성공");

      //session connect 성공하면 상태에 새로운 세션 저장
      setExSession(newSession);
      if (OVs) {
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
      }
    } catch (error) {
      console.error("세션 연결 또는 스트림 발행 실패: ", error);
      await leaveSession();
    }
  }, [leaveSession, setOV, setSession, setSessionId, setExSession, setPublisher]);


  //페이지를 벗어날 때 leaveSession()
  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);
    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);


  //세션 이벤트 핸들러 (스트림 생성&삭제)
  useEffect(() => {
    if (!session) return;

    const handleStreamDestroyed = (event: { stream: { streamId: any; }; }) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    };

    const handleStreamCreated = (event: { stream: any; }) => {
      const newSubscriber = session.subscribe(event.stream, "");
      setSubscriber(newSubscriber);
    };

    session.on("streamDestroyed", handleStreamDestroyed);
    session.on("streamCreated", handleStreamCreated);

    return () => {
      session.off("streamDestroyed", handleStreamDestroyed);
      session.off("streamCreated", handleStreamCreated);
    };
  }, [session, subscriber, setSubscriber]);

  return {
    joinSession,
    leaveSession,
  };
};