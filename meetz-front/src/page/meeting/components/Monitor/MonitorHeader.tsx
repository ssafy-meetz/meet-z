import { ReportsDto } from "../../../../types/types";

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

const MonitorHeader = ({ reportedData }: { reportedData: ReportedDataDto | null }) => {

  const convertDate = (dateStr: string) => {
    const date = dateStr.split("T")[0].split("-");
    return date[0] + '.' + date[1] + '.' + date[2];
  };

  const convertTime = (dateStr: string) => {
    const time = dateStr.split("T")[1].split(":");
    const tempH = time[0];
    const minute = time[1];
    let hour;
    let timeText = '오전';

    if (+tempH > 12) {
      hour = +tempH - 12;
      timeText = '오후';
    } else {
      hour = +tempH;
      timeText = '오전';
    }
    return minute === '00' ? timeText + ' ' + hour + '시' : timeText + ' ' + hour + '시 ' + minute + '분';
  }

  return (
    <header className='items-center flex flex-col py-20'>
      <h1 className='text-4xl font-bold pb-14'>신고 당한 미팅</h1>
      <h1 className='text-[28px] font-bold text-[#ff4f5d]'>
        {reportedData?.meetingName}
      </h1>
      <h2 className='text-[#7D7D7D] text-[24px]'>
        {reportedData && convertDate(reportedData.meetingStart)} {reportedData && convertTime(reportedData.meetingStart)} ({reportedData && reportedData.totalParticipants}명 참여)
      </h2>
    </header>
  )
}

export default MonitorHeader