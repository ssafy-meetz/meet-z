import { useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FaCircleArrowUp } from 'react-icons/fa6';
import useEnvSettingStore from '../../../zustand/useEnvSettingStore';

interface Message {
  message: string;
  sender: 'user' | 'agent';
}

const SetChatting: React.FC = () => {
  const { toggleChattingBox } = useEnvSettingStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      message:
        '1:1 채팅을 요청 하셨습니다. 채팅 내용 상담 품질 관리를 위해 미쯔에 저장 됩니다. 문의사항은 순차적으로 답변됩니다. 상담을 시작하려면 메시지를 입력해 주세요. :)',
      sender: 'agent',
    },
    {
      message: '안녕하세요, 미쯔팀입니다 어떤 문의 사항 이신가요?',
      sender: 'agent',
    },
  ]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { message: input, sender: 'user' }]);
      setInput('');
    }
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
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
      </div>
      <div className='flex items-center p-4 border-t'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='질문을 입력하세요.'
          className='flex-grow p-3 rounded-lg border focus:outline-none focus:border-red-500'
        />
        <button
          onClick={handleSend}
          className='ml-3 text-[#ff4f5d] hover:text-[#fe6571]'
        >
          <FaCircleArrowUp className='w-[35px] h-[35px]' />
        </button>
      </div>
    </div>
  );
};

export default SetChatting;
