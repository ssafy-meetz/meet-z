import { useCallback, useEffect, useRef, useState } from "react";
import { OpenVidu, Session as OVSession } from "openvidu-browser";
import {
  checkSessionExists,
  createSession,
  createToken,
  deleteViduRecording,
  startViduRecording,
  stopViduRecording,
} from "../../apis/session/openviduAPI";
import useOpenviduStore from "../../zustand/useOpenviduStore";
import fetchUserData from "../../lib/fetchUserData";
import instance from "../../apis/axios";

export const useOpenvidu = () => {
  const { accessToken } = fetchUserData();
  const {
    session,
    subscriber,
    exSession,
    sessionId,
    setSession,
    setSubscriber,
    setPublisher,
    setOV,
    setSessionId,
    setExSession,
  } = useOpenviduStore();
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const handleVideoProcessing = async (sessionId: string) => {
    try {
      const data = await stopViduRecording(sessionId);
      console.log(data);
      return data.url;
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const fetchVideoBlob = async (url: string) => {
    try {
      const response = await fetch(url); // MP4 파일 URL
      const blob = await response.blob();
      console.log(">>>>>>> 오픈비두 서버에서 받아온 mp4파일을 blob으로 변환함. ", blob);
      return blob;
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const uploadVideo = async (blob: Blob, sessionId: string, accessToken: string) => {
    try {
      const formData = new FormData();
      formData.append('file', blob, 'file.mp4');

      const { status } = await instance.post(`/api/meeting/check-profanity?email=${sessionId + "@meetz.com"}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return status;
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };




  //이전에 연결된 session 값을 저장하는 참조값
  const exSessionRef = useRef(exSession);

  //exSession 업데이트 해주기
  useEffect(() => {
    exSessionRef.current = exSession;
    console.log("exSession updated:", exSession);
  }, [exSession]);

  //세션 연결 해제
  const leaveSession = useCallback(async () => {
    // 음성 녹음 정지 및 전송

    console.log("세션 종료 시도");
    console.log("Current exSession:", exSessionRef.current);
    //예전에 연결한 세션 값이 있으면 세션 연결 종료
    if (exSessionRef.current) {
      const url = await handleVideoProcessing(exSessionRef.current.sessionId) || '';
      if (url) {
        const blob = await fetchVideoBlob(url) || null;
        if (blob) {
          const status = await uploadVideo(blob, exSessionRef.current.sessionId, accessToken || '')
          if (status) {
            await deleteViduRecording(exSessionRef.current.sessionId);
          }
        }
      }

      // try {
      //   // 반환값으로 넘어오는 url
      //   const data = await stopViduRecording(exSessionRef.current.sessionId);
      //   console.log(data)
      //   try {
      //     const response = await fetch(data.url); // MP4 파일 URL
      //     const blob = await response.blob();
      //     setVideoBlob(blob);
      //     console.log(">>>>>>> 오픈비두 서버에서 받아온 mp4파일을 blob으로 변환함. ", blob)
      //     const formData = new FormData();
      //     formData.append('file', blob, 'file.mp4');
      //     await instance.post(`/api/meeting/check-profanity?email=${exSessionRef.current.sessionId + "@meetz.com"}`, formData, {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     });
      //   } catch (error) {
      //     console.error('Error fetching video:', error);
      //   }
      // } catch (error) {
      //   console.error(error);
      // }

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
  }, [
    setExSession,
    setSession,
    setSubscriber,
    setPublisher,
    setOV,
    setSessionId,
  ]);

  //세션 접속하기
  const joinSession = useCallback(
    async (nextSession: string) => {
      if (nextSession === "") {
        return;
      }

      if (exSession) {
        await leaveSession();
      }
      const sessionExists = await checkSessionExists(nextSession);
      if (!sessionExists) {
        console.log("세션이 존재하지 않음, 세션 생성 시도 중...");
        const createdSessionId = await createSession(nextSession);
        if (createdSessionId === "") {
          console.error("세션 생성 실패");
          return;
        }
        console.log("세션 생성 성공:", createdSessionId);

      } else {
        console.log("세션이 이미 존재함");
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
        console.log("세션 연결 성공", newSession);

        startViduRecording(newSession.sessionId);
        // startRecording(); // 음성 녹음 시작
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
    },
    [leaveSession, setOV, setSession, setSessionId, setExSession, setPublisher]
  );

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

    const handleStreamDestroyed = (event: { stream: { streamId: any } }) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    };

    const handleStreamCreated = (event: { stream: any }) => {
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
