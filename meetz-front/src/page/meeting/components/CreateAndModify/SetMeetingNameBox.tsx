import { useState, useEffect, useRef } from 'react';
import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';

const SetMeetingNameBox = () => {
  const { meetingName, setMeetingName } = useMeetingSettingStore();
  const [inputWidth, setInputWidth] = useState(100); // 초기 width 값을 더 넓게 설정하거나, span의 width로 초기화
  const spanRef = useRef<HTMLSpanElement>(null); // 숨겨진 span 요소를 참조

  useEffect(() => {
    if (spanRef.current) {
      // span 요소의 width를 기반으로 input의 초기 width 설정
      setInputWidth(spanRef.current.offsetWidth + 105); // 10px의 여유를 추가
    }
  }, [meetingName]);

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40'>
        <span className='text-xl text-[#3a3a3a] font-semibold'>미팅 이름</span>
      </div>
      <div className='relative'>
        <input
          type='text'
          value={meetingName}
          className='focus:outline-none focus:border-[#FF4F5D] max-w-full border-b hover:border-[#FF4F5D] text-xl font-semibold'
          style={{ width: `${inputWidth}px` }}
          placeholder='입력'
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <span ref={spanRef} className='absolute invisible whitespace-pre'>
          {meetingName || '입력'}
        </span>
      </div>
    </div>
  );
};

export default SetMeetingNameBox;
