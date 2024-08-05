// src/components/Blacklist/DeleteCheckModal.tsx
import React from 'react';
import Alert from '/src/assets/images/alert.png';
import { useBlackStore } from '../../../../zustand/useBlackStore';

const DeleteCheckModal: React.FC = () => {
  const { isDeleteModalOpen, closeDeleteModal, openDeletedModal } =
    useBlackStore();

  if (!isDeleteModalOpen) return null;

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
                블랙리스트에서 제거하시겠습니까?
              </span>
            </div>
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={() => {
                openDeletedModal(); // 삭제 완료 모달 열기
                closeDeleteModal(); // 삭제 확인 모달 닫기
              }}
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
