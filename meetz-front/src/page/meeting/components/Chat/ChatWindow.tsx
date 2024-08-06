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
  const client = useRef<StompJS.Client | null>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  useEffect(scrollToBottom, [chatHistory]);

  // 채팅 내역을 불러오기
  const fetchChatHistory = async () => {
    if (!meetingId || !selectedFan) {
      return;
    }
    try {
      const { chats } = await getChatDetailForManager(+meetingId, selectedFan.userId, accessToken || "");
      setChatHistory(chats);
    } catch (error) {
      setChatHistory([]);
    }
  };

  useEffect(() => {
    console.log(accessToken)
  }, [])

  useEffect(() => {
    fetchChatHistory();
  }, [selectedFan]);

  useEffect(() => {
    if (!accessToken) return;

    client.current = new StompJS.Client({
      brokerURL: `wss://i11c108.p.ssafy.io/ws?token=${accessToken}`,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      console.log('Connected to WebSocket');
      if (selectedFan) {
        console.log(`Subscribing to /sub/chatRoom/${selectedFan.chatRoomId}`);
        client.current?.subscribe(`/sub/chatRoom/${selectedFan.chatRoomId}`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          console.log('Received message: ', newMsg);
          setChatHistory([...chatHistory, newMsg]);
        });
      }
    };

    client.current.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.current.onWebSocketClose = (event) => {
      console.log('WebSocket closed: ', event);
    };

    client.current.onWebSocketError = (error) => {
      console.error('WebSocket error: ', error);
    };

    client.current.activate();

    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, [accessToken]);

  useEffect(() => {
    if (client.current && client.current.connected && selectedFan) {
      console.log(`Subscribing to /sub/chatRoom/${selectedFan.chatRoomId}`);
      client.current.subscribe(`/sub/chatRoom/${selectedFan.chatRoomId}`, (msg) => {
        const newMsg = JSON.parse(msg.body);
        console.log('Received message: ', newMsg);
        setChatHistory([...chatHistory, newMsg]);
      });
    }
  }, [selectedFan]);

  const sendMessage = () => {
    if (!selectedFan) return;

    const message = {
      chatRoomId: selectedFan.chatRoomId,
      receiverId: selectedFan.userId,
      content: inputMessage,
      senderRole: 'MANAGER'
    };

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
            chatHistory && chatHistory.map((chat) => {
              return (
                chat.senderRole === 'MANAGER' ? <ManagerMessageBubble chat={chat} key={chat.createAt} /> : <FanMessageBubble chat={chat} key={chat.createAt} />
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
