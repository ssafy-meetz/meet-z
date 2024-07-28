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
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";


const CreateMeeting: React.FC = () => {
  useCheckAuth('MANAGER');

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
    </div>
  );
};

export default CreateMeeting;