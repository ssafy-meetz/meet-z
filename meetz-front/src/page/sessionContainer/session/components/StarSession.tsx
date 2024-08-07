import React from "react";
import { useState } from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import Video from "./Video";
import { useSessionStore } from "../../../../zustand/useSessionStore";

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
}
interface Memo {
  star: string;
  text: string;
}

function StarSession({ subscriber, publisher }: SessionProps) {
  const { starName, fanName, fanId } = useSessionStore();
  return (
    <div className="flex w-full">
      <div className="relative w-1/2" id="meetingVideo-star">
        <Video streamManager={publisher} />
        <p className="absolute top-0 left-0 p-1 text-white bg-black bg-opacity-75 rounded">
          {starName}
        </p>
      </div>
      <div className="relative w-1/2" id="meetingVideo-fan">
        {subscriber && <Video streamManager={subscriber} />}
        {subscriber && (
          <p className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-75 rounded">
            {fanName}
          </p>
        )}
      </div>
    </div>
  );
}
export default StarSession;
