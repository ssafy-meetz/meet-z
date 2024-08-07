import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ChatFanListItem from "./ChatFanListItem";
import { useEffect } from "react";
import getChatListForManager from "../../../../apis/managerChat/getChatListForManager";
import fetchUserData from "../../../../lib/fetchUserData";
import { useManagerChatStore } from "../../../../zustand/useManagerChatStore";

const ChatFanList = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const { setFanList, setChatRoomId, setManagerId } = useManagerChatStore();
  const { accessToken } = fetchUserData();

  const handleButtonClick = () => {
    if (!meetingId) {
      return;
    }
    navigate(`/meeting/detail/${+meetingId}`);
  };

  const fetchChatList = async () => {
    if (!meetingId) {
      return;
    }

    const { rooms, chatRoomId, managerId } = await getChatListForManager(+meetingId, accessToken || "");
    setFanList(rooms);
    setManagerId(managerId);
    setChatRoomId(chatRoomId);
  }

  useEffect(() => {
    fetchChatList();
  }, [])

  return (
    <div className='w-80 h-full border-r-4 overflow-y-hidden'>
      <div className='w-full h-20 flex flex-col justify-center items-center border-b-4'>
        <div className='flex items-center w-full pl-9 gap-11'>
          <button
            className='hover:text-[#ff4f5d]'
            onClick={handleButtonClick}
          >
            <HiOutlineArrowLeft className='w-[35px] h-[35px]' />
          </button>
          <span className='text-xl font-medium'>채팅 목록</span>
        </div>
      </div>

      {/* 채팅 목록 아이템 */}
      <ChatFanListItem />
    </div>
  )
}

export default ChatFanList