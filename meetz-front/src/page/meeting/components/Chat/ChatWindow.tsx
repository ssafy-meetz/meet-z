import React, { useEffect, useRef } from 'react';
import ChatWindowHeader from './ChatWindowHeader';
import { useManagerChatStore } from '../../../../zustand/useManagerChatStore';
import ChatInputBox from './ChatInputBox';
import FanMessageBubble from './FanMessageBubble';
import { useParams } from 'react-router-dom';
import fetchUserData from '../../../../lib/fetchUserData';
import getChatDetailForManager from '../../../../apis/managerChat/getChatDetailForManager';
import ManagerMessageBubble from './ManagerMessageBubble';
import * as StompJS from "@stomp/stompjs";

const ChatWindow: React.FC = () => {
  const { meetingId } = useParams();
  const { selectedFan, chatHistory, inputMessage, setChatHistory, setInputMessage } = useManagerChatStore();
  const { accessToken } = fetchUserData();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      block: "end",
    });
  };
  useEffect(scrollToBottom);

  // 채팅 내역을 불러오기
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
  }, [selectedFan]);


  const client = useRef(
    new StompJS.Client({
      brokerURL: 'wss://i11c108.p.ssafy.io/ws',
      connectHeaders: {
        'Authorization': `Bearer ${accessToken}`
      },
      debug: (str) => {
        console.log(str)
      },
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
  )

  useEffect(() => {
    if (!client.current.active) {
      client.current.activate();
    }

    client.current.onConnect = () => {
      client.current.subscribe(`/sub/chatRoom/${selectedFan?.chatRoomId}`, (msg) => {
        const newMsg = JSON.parse(msg.body);

        setChatHistory([...chatHistory, newMsg]);
      })
    }
  }, [])

  const sendMessage = () => {
    const message = {
      chatRoomId: selectedFan?.chatRoomId,
      receiverId: selectedFan?.userId, // 팬이 보내는 경우 receiverId를 0으로 설정
      content: inputMessage
    };

    client.current.publish({
      destination: '/pub/api/chat',
      body: JSON.stringify(message),
    });

    setInputMessage('');
    scrollToBottom();
  };


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
        <ChatWindowHeader />
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
                chat.senderRole === 'MANAGER' ? <ManagerMessageBubble chat={chat} key={chat.createAt} /> : <FanMessageBubble chat={chat} key={chat.createAt} />
              )
            })
          }
          <div ref={scrollRef} />
        </div>
        <ChatInputBox sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
