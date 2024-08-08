import { forwardRef } from "react";
import { FaPlus } from "react-icons/fa6";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const ParticipateStarInput = forwardRef<HTMLInputElement>((props, ref) => {
  const { stars, newStar, inputValue, inputWidth, setStars, setNewStar, setInputValue, setInputWidth } = useMeetingSettingStore();

  const handleAddParticipant = (): void => {
    if (newStar.trim() !== '') {
      setStars([...stars, newStar]);
      setNewStar('');
      setInputValue('');
      setInputWidth(70);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setNewStar(value);
    setInputWidth(Math.max(70, value.length * 16)); // 최소 너비 70px, 문자당 16px 추가
  };

  const handleOnkeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddParticipant();
    }
  }

  return (
    <div className='flex items-center'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleOnkeyDown}
        ref={ref}
        className='text-xl font-normal py-1 focus:outline-none focus:border-[#FF4F5D] border-b hover:border-[#FF4F5D] min-w-[70px] max-w-full'
        placeholder='입력'
        style={{ width: `${inputWidth}px` }}
      />
      <button
        onClick={handleAddParticipant}
        className='text-xl p-2 rounded flex items-center gap-1'
      >
        <FaPlus className='h-5 w-5 font-thin' />
        추가
      </button>
    </div>
  )
});

export default ParticipateStarInput