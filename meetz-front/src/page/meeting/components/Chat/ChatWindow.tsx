import React, { useEffect } from 'react';
import ChatWindowHeader from './ChatWindowHeader';
import { useManagerChatStore } from '../../../../zustand/useManagerChatStore';
import ChatInputBox from './ChatInputBox';
import FanMessageBubble from './FanMessageBubble';
import { useParams } from 'react-router-dom';
import fetchUserData from '../../../../lib/fetchUserData';
import getChatDetailForManager from '../../../../apis/managerChat/getChatDetailForManager';
import ManagerMessageBubble from './ManagerMessageBubble';

const ChatWindow: React.FC = () => {
  const { meetingId } = useParams();
  const { selectedFan, chatHistory, setChatHistory } = useManagerChatStore();
  const { accessToken } = fetchUserData();

  const fetchChatHistory = async () => {
    if (!meetingId || !selectedFan) {
      return;
    }
    try {
      const { chats } = await getChatDetailForManager(+meetingId, selectedFan.userId, accessToken || "");
      setChatHistory(chats)
    } catch (error) {
      setChatHistory([]);
    }
  }

  useEffect(() => {
    fetchChatHistory();
  }, [selectedFan])

  if (!selectedFan) {
    return (
      <div className='flex-grow flex items-center justify-center h-full'>
        <img
          src='/src/assets/images/logo.png'
          alt='logo'
          className='h-50 w-85'
        />
      </div>
    );
  }

  return (
    <div className='flex-grow'>
      <div className='h-full flex flex-col w-full'>
        {/* 선택된 팬의 이름 */}
        <ChatWindowHeader />

        {/* 채팅창 영역 */}
        <div
          className='flex flex-col space-y-2 p-6 flex-grow overflow-y-auto'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
          }}
        >
          {
            chatHistory && chatHistory.map((chat) => {
              return (
                chat.sender ? <ManagerMessageBubble chat={chat} key={chat.chatId} /> : <FanMessageBubble chat={chat} key={chat.chatId} />
              )
            })
          }
        </div>

        {/* 메시지 입력란 */}
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatWindow;
