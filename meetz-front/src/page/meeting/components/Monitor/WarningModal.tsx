import postFanWarningAtOnce from '../../../../apis/meeting/postFanWraningAtOnce';
import fetchUserData from '../../../../lib/fetchUserData';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';
import WarnDropdown from './WarnDropdown';
import Alert from '/src/assets/images/alert.png';


const WarningModal = () => {
  const { inputText, selectedOption, reportedUserId, closeWarnModal, setSelectedOption, setInputText } = useMonitorStore();
  const { accessToken } = fetchUserData();


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

    try {
      await postFanWarningAtOnce(reportedUserId, reason, accessToken || '');
    } catch (error: any) {
      alert(error.message)
    }
    closeWarnModal();
  };

  const closeModalHandler = () => {
    setSelectedOption('');
    setInputText('');
    closeWarnModal();
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
