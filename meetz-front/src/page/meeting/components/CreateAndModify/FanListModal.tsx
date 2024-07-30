import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";
import ExcelBox from "./ExcelBox";
import CleanFanList from "./CleanFanList";

const FanListModal = () => {
  const { setIsOpenModal, setNotBlackList } = useMeetingSettingStore();
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [isBlacked, setIsBlacked] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const closeHandler = () => {
    setIsOpenModal();
    setNotBlackList([]);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="w-[740px] max-h-[90vh] h-[1200px] rounded-lg border border-[#ff4f5d] px-8 py-10 bg-white overflow-scroll" style={{ 'scrollbarWidth': 'none' }}>
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold mb-10 pb-2">참여 팬 리스트</h1>
          <div
            onClick={closeHandler}
            className="flex justify-center items-center w-[40px] h-[40px] rounded-full group hover:bg-gray-100 transition duration-150">
            <IoMdClose className="text-4xl cursor-pointer group-hover:text-[#ff4f5d]" />
          </div>
        </div>
        <ExcelBox scrollToBottom={scrollToBottom} />
        <div className="w-full mb-2 flex">
          <input className="w-32 hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2" type="text" placeholder="이름" />
          <input className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2" type="text" placeholder="이메일" />
          <input className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2" type="text" placeholder="연락처( - 없이 입력)" />
          <button
            onClick={() => setAddBtnClicked(true)}
            className="bg-[#ff4f5d] text-white px-4 py-2 rounded-xl">추가</button>
        </div>
        {addBtnClicked && <div className="flex justify-center">
          {!isBlacked ? <span className="text-gray-400">블랙리스트에 없는 회원입니다. 해당 회원이 팬 리스트에 추가되었습니다.</span> : <span className="text-red-500">블랙리스트에 등록된 회원입니다. 해당 회원은 팬 리스트에 추가할 수 없습니다.</span>}
        </div>}
        <CleanFanList />
        <div className="flex justify-center mt-8 gap-4">
          <button onClick={setIsOpenModal} className="font-semibold text-white bg-[#ff4f5d] rounded-lg px-14 py-3">저장</button>
          <button
            onClick={closeHandler}
            className="font-semibold text-[#ff4f5d] border border-[#ff4f5d] rounded-lg px-14 py-3">취소</button>
        </div>
      </div>
    </div>
  )
}

export default FanListModal
