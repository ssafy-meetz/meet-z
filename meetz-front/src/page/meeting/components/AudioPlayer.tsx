import { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const [progress, setProgress] = useState(0); // 초기 진행률 (퍼센트)
  const progressBarRef = useRef<HTMLDivElement>(null);

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
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className='bg-white gap-8 items-center justify-between flex rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8'>
      <button type='button' className=''>
        <svg width='50' height='50' fill='none'>
          <circle
            className='text-[#ff4f5d]'
            cx='25'
            cy='25'
            r='24'
            stroke='currentColor'
            strokeWidth='1.5'
          />
          <path
            className='text-[#ff4f5d]'
            d='M18 16h4v18h-4V16zM28 16h4v18h-4z'
            fill='currentColor'
          />
        </svg>
      </button>
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
          <div>00:00</div>
          <div>03:00</div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
