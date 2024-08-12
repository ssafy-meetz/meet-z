import { Publisher, Subscriber } from "openvidu-browser";
import Video from "./Video";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import Loading from "../../../../common/Loading";
import { useEffect, useState } from "react";

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
}
function StarSession({ subscriber, publisher }: SessionProps) {
  const [count, setCount] = useState(0);
  const { starName, fanName } = useSessionStore();
  const { takePhoto, setTakePhoto } = useSessionStore();
  const [flash, setFlash] = useState<boolean>(false);
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
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
    setTakePhoto(false);
  };
  const renderSubscribers = () => {
    return (
      <div className="flex w-full align-middle">
        <div className="relative w-1/2" id="meetingVideo-star">
          <Video streamManager={publisher} />
          <p className="absolute top-0 left-0 p-1 text-white bg-black bg-opacity-75 rounded">
            {starName}
          </p>
        </div>
        <div
          className="flex flex-col relative w-1/2 justify-center"
          id="meetingVideo-fan"
        >
          {subscriber && <Video streamManager={subscriber} />}
          {subscriber && (
            <p className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-75 rounded">
              {fanName}
            </p>
          )}
          {!subscriber && <Loading width={75} height={75} />}
        </div>
      </div>
    );
  };
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
export default StarSession;
