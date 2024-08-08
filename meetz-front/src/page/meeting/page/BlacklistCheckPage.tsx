// src/pages/meeting/page/BlacklistCheckPage.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlackStore } from '../../../zustand/useBlackStore';
import DeleteCheckModal from '../components/Blacklist/DeleteCheckModal';
import DeletedModal from '../components/Blacklist/DeletedModal';
import getBlacklist from '../../../apis/meeting/getBlacklist';
import fetchUserData from '../../../lib/fetchUserData';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import Loading from '../../../common/Loading';
import { AiOutlineClose } from 'react-icons/ai';

const BlacklistCheckPage = () => {
  const navigate = useNavigate();
  const {
    openDeleteModal,
    isDeleteModalOpen,
    isDeletedModalOpen,
    setSelectedBlacklistId,
    isDelete,
    selectedBlacklistId,
    blacklist,
    setBlacklist,
  } = useBlackStore();
  const { accessToken } = fetchUserData();
  const [blacklistCompany, setBlacklistCompany] = useState(''); // 회사 이름
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useCheckAuth('MANAGER');

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 11) {
      return phoneNumber;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7)}`;
  };

  // 블랙리스트 데이터를 가져오는 함수
  const fetchBlacklistData = useCallback(async () => {
    const data = await getBlacklist(accessToken || '');
    return data.data;
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const { company, blackList } = await fetchBlacklistData();
        setBlacklistCompany(company);
        setBlacklist(blackList);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('블랙리스트를 가져오는 중 오류 발생:', error);
        setBlacklist([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchBlacklistData, setBlacklist]);

  const cancelHandler = () => {
    navigate(-1);
  };

  // 모달을 여는 핸들러
  const deleteHandler = (blacklistId: number) => {
    setSelectedBlacklistId(blacklistId); // 선택된 블랙리스트 ID 설정
    openDeleteModal(); // 삭제 확인 모달 열기
  };

  const memoizedBlacklistCompany = useMemo(
    () => blacklistCompany,
    [blacklistCompany]
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Loading width={160} height={160} />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center '>
      <div className='max-w-screen-xl h-screen w-screen flex flex-col px-24'>
        <header className='flex mt-16'>
          <h1 className='text-[32px] font-bold'>
            <span className='text-[#ff4f5d] mr-2'>
              {memoizedBlacklistCompany}{' '}
            </span>
            블랙리스트 관리
          </h1>
        </header>
        <div
          className='overflow-y-auto px-10 max-h-[500px] min-h-96 mt-10'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.05) transparent',
          }}
        >
          {blacklist && blacklist.length > 0 ? (
            <table className='w-full text-left '>
              <thead>
                <tr className='bg-[#ff4f5d] text-white text-2xl'>
                  <th className='py-4 pl-3  font-light rounded-tl-lg rounded-bl-lg'>
                    | 번호
                  </th>
                  <th className='py-4  pl-16 font-light'>| 이름</th>
                  <th className='py-4 pl-16 font-light'>| 연락처</th>
                  <th className='py-4  rounded-tr-lg rounded-br-lg'></th>
                </tr>
              </thead>
              <tbody>
                {blacklist.map((fan, index) => (
                  <tr key={fan.blacklistId} className='text-xl'>
                    <td className='py-2 pl-10'>{index + 1}</td>
                    <td className='py-2 pl-24'>{fan.name}</td>
                    <td className='py-2 pl-20'>
                      {formatPhoneNumber(fan.phone)}
                    </td>
                    <td className='py-2'>
                      <button
                        onClick={() => deleteHandler(fan.blacklistId)}
                        className='border-[#ff4f5d] text-4xl text-[#ff4f5d] hover:text-[#ff979f] py-1 px-3 rounded-full transition'
                      >
                        <AiOutlineClose />
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
      {isDeleteModalOpen && !isDelete && (
        <DeleteCheckModal blacklistId={selectedBlacklistId} />
      )}

      {isDeletedModalOpen && isDelete && <DeletedModal />}
    </div>
  );
};

export default BlacklistCheckPage;
