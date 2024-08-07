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
import { messageDto } from '../../../../types/types';

const ChatWindow: React.FC = () => {
  const { meetingId } = useParams();
  const { selectedFan, managerId, chatHistory, inputMessage, chatRoomId, setChatHistory, setInputMessage, addChatMessage } = useManagerChatStore();
  const { accessToken } = fetchUserData();

  const scrollRef = useRef<HTMLDivElement>(null);
  const client = useRef<StompJS.Client | null>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
    });
  };
  useEffect(scrollToBottom, [chatHistory]);

  const fetchChatHistory = async () => {
    if (!meetingId || !selectedFan) {
      return;
    }
    try {
      const { chats } = await getChatDetailForManager(+meetingId, selectedFan.userId, accessToken || "");
      setChatHistory(chats);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [selectedFan]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    //여기가 추가됐어요 창우 !! ! ! 중복구독방지를 위해 클라이언트 비활성화함
    if (client.current) {
      client.current.deactivate();
    }

    client.current = new StompJS.Client({
      brokerURL: `wss://i11c108.p.ssafy.io/ws?token=${accessToken}`,
      reconnectDelay: 1000,
      connectHeaders: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    client.current.onConnect = () => {
      if (selectedFan) {
        client.current?.subscribe(`/sub/chatRoom/${chatRoomId}`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          if (!newMsg.content) {
            return;
          }
          addChatMessage(newMsg); //여기도 변경됐어요 setChatHistory[...chatHistory, newMsg]->addChatHistory
        });
      }
    };

    // client.current.onStompError = (frame) => {
    //   console.error('Broker reported error: ' + frame.headers['message']);
    //   console.error('Additional details: ' + frame.body);
    // };

    // client.current.onWebSocketClose = (event) => {
    //   console.log('WebSocket closed: ', event);
    // };

    // client.current.onWebSocketError = (error) => {
    //   console.error('WebSocket error: ', error);
    // };

    client.current.activate();

    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, [accessToken, chatRoomId, selectedFan]); //여기도 수정됐어요~!!! [accessToken] -> [accessToken, chatRoomId, selectedFan]

  const sendMessage = () => {
    if (!selectedFan || !client.current?.connected) {
      return;
    }

    const message: messageDto = {
      chatRoomId: chatRoomId,
      receiverId: selectedFan.userId,
      content: inputMessage,
      senderRole: 'MANAGER',
      senderId: managerId,
      createdAt: null,
    };

    if (!message.content) {
      return;
    }

    client.current?.publish({
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
            chatHistory && chatHistory.map((chat, idx) => {
              return (
                (chat.senderRole === 'MANAGER') ? <ManagerMessageBubble chat={chat} key={idx} /> : <FanMessageBubble chat={chat} key={idx} />
              );
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