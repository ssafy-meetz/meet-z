import Alert from '/src/assets/images/alert.png';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';

const SendEmailModal = () => {
  const { closeMailModal } = useMonitorStore();

  const continueBtnHandler = () => {
    alert('진행');
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[460px] h-[240px] flex flex-col  items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        <div className='flex flex-col gap-6'>
          <div className='gap-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-xl font-semibold cursor-default'>
                메일 일괄 발송을 진행하시겠습니까?
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
              onClick={closeMailModal}
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

export default SendEmailModal;
