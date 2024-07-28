import { IoClose } from "react-icons/io5";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const ParticipateStarList = () => {
  const { stars, setStars } = useMeetingSettingStore();

  const handleRemoveParticipant = (index: number): void => {
    const updatedParticipants = stars.filter((_, i) => i !== index);
    setStars(updatedParticipants);
  };

  return (
    <div className='flex flex-wrap gap-2 mt-2'>
      {stars.map((star, index) => (
        <div
          key={index}
          className='flex items-center justify-between border px-1 rounded-3xl border-[#FF4F5D]'
        >
          <span className='pl-3 text-sm font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis cursor-default'>
            {star}
          </span>
          <button
            onClick={() => handleRemoveParticipant(index)}
            className='text-[#FF4F5D] text-xl font-thin p-1 ml-2 hover:text-yellow-500 hover:scale-110 transition-all'
          >
            <IoClose />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ParticipateStarList