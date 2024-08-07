import { Dispatch, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import useEnvSettingStore from '../../../../zustand/useEnvSettingStore';
import { messageDto } from '../../../../types/types';
import ChatMessage from './ChatMessage';
import ChatInputBox from './ChatInputBox';
import * as StompJS from "@stomp/stompjs";
import fetchUserData from '../../../../lib/fetchUserData';

interface ChattingBoxProps {
  isChattingBoxVisible: boolean;
  chatHistory: messageDto[];
  setChatHistory: Dispatch<React.SetStateAction<messageDto[]>>;
  fanId: number;
  managerId: number;
}

const SetChatting = ({ isChattingBoxVisible, chatHistory, setChatHistory, fanId, managerId }: ChattingBoxProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const client = useRef<StompJS.Client | null>(null);
  const { toggleChattingBox } = useEnvSettingStore();
  const [input, setInput] = useState<string>('');

  const { accessToken } = fetchUserData();

  const mi: string | null = window.sessionStorage.getItem('mi');
  const initialChatRoomId = mi ? JSON.parse(mi).chatRoomId : 0;
  const [chatRoomId, setChatRoomId] = useState<number>(initialChatRoomId);

  useEffect(() => {
    if (mi) {
      const data = JSON.parse(mi);
      setChatRoomId(data.chatRoomId);
    }
  }, [isChattingBoxVisible, chatHistory])

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
    });
  };
  useEffect(scrollToBottom, [chatHistory]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    // 중복구독방지를 위해 클라이언트 비활성화함
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
      client.current?.subscribe(`/sub/chatRoom/${chatRoomId}`, (msg) => {
        const newMsg: messageDto = JSON.parse(msg.body);
        if (!newMsg.content) {
          return;
        }
        setChatHistory((prev) => [...prev, newMsg]); // 이전 상태를 기반으로 상태 업데이트
      });
    };

    client.current.activate();

    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, [isChattingBoxVisible]); //여기도 수정됐어요~!!! [accessToken] -> [accessToken, chatRoomId, selectedFan]

  const sendMessage = () => {
    if (!client.current?.connected) {
      return;
    }

    const message: messageDto = {
      chatRoomId: chatRoomId,
      receiverId: managerId,
      content: input,
      senderRole: 'FAN',
      senderId: fanId,
      createdAt: null,
    };

    if (!message.content) {
      return;
    }

    client.current?.publish({
      destination: '/pub/api/chat',
      body: JSON.stringify(message),
    });

    setInput('');
    scrollToBottom();
  };

  return (
    <div className='flex flex-col w-[338px] h-[662px] border-r-4 border-[#d9d9d9]'>
      <div className='flex flex-col gap-7 p-8'>
        <div className='flex items-center gap-7'>
          <button onClick={toggleChattingBox} className='hover:text-[#ff4f5d]'>
            <HiOutlineArrowLeft className='w-[35px] h-[35px]' />
          </button>
          <span className='text-2xl font-medium'>1:1 문의</span>
        </div>
      </div>
      <div
        className='flex-grow p-4 overflow-y-auto'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
        }}
      >
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} content={chat.content} senderRole={chat.senderRole} />
        ))}
        <div ref={scrollRef} />
      </div>
      <ChatInputBox input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default SetChatting;
