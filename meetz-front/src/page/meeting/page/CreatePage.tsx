import React, { useEffect } from 'react';
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
import FanListModal from '../components/CreateAndModify/FanListModal';
import useMeetingSettingStore from '../../../zustand/useMeetingSettingStore';
import useMeetingTimeStore from '../../../zustand/useMeetingTimeStore';
import { useNavigate } from 'react-router-dom';
import postMeetingToCreate from '../../../apis/meeting/createMeeting';
import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import fetchUserData from '../../../lib/fetchUserData';

const CreatePage: React.FC = () => {
  useCheckAuth('MANAGER');
  const navigate = useNavigate();
  const { isOpenModal, meetingName, stars, notBlackList, resetStore } =
    useMeetingSettingStore();
  const {
    selectedDate,
    selectedDuration,
    selectedTime,
    selectedBreak,
    resetTimeStore,
  } = useMeetingTimeStore();
  const { accessToken } = fetchUserData();

  const saveHandler = async () => {
    if (
      !meetingName ||
      !selectedDate ||
      stars.length === 0 ||
      notBlackList.length === 0
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    if (!selectedTime || selectedTime.value === '') {
      alert('시작 시간을 다시 확인하세요!');
      return;
    }

    const starList = stars.map((star) => {
      return { name: star };
    });

    const requestData = {
      meetingName,
      meetingStart: selectedDate + ' ' + selectedTime.value,
      meetingDuration:
        (selectedDuration && parseInt(selectedDuration?.value)) || 0,
      term: (selectedBreak && parseInt(selectedBreak.value)) || 0,
      starList,
      fanList: notBlackList,
    };

    try {
      const { data, code } = await postMeetingToCreate(
        requestData,
        accessToken || ''
      );
      if (code === 200) {
        const { meetingId } = data;
        resetStore();
        resetTimeStore();
        navigate(`/meeting/detail/${meetingId}`);
      }
    } catch (error: any) {
      alert('항목을 모두 입력하세요');
    }
  };

  const cancelHandler = () => {
    navigate('/meeting/yet');
  };

  useEffect(() => {
    resetStore();
    resetTimeStore();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen px-24'>
        <header className='justify-center items-center flex flex-col gap-3 py-20'>
          <h1 className='text-4xl font-bold'>미팅 생성</h1>
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
            onClick={saveHandler}
            className='font-semibold active:scale-95 duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition text-white bg-[#ff4f5d] rounded-2xl px-16 py-3'
          >
            저장
          </button>
          <button
            onClick={cancelHandler}
            className='font-semibold text-[#ff4f5d] active:scale-95  border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 rounded-2xl px-16 py-3'
          >
            취소
          </button>
        </div>
      </div>
      {isOpenModal && <FanListModal />}
    </div>
  );
};

export default CreatePage;
