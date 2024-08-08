import React, { useState, ChangeEvent, useEffect } from 'react';
import useEnvSettingStore from '../../../../zustand/useEnvSettingStore';
import { TbTrashX } from 'react-icons/tb';
import { MeetingInfoDto } from '../../../../types/types';

interface Memo {
  star: string;
  text: string;
}

const SetMemo: React.FC = () => {
  const { nextStep, beforeStep } = useEnvSettingStore();

  const [selectedMemo, setSelectedMemo] = useState<string>('');
  const [memoText, setMemoText] = useState<string>('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfoDto>(JSON.parse(sessionStorage.getItem('mi') || ""));


  // 로컬 스토리지에서 메모를 불러오는 함수
  const loadMemosFromStorage = (): Memo[] => {
    const storedMemos = localStorage.getItem('memos');
    return storedMemos ? JSON.parse(storedMemos) : [];
  };

  // 로컬 스토리지에 메모를 저장하는 함수
  const saveMemosToStorage = (memos: Memo[]) => {
    localStorage.setItem('memos', JSON.stringify(memos));
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 메모를 불러옴
  useEffect(() => {
    setMemos(loadMemosFromStorage());
  }, []);

  // 메모가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (memos.length > 0) {
      saveMemosToStorage(memos);
    }
  }, [memos]);

  // 스타 선택 시 기존 메모 불러오기
  useEffect(() => {
    const existingMemo = memos.find((memo) => memo.star === selectedMemo);
    setMemoText(existingMemo ? existingMemo.text : '');
  }, [selectedMemo, memos]);

  // 메모 저장 핸들러
  const handleSave = () => {
    if (!selectedMemo || !memoText) {
      alert('스타와 메모를 모두 입력해주세요.');
      return;
    }

    setMemos((prevMemos) => {
      const existingMemoIndex = prevMemos.findIndex(
        (memo) => memo.star === selectedMemo
      );

      if (existingMemoIndex !== -1) {
        // 기존 메모 업데이트
        const updatedMemos = [...prevMemos];
        updatedMemos[existingMemoIndex].text = memoText;
        return updatedMemos;
      } else {
        // 새 메모 추가
        return [...prevMemos, { star: selectedMemo, text: memoText }];
      }
    });

    setMemoText('');
    setSelectedMemo('');
  };

  // 메모 삭제 핸들러
  const handleDelete = (index: number) => {
    setMemos((prevMemos) => {
      const updatedMemos = prevMemos.filter((_, i) => i !== index);

      // 마지막 메모 삭제 후 로컬 스토리지 업데이트
      if (updatedMemos.length === 0) {
        localStorage.removeItem('memos'); // 로컬 스토리지에서 키 제거
      } else {
        localStorage.setItem('memos', JSON.stringify(updatedMemos)); // 업데이트된 메모 저장
      }

      return updatedMemos;
    });
  };
  // 메모 선택 핸들러
  const handleSelectMemo = (index: number) => {
    const selected = memos[index];
    setSelectedMemo(selected.star);
    setMemoText(selected.text);
  };

  // 스타 선택 핸들러
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMemo(e.target.value);
  };

  // 텍스트 변경 핸들러
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(e.target.value);
  };

  return (
    <div className='flex flex-col w-[790px] items-center justify-center'>
      <div className='w-full flex flex-col px-24 h-full justify-center gap-1'>
        <span className='text-3xl font-semibold'>메모 작성</span>
        <span className='text-[#7d7d7d] text-lg'>
          팬 싸인회 진행 도중 참고하고 싶은 메모를 작성해 주세요.
        </span>
        <span className='text-[#7d7d7d] mb-8'>
          멤버별 한 개의 메모씩 저장이 가능합니다.
        </span>
        <div className='flex items-center'>
          <div className='w-[180px] h-[236px] p-3 border rounded overflow-auto'>
            {memos.map((memo, index) => (
              <div
                key={index}
                className='flex justify-between items-center mb-2'
              >
                <span
                  onClick={() => handleSelectMemo(index)}
                  className='cursor-pointer'
                >
                  {memo.star}
                </span>
                <button
                  onClick={() => handleDelete(index)}
                  className='text-[#ff4f5d]'
                >
                  <TbTrashX className='text-2xl' />
                </button>
              </div>
            ))}
          </div>
          <div className='w-[380px] h-[236px] px-3'>
            <div className='mb-2'>
              <select
                value={selectedMemo}
                onChange={handleSelectChange}
                className='border p-2 rounded-lg w-full focus:outline-none focus:border-[#ff4f5d] cursor-pointer'
              >
                <option value='' disabled>스타 선택</option>
                {meetingInfo.starList.map((star) => <option value={star.name} key={star.email}>{star.name}</option>)}
              </select>
            </div>
            <div className='relative h-[188px]'>
              <textarea
                value={memoText}
                onChange={handleTextChange}
                className='border p-2 rounded w-full h-full focus:outline-none focus:border-[#ff4f5d] resize-none'
                placeholder='메모를 입력하세요'
                maxLength={300}
              />
              <span className='absolute bottom-2 right-2 text-gray-500'>
                {memoText.length}/300자
              </span>
            </div>
            <div className='flex justify-end mt-2'>
              <button
                onClick={handleSave}
                className='bg-[#ff4f5d] text-white py-2 px-4 rounded-xl hover:bg-[#f9606c]'
              >
                메모 저장
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between h-28 px-14'>
        <button
          onClick={beforeStep}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white'
        >
          이전
        </button>
        <button
          onClick={nextStep}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SetMemo;
