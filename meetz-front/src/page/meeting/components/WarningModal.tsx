import { useMonitorStore } from '../../../zustand/useMonitorStore';
import Alert from '/src/assets/images/alert.png';

const WarningModal = () => {
  const { closeWarnModal } = useMonitorStore();

  const continueBtnHandler = () => {
    // 경고 누적 API 연동
    alert('경고 누적 API 연동');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => closeWarnModal()}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[360px] h-[180px] flex flex-col items-center justify-center rounded-3xl border border-[#FF4F5D] bg-white'>
        <div className='flex flex-col gap-4'>
          <div className='gap-3 flex flex-col items-center justify-center'>
            <div className='w-11 h-11'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-base cursor-default'>
                "강창우" 팬을 영구 제명 하겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <button
              onClick={continueBtnHandler}
              className='text-sm text-[#FF4F5D] border px-4 py-1 border-[#FF4F5D] hover:text-white rounded-lg hover:bg-[#FF4F5D]'>
              진행
            </button>
            <button
              onClick={closeWarnModal}
              className='text-sm text-[#FF4F5D] border px-4 py-1 border-[#FF4F5D] hover:text-white rounded-lg hover:bg-[#FF4F5D]'>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarningModal