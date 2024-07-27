// Accordion.tsx
import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ScriptBox from './ScriptBox';
interface AccordionProps {
  title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b'>
      <div
        className='flex justify-between items-center py-7 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='font-medium text-2xl'>{title}</span>
        <svg
          className={`w-9 h-9 text-[#FF4F5D] transform transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className='p-4'>
          <AudioPlayer />
          <ScriptBox />
        </div>
      )}
    </div>
  );
};

export default Accordion;
