// src/pages/meeting/page/BlacklistCheckPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { FanDto } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useBlackStore } from '../../../zustand/useBlackStore';
import DeleteCheckModal from '../components/Blacklist/DeleteCheckModal';
import DeletedModal from '../components/Blacklist/DeletedModal';

// 더미 데이터 생성
const dummyFanList: FanDto[] = [
  { name: '강창우', email: 'changw@example.com', phone: '01012345678' },
  { name: '손다인', email: 'dison@example.com', phone: '01023456789' },
  { name: '이승원', email: 'swonbin@example.com', phone: '01034567890' },
  { name: '서민수', email: 'minsu@example.com', phone: '01045678901' },
  { name: '김태연', email: 'taeyeon@example.com', phone: '01056789012' },
  { name: '신민경', email: 'minkyung@example.com', phone: '01011223344' },
];

const BlacklistCheckPage = () => {
  const [displayedFans, setDisplayedFans] = useState<FanDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const { openDeleteModal } = useBlackStore();

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 11) {
      return phoneNumber; // 전화번호가 11자리가 아닌 경우 원본 그대로 반환
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
  };

  const loadMoreFans = useCallback(() => {
    const currentLength = displayedFans.length;
    const moreFans = dummyFanList.slice(
      currentLength,
      currentLength + itemsPerPage
    );
    setDisplayedFans((prevFans) => [...prevFans, ...moreFans]);
    if (displayedFans.length >= dummyFanList.length) {
      setHasMore(false);
    }
  }, [displayedFans.length]);

  useEffect(() => {
    loadMoreFans(); // Initial load
  }, [loadMoreFans]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      if (hasMore) {
        loadMoreFans();
      }
    }
  }, [hasMore, loadMoreFans]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const cancelHandler = () => {
    navigate(-1);
  };

  // 모달을 여는 핸들러
  const deleteHandler = () => {
    openDeleteModal(); // 삭제 확인 모달 열기
  };

  return (
    <div className='flex flex-col items-center '>
      <div className='max-w-screen-xl h-screen w-screen flex flex-col px-24'>
        <header className='flex mt-16'>
          <h1 className='text-[32px] font-bold'>
            <span className='text-[#ff4f5d] mr-2'>SSAFY </span>
            블랙리스트 관리
          </h1>
        </header>
        <div
          className='overflow-y-auto max-h-[500px] min-h-96 mt-14'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
          }}
        >
          {dummyFanList.length > 0 ? (
            <table className='w-full text-left '>
              <thead>
                <tr className='bg-[#ff4f5d] text-white '>
                  <th className='py-4 pl-5 text-lg font-light rounded-tl-lg rounded-bl-lg'>
                    | 번호
                  </th>
                  <th className='py-4 pl-2 text-lg font-light'>| 이름</th>
                  <th className='py-4 pl-1 text-lg font-light'>| 이메일</th>
                  <th className='py-4 p-1 text-lg font-light'>| 연락처</th>
                  <th className='py-4 p-1 text-lg font-light rounded-tr-lg rounded-br-lg'></th>
                </tr>
              </thead>
              <tbody>
                {displayedFans.map((fan, index) => (
                  <tr key={fan.email}>
                    <td className='py-2 pl-10'>{index + 1}</td>
                    <td className='py-2 pl-4'>{fan.name}</td>
                    <td className='py-2 pl-4'>{fan.email}</td>
                    <td className='py-2 pl-4'>
                      {formatPhoneNumber(fan.phone)}
                    </td>
                    <td className='py-2 pl-4'>
                      <button
                        onClick={deleteHandler} // 삭제 핸들러 연결
                        className='border-[#ff4f5d] text-[#ff4f5d] hover:text-white py-1 px-3 rounded-full hover:bg-[#ff4f5d] transition'
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <p className='text-xl text-gray-500'>
                블랙리스트에 등록된 팬이 없습니다.
              </p>
            </div>
          )}
        </div>
        <div className='flex justify-center py-20'>
          <button
            onClick={cancelHandler}
            className='w-32 h-14 hover:bg-[#ff626f] transition font-semibold rounded-2xl text-white bg-[#ff4f5d]'
          >
            돌아가기
          </button>
        </div>
      </div>
      {/* 모달 추가 */}
      <DeleteCheckModal />
      <DeletedModal />
    </div>
  );
};

export default BlacklistCheckPage;
