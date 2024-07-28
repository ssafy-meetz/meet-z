import React, { useState, useEffect, useRef } from 'react';
import Plus from '/src/assets/images/plus.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { timeOptions, durationOptions, breakOptions, customStyles } from '../components/TimeOptions';
import useCheckAuth from "../../../hooks/meeting/useCheckAuth";

const CreateMeeting: React.FC = () => {
    useCheckAuth('MANAGER');


  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputWidth, setInputWidth] = useState<number>(70);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<{ value: string; label: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState<{ value: string; label: string } | null>(null);
  const [selectedBreak, setSelectedBreak] = useState<{ value: string; label: string } | null>(null);
  
  const handleClick = () => {
    alert('버튼 클릭');
  };

  const handleAddParticipant = (): void => {
    if (newParticipant.trim() !== '') {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (index: number): void => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setNewParticipant(value); 
    setInputWidth(Math.max(70, value.length * 16)); // 최소 너비 70px, 문자당 16px 추가
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth}px`;
    }
  }, [inputWidth]);
  
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-xl w-screen px-24'>
        <header className='justify-center items-center flex flex-col gap-3 py-20'>
          <h1 className='text-4xl font-bold'>팬싸인회 설정 수정</h1>
        </header>
        <main className='flex flex-col gap-20'>
          <div >
            <div className='flex flex-col gap-2 pb-4'>
              <span className='font-semibold text-2xl'>
                팬 싸인회 기본 설정
              </span>
              <span className='font-light text-base'>
                팬 싸인회 주최에 필요한 기본 정보를 입력합니다.
              </span>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  팬싸인회 이름
                </span>
              </div>
              <div>
                <input
                  type='text'
                  className='focus:outline-none text-xl'
                  placeholder='입력'
                />
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40 '>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  참석할 스타 인원
                </span>
              </div>

              <div className=''>
                <div className='flex items-center'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    ref={inputRef}
                    className='text-xl font-normal py-1 focus:outline-none focus:border-[#FF4F5D] border-b hover:border-[#FF4F5D] min-w-[70px] max-w-full'
                    placeholder='입력'
                    style={{ width: `${inputWidth}px` }}
                  />
                  <button
                    onClick={handleAddParticipant}
                    className='text-xl p-2 rounded flex items-center gap-1'
                  >
                    <img src={Plus} alt='plus icon' className='h-5 w-5  ' />
                    추가
                  </button>
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {participants.map((participant, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between border px-2 rounded-3xl border-[#FF4F5D] py-1'
                    >
                      <span className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                        {participant}
                      </span>
                      <button
                        onClick={() => handleRemoveParticipant(index)}
                        className='text-[#FF4F5D] text-xl font-thin p-1 ml-2'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  당첨 팬 목록 관리
                </span>
              </div>
              <div>
                <button 
                onClick={handleClick}
                className='bg-[#ff4f5d] text-white rounded-xl px-3 py-1'>
                  팬 목록 관리
                </button>
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  참석할 팬 인원
                </span>
              </div>
              <div>
                <span className='text-xl'>50</span>
              </div>
            </div>
          </div>
          <div >
            <div className='flex flex-col gap-2 pb-4'>
              <span className='font-semibold text-2xl'>팬 싸인회 시간 설정</span>
              <span className='font-light text-base'>
                팬 싸인회 주최에 필요한 시간 정보를 입력합니다.
              </span>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>날짜</span>
              </div>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat='yyyy-MM-dd'
                  className='text-xl focus:outline-none cursor-pointer'
                  placeholderText='날짜 선택 '
                />
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  시작 시간
                </span>
              </div>
              <div>
                <Select
                  options={timeOptions}
                  value={selectedTime}
                  onChange={(option) => setSelectedTime(option)}
                  styles={customStyles}
                  className='text-xl'
                  placeholder='선택'
                />
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  진행 시간
                </span>
              </div>
              <div>
                <Select
                  options={durationOptions}
                  value={selectedDuration}
                  onChange={(option) => setSelectedDuration(option)}
                  styles={customStyles}
                  className='text-xl'
                  placeholder='선택'
                />
              </div>
            </div>
            <div className='flex gap-14 py-5 border-b items-center'>
              <div className='w-40'>
                <span className='text-xl text-[#3a3a3a] font-semibold'>
                  쉬는 시간
                </span>
              </div>
              <div>
                <Select
                  options={breakOptions}
                  value={selectedBreak}
                  onChange={(option) => setSelectedBreak(option)}
                  styles={customStyles}
                  className='text-xl'
                  placeholder='선택'
                />
              </div>
            </div>
          </div>
        </main>
        <div className='flex justify-center items-center gap-4 py-20'>
          <button 
          onClick={handleClick}
          className='font-thin text-white bg-[#ff4f5d] rounded-lg px-16 py-3'>
            저장
          </button>
          <button 
          onClick={handleClick}
          className='font-thin text-[#ff4f5d] border border-[#ff4f5d] rounded-lg px-16 py-3'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
