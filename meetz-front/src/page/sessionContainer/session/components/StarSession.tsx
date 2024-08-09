import { Publisher, Subscriber } from "openvidu-browser";
import Video from "./Video";
import { useSessionStore } from "../../../../zustand/useSessionStore";
import Loading from "../../../../common/Loading";

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
}
function StarSession({ subscriber, publisher }: SessionProps) {
  const { starName, fanName } = useSessionStore();
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
        {!subscriber && <Loading width={150} height={150} />}
      </div>
    </div>
  );
}
export default StarSession;
