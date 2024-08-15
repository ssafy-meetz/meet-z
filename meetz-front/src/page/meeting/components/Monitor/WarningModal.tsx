import { useState } from 'react';
import postFanWarningAtOnce from '../../../../apis/meeting/postFanWraningAtOnce';
import fetchUserData from '../../../../lib/fetchUserData';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';
import WarnDropdown from './WarnDropdown';
import Alert from '/src/assets/images/alert.png';
import Loading from '../../../../common/Loading';


const WarningModal = () => {
  const { inputText, selectedOption, reportedUserId, setWarnedErrorMsg, closeWarnModal, setSelectedOption, openWarnCompleteModalOpened, openAlreadyWarnedModalOpened, setInputText } = useMonitorStore();
  const { accessToken } = fetchUserData();
  const [dataLoading, setDataLoading] = useState(false);


  const continueBtnHandler = async ({ }) => {
    let reason = "";
    if (selectedOption === 'other' && !inputText) {
      alert('기타 사유를 입력하세요.');
      return;
    } else if (selectedOption === 'other') {
      reason = inputText;
    } else if (selectedOption === "") {
      alert('올바른 사유를 선택하세요.');
      return;
    } else {
      reason = selectedOption;
    }
    setDataLoading(true);
    try {
      const result = await postFanWarningAtOnce(reportedUserId, reason, accessToken || '');
      if (result) {
        openWarnCompleteModalOpened();
      }
    } catch (error: any) {
      openAlreadyWarnedModalOpened();
      if (error.response && error.response.status === 400) {
        setWarnedErrorMsg('이미 해당 미팅에서 경고 처리된 유저입니다.');
      } else if (error.response && error.response.status === 403) {
        setWarnedErrorMsg('이미 블랙리스트에 등록된 유저입니다.');
      } else if (error.response && error.response.status === 404) {
        setWarnedErrorMsg('사용자를 찾을 수 없습니다.');
      } else {
        setWarnedErrorMsg('알 수 없는 에러가 발생했습니다.');
      }
    }
    closeWarnModal();
    setDataLoading(false);
  };

  const closeModalHandler = () => {
    setSelectedOption('');
    setInputText('');
    closeWarnModal();
  }

  if (dataLoading) {
    <div
      className='fixed bottom-0 left-0 mb-4 ml-4 w-[300px] h-[100px] flex gap-6 items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
    >
      <Loading width={46} height={46} />
      <span className='text-xl font-semibold cursor-default'>
        경고 및 안내 메일 발송
      </span>
    </div>
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={closeModalHandler}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[460px] h-[300px] flex flex-col items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        <div className='flex flex-col gap-6'>
          <div className='gap-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-xl cursor-default'>
                <span className='text-red-600 font-semibold'>경고 사유</span>
                를 선택해주세요.
              </span>
            </div>
            <WarnDropdown />
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={continueBtnHandler}
              className='text-xl text-white border px-5 py-1  border-[#FF4F5D] bg-[#ff4f5d] rounded-lg'
            >
              진행
            </button>
            <button
              onClick={closeModalHandler}
              className='text-xl text-[#FF4F5D] border px-5 py-1 border-[#FF4F5D] rounded-lg '
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
