import deleteMeeting from '../../../../apis/meeting/deleteMeeting';
import fetchUserData from '../../../../lib/fetchUserData';
import { useDetailstore } from '../../../../zustand/useDetailStore';
import Alert from '/src/assets/images/alert.png';
const DeleteMeetingCheckModal = ({ meetingId }: { meetingId: number }) => {
  const { openDeletedModal, closeDeleteModal } = useDetailstore();
  const { accessToken } = fetchUserData();

  const handleDelete = async () => {
    try {
      const response = await deleteMeeting(accessToken || '', meetingId || 0);
      if (response.code === 200) {
        openDeletedModal();
      } else {
        console.error('삭제 실패', response.message);
      }
    } catch (error: any) {
      console.error('삭제 중 오류발생', error.message);
    }
  };
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={closeDeleteModal} // 배경을 클릭하면 모달 닫기
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 자체를 클릭해도 닫히지 않도록 이벤트 전파 막기
        className='w-[460px] h-[240px] flex flex-col items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        <div className='flex flex-col gap-6'>
          <div className='gap-4 flex flex-col items-center justify-center'>
            <div className='w-16 h-16'>
              <img src={Alert} alt='alert' />
            </div>
            <div>
              <span className='text-xl font-semibold cursor-default'>
                미팅일정을 삭제하시겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={handleDelete} // 삭제 처리 함수 연결
              className='text-xl duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition text-white border px-5 py-1  border-[#FF4F5D] bg-[#ff4f5d] rounded-lg'
            >
              진행
            </button>
            <button
              onClick={closeDeleteModal} // 모달 닫기
              className='text-xl text-[#FF4F5D] border px-5 py-1 border-[#FF4F5D] rounded-lg  hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105'
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMeetingCheckModal;
