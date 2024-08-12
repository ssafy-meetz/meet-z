import useCheckAuth from '../../../hooks/meeting/useCheckAuth';
import WarningModal from '../components/Monitor/WarningModal';
import BlackModal from '../components/Monitor/BlackModal';
import { useMonitorStore } from '../../../zustand/useMonitorStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchUserData from '../../../lib/fetchUserData';
import getReportedList from '../../../apis/meeting/getReportedList';
import MonitorHeader from '../components/Monitor/MonitorHeader';
import { ReportsDto } from '../../../types/types';
import MonitorList from '../components/Monitor/MonitorList';
import Loading from '../../../common/Loading';

interface ReportedDataDto {
  meetingDuration: string; //number형으로 변경해야함
  meetingEnd: string;
  meetingName: string;
  meetingStart: string;
  meetingTerm: string; // number형으로 변경해야함
  totalParticipants: number;
  reportCount: number;
  reports: ReportsDto[];
}

const MonitoringPage = () => {
  const { meetingId } = useParams();
  const { warnModalOpend, blackModalOpend } = useMonitorStore();
  const [reportedData, setReportedData] = useState<ReportedDataDto | null>(null);
  const { accessToken } = fetchUserData();

  useCheckAuth('MANAGER');

  const fetchReportedData = async () => {
    try {
      const { data } = await getReportedList(+(meetingId || '0'), accessToken || "");
      setReportedData(data);
    } catch (eeror) {

    }
  }

  useEffect(() => {
    fetchReportedData();
  }, [])

  if (!reportedData) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Loading width={160} height={160} />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen  px-24'>
        <MonitorHeader reportedData={reportedData} />
        <span className='text-2xl font-bold'>총 {reportedData?.reportCount} 건</span>
        <MonitorList reports={reportedData && reportedData.reports || null} />
      </div>
      {warnModalOpend && <WarningModal />}
      {blackModalOpend && <BlackModal />}
    </div>
  );
};

export default MonitoringPage;
