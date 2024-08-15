import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReportsDto } from '../../../../types/types';
import fetchUserData from '../../../../lib/fetchUserData';
import getReportedDetail from '../../../../apis/meeting/getReportedDetail';
import Loading from '../../../../common/Loading';
import AudioPlayer from './AudioPlayer';
import ScriptBox from './ScriptBox';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';

interface AccordionProps {
  title: string;
  report: ReportsDto
}

const Accordion: React.FC<AccordionProps> = ({ title, report }) => {
  const { accessToken } = fetchUserData();
  const { meetingId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const { reportDetail, setReportDetail, setReportedUserId } = useMonitorStore();

  const fetchReportedDetail = async () => {
    setScriptLoading(true);
    try {
      const { data } = await getReportedDetail(+(meetingId || 0), report.reportId, accessToken || '');
      setReportDetail(data);
      setReportedUserId(data.reportedUserId); //이거 가져다가 userId에 넣기
    } catch (error) {
    }
    setScriptLoading(false);
  }

  const openAccordionHandler = () => {
    fetchReportedDetail();
    setIsOpen(!isOpen)
  }

  return (
    <div className='border-b'>
      <div
        className='flex justify-between items-center py-7 cursor-pointer'
        onClick={openAccordionHandler}
      >
        <span className='font-light text-2xl'>{title}</span>
        <svg
          className={`w-9 h-9 text-[#FF4F5D] transform transition-transform ${isOpen ? 'rotate-180' : ''
            } hover:scale-125 hover:text-[#ff4444]`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className='p-4'>
          {scriptLoading ?
            <div className='py-10'>
              <Loading width={60} height={60} />
            </div>
            :
            <>
              {!reportDetail ?
                <div className='flex justify-center items-center py-16 text-2xl text-gray-400 font-semibold'>
                  미팅 내용 데이터가 없습니다.
                </div>
                :
                <><AudioPlayer reportDetail={reportDetail} />
                  <ScriptBox reportDetail={reportDetail} /></>}
            </>}
        </div>
      )}
    </div>
  );
};

export default Accordion;