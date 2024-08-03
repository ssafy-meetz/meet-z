import React, { useState } from 'react';
import { FaCircleArrowUp } from 'react-icons/fa6';

interface ChatWindowProps {
  fan: {
    id: number;
    name: string;
    Message: string;
    time: string;
  } | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ fan }) => {
  const [message, setMessage] = useState(''); // 입력된 메시지를 관리하는 상태
  const [managerResponses, setManagerResponses] = useState<string[]>([]); // 매니저의 답변 메시지 상태

  if (!fan) {
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

  // Enter 키로 메시지 전송 처리
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (message.trim() === '') return; // 메시지가 공백일 경우 전송하지 않음

    // 새로운 메시지를 매니저의 답변 배열에 추가
    setManagerResponses([...managerResponses, message]);

    setMessage(''); // 입력 필드를 초기화
  };

  return (
    <div className='h-full flex flex-col w-full'>
      {/* 선택된 팬의 이름 */}
      <div className='h-24 flex flex-col justify-center items-center border-b-4 flex-shrink-0'>
        <h2 className='text-2xl font-bold'>{fan.name}</h2>
      </div>

      {/* 팬과의 대화 내용 */}
      <div
        className='flex flex-col space-y-2 p-6 flex-grow overflow-y-auto'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
        }}
      >
        {/* 팬이 보낸 메시지 */}
        <div className='flex justify-start'>
          <div className='bg-gray-100 p-3 max-w-sm text-lg rounded-lg shadow-sm rounded-bl-none'>
            <span>{fan.Message}</span>
          </div>
        </div>

        {/* 매니저의 답변 메시지 - 배열로 여러 개 렌더링 */}
        {managerResponses.map((response, index) => (
          <div key={index} className='flex justify-end'>
            <div className='bg-[#ff4f5d] text-white text-lg shadow-sm max-w-sm p-3 rounded-lg rounded-br-none'>
              <span>{response}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력란 */}
      <div className='mb-6 mx-5 flex items-center border rounded-lg focus-within:border-[#ff4f5d] flex-shrink-0'>
        <input
          type='text'
          placeholder='메시지를 입력하세요.'
          value={message} // 상태와 연동된 입력값
          onChange={(e) => setMessage(e.target.value)} // 입력값 업데이트
          onKeyDown={handleKeyPress}
          className='flex-grow p-3 focus:outline-none rounded-lg'
        />
        <button onClick={handleSendMessage} className='p-2 text-[#ff4f5d]'>
          <FaCircleArrowUp className='w-8 h-8' />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
