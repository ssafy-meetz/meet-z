import { Dispatch, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FaCircleArrowUp } from 'react-icons/fa6';
import useEnvSettingStore from '../../../../zustand/useEnvSettingStore';
import { messageDto } from '../../../../types/types';
import ChatMessage from './ChatMessage';

interface ChattingBoxProps {
  chatHistory: messageDto[];
  setChatHistory: Dispatch<messageDto[]>
}

const SetChatting = ({ chatHistory, setChatHistory }: ChattingBoxProps) => {
  const [] = useState()
  const { toggleChattingBox } = useEnvSettingStore();
  const mi: string | null = window.sessionStorage.getItem('mi');
  if (mi) {
    const data = JSON.parse(mi);
    console.log(data)
  }




  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      // setMessages([...messages, { message: input, sender: 'user' }]);
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
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} content={chat.content} senderRole={chat.senderRole} />
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
