import React from 'react';
import SetMeetingHeader from '../components/CreateAndModify/SetMeetingHeader';
import SetMeetingNameBox from '../components/CreateAndModify/SetMeetingNameBox';
import SetMeetingStarBox from '../components/CreateAndModify/SetMeetingStarBox';
import SetMeetingFansBox from '../components/CreateAndModify/SetMeetingFansBox';
import SetMeetingFanCountBox from '../components/CreateAndModify/SetMeetingFanCountBox';
import SetTimeHeader from '../components/CreateAndModify/SetTimeHeader';
import SetTimeDateBox from '../components/CreateAndModify/SetTimeDateBox';
import SetTimeStartBox from '../components/CreateAndModify/SetTimeStartBox';
import SetTimeDuringBox from '../components/CreateAndModify/SetTimeDuringBox';
import SetTimeBreakBox from '../components/CreateAndModify/SetTimeBreakBox';
import 'react-datepicker/dist/react-datepicker.css';
import { FaFileExcel } from "react-icons/fa6";
// import useCheckAuth from "../../../hooks/meeting/useCheckAuth";


const CreateMeeting: React.FC = () => {
  // useCheckAuth('MANAGER');

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen px-24'>
        <header className='justify-center items-center flex flex-col gap-3 py-20'>
          <h1 className='text-4xl font-bold'>팬싸인회 생성</h1>
        </header>
        <main className='flex flex-col gap-20'>
          <div className='flex flex-col gap-1'>
            <SetMeetingHeader />
            <SetMeetingNameBox />
            <SetMeetingStarBox />
            <SetMeetingFansBox />
            <SetMeetingFanCountBox />
          </div>
          <div>
            <SetTimeHeader />
            <SetTimeDateBox />
            <SetTimeStartBox />
            <SetTimeDuringBox />
            <SetTimeBreakBox />
          </div>
        </main>
        <div className='flex justify-center items-center gap-4 py-20'>
          <button
            className='font-thin text-white bg-[#ff4f5d] rounded-lg px-16 py-3'>
            저장
          </button>
          <button
            className='font-thin text-[#ff4f5d] border border-[#ff4f5d] rounded-lg px-16 py-3'>
            취소
          </button>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center">
      <div className="w-[1064px] rounded-lg border border-[#ff4f5d] p-24">
        <h1 className="text-4xl font-semibold mb-10 border-b pb-4">참여 팬 리스트</h1>

        <div className="border-dashed border-2 border-gray-300 rounded-lg p-16 flex flex-col items-center justify-center mb-6">
          <button className="text-[#ff4f5d] text-5xl mb-4">
          <FaFileExcel />
          </button>
          <p className="text-xl">클릭하거나 엑셀 파일을 드래그하여 첨부 하세요.</p>
        </div>
          <div className='flex justify-center mb-14'>
          <button className="bg-[#ff4f5d] text-white  px-28 py-2 rounded-xl mb-6">Clean</button>
          </div>
        <div className="mb-4 flex">
          <input className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-4 py-2 mr-2" type="text" placeholder="이름" />
          <input className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-4 py-2 mr-2" type="text" placeholder="이메일" />
          <input className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-4 py-2 mr-2" type="text" placeholder="연락처" />
          <button className="bg-[#ff4f5d] text-white px-4 py-2 rounded-xl">추가</button>
        </div>
        <div className="overflow-y-auto h-96">
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

        <div className="flex justify-center mt-20 gap-4">
          <button className="font-thin text-white bg-[#ff4f5d] rounded-lg px-14 py-3">저장</button>
          <button className="font-thin text-[#ff4f5d] border border-[#ff4f5d] rounded-lg px-14 py-3">취소</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateMeeting;