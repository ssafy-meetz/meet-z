import { useState, useRef, useEffect } from 'react';
import { ReportDetailDto } from '../../../../types/types';
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

interface AudioPlayerProps {
  reportDetail: ReportDetailDto | null;
}

const AudioPlayer = ({ reportDetail }: AudioPlayerProps) => {
  const [progress, setProgress] = useState(0); // 초기 진행률 (퍼센트)
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [curTime, setCurTime] = useState<number>(0);

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (progressBarRef.current) {
      const bar = progressBarRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        100,
        Math.max(0, ((e.clientX - bar.left) / bar.width) * 100)
      );
      setProgress(newProgress);
      if (audioRef.current) {
        const newTime = (newProgress / 100) * totalDuration;
        audioRef.current.currentTime = newTime;
        setCurTime(newTime);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const playHandler = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  const pauseHandler = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }

  // 시간 형식 변환 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setCurTime(audioRef.current!.currentTime);
        setProgress((audioRef.current!.currentTime / totalDuration) * 100);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      return () => {
        audioRef.current!.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [totalDuration]);

  useEffect(() => {
    if (curTime === totalDuration) {
      setPlaying(false);
      setCurTime(0);
      setProgress(0);
    }
  }, [curTime])

  useEffect(() => {
    if (reportDetail?.filePath) {
      audioRef.current = new Audio(reportDetail.filePath);

      // 메타데이터가 로드되었을 때 duration 값을 설정
      audioRef.current.addEventListener('loadedmetadata', () => {
        setTotalDuration(audioRef.current?.duration || 0);
        setCurTime(audioRef.current?.currentTime || 0);
      });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [reportDetail?.filePath]);

  return (
    <div className='bg-white gap-8 items-center justify-between flex rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8'>
      {!playing ? (
        <IoPlayCircleOutline onClick={playHandler} className='w-16 h-16 text-[#ff4f5d] cursor-pointer' />
      ) : (
        <IoPauseCircleOutline onClick={pauseHandler} className='w-16 h-16 text-[#ff4f5d] cursor-pointer' />
      )}
      <div className='space-y-2 w-full'>
        <div
          className='bg-gray-200 rounded-full relative h-2'
          ref={progressBarRef}
          onMouseDown={handleMouseDown}
        >
          <div
            className='bg-[#ff4f5d] h-full rounded-full'
            style={{ width: `${progress}%` }}
            role='progressbar'
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
          <div
            className='flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#ff4f5d] rounded-full cursor-pointer'
            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className='w-3 h-3 bg-[#ff4f5d] rounded-full'></div>
          </div>
        </div>
        <div className='text-gray-500 flex justify-between text-sm font-medium tabular-nums'>
          <div>{formatTime(curTime)}</div>
          <div>{formatTime(totalDuration)}</div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
