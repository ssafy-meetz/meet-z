import { useState } from "react";
import { FaFileExcel } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const FanListModal = () => {
  const { setIsOpenModal } = useMeetingSettingStore();
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [isBlacked, setIsBlacked] = useState(false);

  const attachExcelFile = () => {
    alert("눌림")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[740px] max-h-[90vh] h-[1200px] rounded-lg border border-[#ff4f5d] px-8 py-12 bg-white overflow-scroll" style={{ 'scrollbarWidth': 'none' }}>
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold mb-10 pb-2">참여 팬 리스트</h1>
          <div
            onClick={setIsOpenModal}
            className="flex justify-center items-center w-[40px] h-[40px] rounded-full group hover:bg-gray-100 transition duration-150">
            <IoMdClose className="text-4xl cursor-pointer group-hover:text-[#ff4f5d]" />
          </div>
        </div>
        <div onClick={attachExcelFile} className="group border-dashed border-2 border-gray-300 rounded-lg p-16 flex flex-col items-center justify-center mb-6 hover:border-red-500 transition duration-100 cursor-pointer">
          <button className="text-gray-300 text-5xl mb-4 group-hover:text-[#ff4f5d] transition duration-100">
            <FaFileExcel />
          </button>
          <p className="text-xl">클릭하거나 엑셀 파일을 드래그하여 첨부 하세요.</p>
        </div>
        <div className='flex justify-center mb-14'>
          <button className="bg-[#ff4f5d] text-white  px-28 py-2 rounded-xl mb-6">Clean</button>
        </div>
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
        <div className="overflow-y-auto h-96 border border-b-2 mt-6" style={{ 'scrollbarWidth': 'thin' }}>
          <table className="w-full text-left  ">
            <thead>
              <tr className="bg-[#ff4f5d] text-white ">
                <th className="py-4 pl-5 text-lg font-light rounded-tl-lg rounded-bl-lg">| 번호</th>
                <th className="py-4 pl-2 text-lg font-light">| 이름</th>
                <th className="py-4 pl-1 text-lg font-light">| 이메일</th>
                <th className="py-4 p-1 text-lg font-light rounded-tr-lg rounded-br-lg">| 연락처</th>
              </tr>
            </thead>
            <tbody >
              {[...Array(50)].map((_, index) => (
                <tr key={index} >
                  <td className="p2 pl-10">{index + 1}</td>
                  <td className="p2 pl-4">이승원</td>
                  <td className="p-2 pl-4">lsw123@ssafy.com</td>
                  <td className="p-2 pl-4">010-1234-5678</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-14 gap-4">
          <button className="font-thin text-white bg-[#ff4f5d] rounded-lg px-14 py-3">저장</button>
          <button
            onClick={setIsOpenModal}
            className="font-thin text-[#ff4f5d] border border-[#ff4f5d] rounded-lg px-14 py-3">취소</button>
        </div>
      </div>
    </div>
  )
}

export default FanListModal
