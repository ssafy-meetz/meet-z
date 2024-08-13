import { useState } from 'react';
import postFanBlackList from '../../../../apis/meeting/postFanBlackList';
import fetchUserData from '../../../../lib/fetchUserData';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';
import Alert from '/src/assets/images/alert.png';
import Loading from '../../../../common/Loading';

const BlackModal = () => {
  const { reportDetail, reportedUserId, closeBlackModal } = useMonitorStore();
  const { accessToken } = fetchUserData()
  const [dataLoading, setDataLoading] = useState(false);

  const continueBtnHandler = async () => {
    setDataLoading(true);
    try {
      const result = await postFanBlackList(reportedUserId, accessToken || "");

      if (result) {
        alert('해당 팬이 영구 제명되었습니다.');
        closeBlackModal();
      }
    } catch (error: any) {
      alert(error.message)
      setDataLoading(false);
      closeBlackModal();
    }
    setDataLoading(false);
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={closeBlackModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[460px] h-[240px] flex flex-col items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        {dataLoading ? <Loading width={70} height={70} /> : <div className='flex flex-col gap-6'>
          <div className='gap-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-xl cursor-default'>
                “{reportDetail?.reportedUserName}” 팬을{' '}
                <span className='text-red-600 font-semibold'>
                  영구 제명
                </span>
                하시겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={continueBtnHandler}
              className='text-xl text-white border px-5 py-1  border-[#FF4F5D] bg-[#ff4f5d] rounded-lg'
            >
              진행
            </button>
            <button
              onClick={closeBlackModal}
              className='text-xl text-[#FF4F5D] border px-5 py-1 border-[#FF4F5D] rounded-lg '
            >
              취소
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default BlackModal;
