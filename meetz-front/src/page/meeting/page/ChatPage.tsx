import StateHeader from '../components/Chat/StateHeader';
import ChatArea from '../components/Chat/ChatArea';
import { useEffect } from 'react';
import { useManagerChatStore } from '../../../zustand/useManagerChatStore';
import getChatList from '../../../apis/managerChat/getChatList';
import { useParams } from 'react-router-dom';
import fetchUserData from '../../../lib/fetchUserData';

const ChatPage = () => {
  const { meetingId } = useParams();
  const { setFanList } = useManagerChatStore();
  const { accessToken } = fetchUserData();

  const fetchChatList = async () => {
    if (!meetingId) {
      return;
    }

    const { rooms } = await getChatList(+meetingId, accessToken || "");
    setFanList(rooms);
  }

  useEffect(() => {
    fetchChatList();
  }, [])

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[#f9f9f9]'>
      <div className='max-w-screen-xl w-screen px-24 py-2'>
        <StateHeader />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
