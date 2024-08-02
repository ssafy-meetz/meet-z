import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import SendEmailModal from '../components/Detail/SendEmailModal';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import getMeetingDetail from '../../../apis/meeting/getMeetingDetail';
import { useUserStore } from '../../../zustand/useUserStore';
import { useParams } from 'react-router-dom';
import { MeetingDetailDto } from '../../../types/types';
import DetailHeader from '../components/Detail/DetailHeader';
import DetailRoomList from '../components/Detail/DetailRoomList';
import CleanFanList from '../components/CreateAndModify/CleanFanList';
import LoadEmailModal from '../components/Detail/LoadEmailModal';
import CompleteEmailModal from '../components/Detail/CompleteEmailModal';
import { useDetailstore } from '../../../zustand/useDetailStore';
const DetailPage = () => {
  useCheckAuth('MANAGER');
  const { id } = useParams();
  const { sendModalOpend, modalStep, openMailModal, setModalStep } = useDetailstore();
  const { accessToken } = useUserStore();
  const [meetingData, setMeetingData] = useState<MeetingDetailDto>();
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
      });
    }
  };

  const fetchMeetingData = async () => {
    if (!id) {
      return;
    }

    try {
      const { data, code } = await getMeetingDetail(+id, accessToken);
      if (code === 200) {
        setMeetingData(data);
      }

    } catch (error: any) {
      if (error.response.data) {
        alert(error.response.data.message);
      }
    }
  }

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    fetchMeetingData();
  }, [])

  return (
    <div ref={ref}>
      <DetailHeader meetingData={meetingData} />
      <main className='flex flex-col items-center'>
        <DetailRoomList starList={meetingData?.starList} />

        <div className='max-w-screen-xl w-screen px-24 pt-24 pb-60'>
          <div className='flex justify-between pt-8 items-center'>
            <span className='text-2xl font-semibold'>팬 리스트</span>
            <button
              onClick={openMailModal}
              className='border border-[#ff4f5d] hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-white rounded-3xl px-4 py-2 text-[#ff4f5d]'
            >
              메일 발송
            </button>
          </div>
          <CleanFanList fanList={meetingData?.fanList} />
        </div>
      </main>
      {sendModalOpend && modalStep === 0 && <SendEmailModal meetingId={meetingData?.meetingId} />}
      {sendModalOpend && modalStep === 1 && <LoadEmailModal />}
      {sendModalOpend && modalStep === 2 && <CompleteEmailModal />}
    </div>
  );
};

export default DetailPage;
