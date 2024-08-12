import { useEffect, useState } from 'react';
import { useMonitorStore } from '../../../../zustand/useMonitorStore';
import { ReportDetailDto, SegementsDto } from '../../../../types/types';

interface AudioPlayerProps {
  reportDetail: ReportDetailDto | null;
}

const ScriptBox = ({ reportDetail }: AudioPlayerProps) => {
  const { openWarnModal, openBlackModal } = useMonitorStore();
  const [segments, setSegments] = useState<SegementsDto[] | null>([]);

  const checkBadWords = (text: string, badwords: string[]) => {
    let filteredText = text;
    if (badwords && badwords.length > 0) {
      badwords.forEach(bad => {
        const regex = new RegExp(bad, 'gi'); // 대소문자 구분 없이 욕설을 찾는 정규식
        filteredText = filteredText.replace(regex, '**');
      });
    }
    return filteredText;
  }

  useEffect(() => {
    setSegments(reportDetail?.segments || null);
  }, [reportDetail, segments])

  return (
    <div className='flex flex-col items-center p-4 space-y-4 gap-12'>
      <div className='bg-[#F9F9F9] flex flex-col gap-6 w-full shadow-md rounded-lg p-6 space-y-4'>
        {!segments?.length ?
          <span className='text-lg'>
            아아아아
          </span> :
          <div className='flex flex-col gap-6 justify-between'>
            {segments && segments.map((segment, index) => (
              <div className='flex gap-6' key={index}>
                <div className='text-left w-28 cursor-default font-semibold text-sm transition duration-150'>
                  {segment.startTime} - {segment.endTime}
                </div>
                <div className='w-[550px]'>
                  {checkBadWords(segment.text, segment.badWordsList)}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <div className='flex justify-end space-x-4 py-'>
        <button
          onClick={openWarnModal}
          className='bg-white text-[#FF4F5D] px-4 py-2 border border-[#FF4F5D] hover:text-white rounded-3xl hover:bg-[#FF4F5D]'
        >
          해당 팬 경고 누적하기
        </button>
        <button
          onClick={openBlackModal}
          className='bg-white text-[#FF4F5D] px-4 py-2 rounded-3xl border border-[#FF4F5D] hover:text-white hover:bg-[#FF4F5D]'
        >
          해당 팬 영구제명하기
        </button>
      </div>
    </div >
  );
};

export default ScriptBox;
