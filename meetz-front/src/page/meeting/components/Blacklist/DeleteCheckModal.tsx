import Alert from '/src/assets/images/alert.png';
import { useBlackStore } from '../../../../zustand/useBlackStore';
import deleteBlacklist from '../../../../apis/meeting/deleteBlacklist';
import fetchUserData from '../../../../lib/fetchUserData';

const DeleteCheckModal = ({
  blacklistId,
}: {
  blacklistId: number | undefined;
}) => {
  const { accessToken } = fetchUserData();
  const { setIsDelete, closeDeleteModal, openDeletedModal, updateBlacklist } =
    useBlackStore();

  const handleDelete = async () => {
    try {
      const response = await deleteBlacklist(
        accessToken || '',
        blacklistId || 0
      );
      if (response.code === 200) {
        setIsDelete(true);
        updateBlacklist(blacklistId || 0); // 블랙리스트 업데이트
        openDeletedModal();
      } else {
        console.error('삭제 실패', response.message);
        setIsDelete(false);
      }
    } catch (error: any) {
      console.error('삭제 중 오류발생', error.message);
      setIsDelete(false);
    }
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
    
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
                블랙리스트에서 제거하시겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={handleDelete} // 삭제 처리 함수 연결
              className='text-xl text-white border px-5 py-1 hover:bg-[#ff5d6a] border-[#FF4F5D] bg-[#ff4f5d] rounded-lg'
            >
              진행
            </button>
            <button
              onClick={closeDeleteModal} // 모달 닫기
              className='text-xl text-[#FF4F5D] border px-5 py-1 hover:text-white hover:bg-[#ff4f5d] border-[#FF4F5D] rounded-lg'
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCheckModal;
