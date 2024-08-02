import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FaCircle } from 'react-icons/fa';
import ChatWindow from '../components/ChatWindow';

interface Fan {
  id: number;
  name: string;
  Message: string;
  time: string;
}

const ChattingPage = () => {
  // 선택된 팬을 관리하는 상태
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const navigate = useNavigate();
  // 예시 팬 목록
  const fanList: Fan[] = [
    {
      id: 1,
      name: '강창우',
      Message:
        '안녕하세요! 다름이 아니라 지금 캠 설정이 잘 안되는데 순서를 좀 미룰 수 있을까요??',
      time: '10분 전',
    },
    {
      id: 2,
      name: '이승원',
      Message:
        '캠 설정 관련해서 문의 드립니다. 나문희나문희나문희나문희나문희나문희나문희나문희나문희나문희',
      time: '5분 전',
    },
    {
      id: 3,
      name: '손다인',
      Message: '캠 설정 관련해서 문의 드립니다.',
      time: '3분 전',
    },
    {
      id: 4,
      name: '신민경',
      Message: '캠 설정 관련해서 문의 드립니다.',
      time: '2분 전',
    },
    {
      id: 5,
      name: '김태연',
      Message: '캠 설정 관련해서 문의 드립니다.',
      time: '1분 전',
    },
  ];

  // 팬 클릭 시 호출되는 핸들러
  const handleFanClick = (fan: Fan) => {
    setSelectedFan(fan);
  };

  // 메시지 길이를 자르는 함수
  const cutMessage = (message: string, maxLength: number) => {
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength) + '...';
  };

  const handleButtonClick = () => {
    const id = 1;
    navigate(`/meeting/detail/${id}`);
  };
  return (
    <div className='h-screen  flex flex-col items-center justify-center bg-[#f9f9f9]'>
      <div className='max-w-screen-xl  w-screen px-24'>
        <div className='flex justify-between p-5 '>
          <div className='text-3xl font-bold'>
            남은 인원 : <span className='text-[#FE9374]'>30</span>
          </div>
          <div className='text-3xl font-bold'>
            완료 인원 : <span className='text-[#FE9374]'>20</span>
          </div>
          <div className='text-3xl font-bold'>
            전체 인원 : <span className='text-[#FE9374]'>50</span>
          </div>
        </div>

        <div className='flex  flex-col w-full mt-5 h-[660px] border rounded-3xl border-[#d9d9d9] bg-white shadow-2xl'>
          <div className='flex flex-row h-full'>
            {/* 채팅 목록 섹션 */}
            <div className='w-80 h-full border-r-4 overflow-y-hidden'>
              <div className='w-full h-24 flex flex-col justify-center items-center border-b-4'>
                <div className='flex items-center w-full pl-9 gap-11'>
                  <button
                    className='hover:text-[#ff4f5d]'
                    onClick={handleButtonClick}
                  >
                    <HiOutlineArrowLeft className='w-[35px] h-[35px]' />
                  </button>
                  <span className='text-2xl font-medium'>채팅 목록</span>
                </div>
              </div>

              {/* 채팅 버튼 목록 */}
              <div
                className='overflow-y-auto h-full'
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
                }}
              >
                {fanList.map((fan) => (
                  <button
                    key={fan.id}
                    onClick={() => handleFanClick(fan)}
                    className='w-full h-24 flex flex-col p-4 gap-1 border-b hover:text-white focus:text-white focus:bg-[#ff4f5d] hover:bg-[#ff4f5d]'
                  >
                    <div className='flex h-full w-full justify-between items-center'>
                      <span className='font-semibold text-xl'>{fan.name}</span>
                      <span className='font-light text-xs'>{fan.time}</span>
                    </div>
                    <div className='flex h-full w-full items-center justify-between'>
                      <span className='font-light text-xs'>
                        {cutMessage(fan.Message, 25)}
                      </span>
                      <FaCircle className='text-[#ff4f5d] text-sm' />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ChatWindow 컴포넌트를 사용하여 채팅창 표시 */}
            <div className='flex-grow'>
              <ChatWindow fan={selectedFan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
