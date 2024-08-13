import React from "react";
import { useState, useEffect } from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import Video from "./Video";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import camera_icon from "/src/assets/images/camera.png";
import useSaveImage from "../../../../hooks/session/useSaveImage";

import "./flash.css";
import sendTakePhoto from "../../../../apis/session/sendTakePhoto";
import useRecorder from "../../../../hooks/session/useRecorder";

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
  fanName: string | null;
}
interface Memo {
  star: string;
  text: string;
}

function FanSession({ subscriber, publisher, fanName }: SessionProps) {
  const [count, setCount] = useState(0);
  const [memo, setMemo] = useState<String | null>("");
  const { takePhoto, setTakePhoto } = useSessionStore();
  const { starName, nextStarName } = useSessionStore();
  const { compositionImage, addImageToLocalStorage } = useSaveImage();
  const [flash, setFlash] = useState<boolean>(false);
  const { startRecording } = useRecorder();

  const toggleTakePhoto = () => {
    //사진 촬영 요청
    sendTakePhoto();
  };
  const handleCompleteTakePhoto = () => {
    setTakePhoto(false);
  };

  useEffect(() => {
    const storedMemos = localStorage.getItem("memos");
    if (storedMemos) {
      try {
        const memos: Memo[] = JSON.parse(storedMemos);
        const findMemo = memos.find((m) => m.star == starName);
        if (findMemo) {
          setMemo(findMemo.text);
        }
      } catch { }
    }
  }, []);

  //3초 타이머 설정
  useEffect(() => {
    if (!takePhoto) return;
    setCount(3);
    const timerId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerId);
          capturePhoto();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [takePhoto]);

  const capturePhoto = async () => {
    console.log("찰칵!");
    setFlash(true);
    const element1 = document.getElementById("meetingVideo-fan");
    const element2 = document.getElementById("meetingVideo-star");
    const image: string = await compositionImage(element1, element2);
    addImageToLocalStorage(image);
    handleCompleteTakePhoto();
    setTimeout(() => setFlash(false), 500);
  };

  const renderSubscribers = () => {
    return (
      <div>
        <div className="flex">
          <div className="relative w-1/2" id="meetingVideo-fan">
            {subscriber && <Video streamManager={subscriber} />}
            {subscriber && !takePhoto && (
              <p className="absolute top-0 left-0 p-1 text-white bg-black bg-opacity-75 rounded">
                {starName}
              </p>
            )}
          </div>
          <div className="relative w-1/2" id="meetingVideo-star">
            <Video streamManager={publisher} />
            {!takePhoto && (
              <p className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-75 rounded">
                {fanName}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          <div className="w-[846px] h-[80px] bg-[#FE9374] mb-4 p-4">
            <p>{memo}</p>
          </div>
          <div className="flex w-[846px] justify-between text-xl">
            <div className="w-[70px]"></div>
            <img
              className="w[48px] h-[48px]"
              src={camera_icon}
              onClick={toggleTakePhoto}
            />
            {nextStarName && (
              <p className="text-white w-[70px]">{nextStarName} &gt;</p>
            )}
            {!nextStarName && (
              <p className="text-white w-[70px]">{nextStarName} </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  //3초 카운트 보여주는 html
  return (
    <>
      {renderSubscribers()}
      {count !== null && count > 0 && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="text-6xl text-white font-bold">{count}</div>
        </div>
      )}
      {flash && (
        <div className="fixed inset-0 bg-white opacity-75 flash-animation"></div>
      )}
    </>
  );
}
export default FanSession;
