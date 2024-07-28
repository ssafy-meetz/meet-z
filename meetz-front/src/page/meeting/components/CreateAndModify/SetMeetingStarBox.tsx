import { useEffect, useRef } from "react";
import ParticipateStarInput from "./ParticipateStarInput"
import ParticipateStarList from "./ParticipateStarList"
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const SetMeetingStarBox = () => {
  const { inputWidth } = useMeetingSettingStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth}px`;
    }
  }, [inputWidth]);

  return (
    <div className='flex gap-14 py-5 border-b items-center'>
      <div className='w-40 '>
        <span className='text-xl text-[#3a3a3a] font-semibold'>
          참석할 스타 리스트
        </span>
      </div>
      <div className=''>
        <ParticipateStarInput ref={inputRef} />
        <ParticipateStarList />
      </div>
    </div>
  )
}

export default SetMeetingStarBox