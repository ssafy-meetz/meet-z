import { GoCheckCircle } from 'react-icons/go';
import { useDetailstore } from '../../../../zustand/useDetailStore';
import { useNavigate } from 'react-router-dom';

const DeleteMeetingModal = () => {
  const { closeDeletedModal } = useDetailstore();
  const navigate = useNavigate();
  const handleConfirm = () => {
    closeDeletedModal();
    navigate('/meeting/yet');
  };
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={handleConfirm} // 배경을 클릭하면 모달 닫기
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 자체를 클릭해도 닫히지 않도록 이벤트 전파 막기
        className='w-[460px] h-[240px] flex flex-col items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        <div className='flex flex-col gap-6'>
          <div className='gap-4 flex flex-col items-center justify-center'>
            <div>
              <GoCheckCircle className='text-7xl text-[#ff4f5d]' />
            </div>
            <div>
              <span className='text-xl font-semibold cursor-default'>
                일정이 삭제되었습니다.
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={handleConfirm} // 모달 닫기
              className='text-xl duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition text-white border px-5 py-1  border-[#FF4F5D] bg-[#ff4f5d] rounded-lg'
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMeetingModal;
