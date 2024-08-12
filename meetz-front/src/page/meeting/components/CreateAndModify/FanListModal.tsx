import { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';
import ExcelBox from './ExcelBox';
import CleanFanList from './CleanFanList';
import AddFanInputBox from './AddFanInputBox';

const FanListModal = () => {
  const {
    setExcelFile,
    setIsOpenModal,
    resetTempNotBlackList,
    saveNotBlackList,
    tempNotBlackList,
    notBlackList,
  } = useMeetingSettingStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const saveHandler = () => {
    saveNotBlackList();
    setIsOpenModal();
  };

  const closeHandler = () => {
    setIsOpenModal();
    resetTempNotBlackList();
    if (notBlackList.length === 0 || !notBlackList) {
      setExcelFile(null);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        ref={modalRef}
        className='w-[740px] max-h-[90vh] h-[1200px] rounded-lg border border-[#ff4f5d] px-8 py-10 bg-white overflow-scroll'
        style={{ scrollbarWidth: 'none' }}
      >
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold mb-10 pb-2'>참여 팬 리스트</h1>
          <div
            onClick={closeHandler}
            className='flex justify-center items-center w-[40px] h-[40px] rounded-full group transition duration-150'
          >
            <IoMdClose className='text-4xl hover:scale-105 cursor-pointer active:scale-95 ransition duration-100 ease-in-out group-hover:text-[#ff4f5d]' />
          </div>
        </div>
        <ExcelBox scrollToBottom={scrollToBottom} />
        <AddFanInputBox scrollToBottom={scrollToBottom} />
        <CleanFanList
          fanList={
            tempNotBlackList.length !== notBlackList.length
              ? tempNotBlackList
              : notBlackList
          }
        />
        <div className='flex justify-center mt-8 gap-4'>
          <button
            onClick={saveHandler}
            className='font-semibold active:scale-95 duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition text-white bg-[#ff4f5d] rounded-2xl px-14 py-3'
          >
            저장
          </button>
          <button
            onClick={closeHandler}
            className='font-semibold text-[#ff4f5d] active:scale-95  border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 rounded-2xl px-14 py-3'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanListModal;
