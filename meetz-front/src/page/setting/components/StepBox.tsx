import React from 'react';
import { BsChatHeart } from 'react-icons/bs';

interface StepBoxProps {
  steps: { step: number; label: string }[];
  currentStep: number;
  setStep: (step: number) => void;
  toggleChattingBox: () => void;
}

const StepBox: React.FC<StepBoxProps> = ({
  steps,
  currentStep,
  setStep,
  toggleChattingBox,
}) => {
  return (
    <div className='flex flex-col justify-between w-[338px] h-[662px] border-r-4 border-[#d9d9d9] py-14 items-center'>
      <div className='w-[260px] flex flex-col gap-6'>
        {steps.map(({ step, label }) => (
          <button
            key={step}
            onClick={() => setStep(step)}
            className={`text-xl py-3 px-4 text-left rounded-3xl w-full hover:text-white group ${
              currentStep === step
                ? 'bg-[#ff4f5d] text-white'
                : 'text-[#7d7d7d] hover:bg-[#ff4f5d] focus:text-[#ff4f5d]'
            }`}
          >
            <span
              className={`inline-block w-8 h-8 mr-3 text-center rounded-full ${
                currentStep > step
                  ? 'border border-[#ff4f5d] text-[#ff4f5d] group-hover:text-white'
                  : ''
              }`}
            >
              {step}
            </span>
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={toggleChattingBox}
        className='flex items-center px-3 w-[260px] gap-3'
      >
        <BsChatHeart className='text-4xl text-[#ff4f5d]' />
        <span className='hover:text-[#ff4f5d] text-xl font-medium text-[#7d7d7d]'>
          1:1 문의 채팅
        </span>
      </button>
    </div>
  );
};

export default StepBox;
