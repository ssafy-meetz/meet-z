import React, { useState, useEffect, ChangeEvent } from 'react';
import useEnvSettingStore from '../../../../zustand/useEnvSettingStore';
import fetchUserData from '../../../../lib/fetchUserData';
import putModifyFanNickname from '../../../../apis/session/modifyFanNickname';
import { StarDto } from '../../../../types/types';

interface MeetingInfoDto {
  chatRoomId: number;
  meetingDuration: number;
  meetingId: number;
  meetingName: string;
  meetingstart: string;
  nickname: string;
  starList: StarDto[];
  term: number;
  userPosition: number;
}

const SetNickname: React.FC = () => {
  const { nextStep } = useEnvSettingStore();
  const [nickname, setNickname] = useState<string>('');
  const { accessToken } = fetchUserData();
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfoDto>(JSON.parse(sessionStorage.getItem('mi') || ""));

  // 로컬 스토리지에서 닉네임을 불러오는 함수
  useEffect(() => {
    const storedNickname = meetingInfo.nickname;

    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  // 닉네임을 세션 스토리지에 저장하고 다음 단계로 이동하는 함수
  const handleNext = async () => {
    if (!validateNickname(nickname)) {
      alert('닉네임을 제대로 입력해 주세요.');
      return;
    }

    const newMeetingInfo = { ...meetingInfo, nickname };
    setMeetingInfo(newMeetingInfo);
    sessionStorage.setItem('mi', JSON.stringify(newMeetingInfo));
    const result = await putModifyFanNickname(nickname, accessToken || "");

    if (!result) {
      alert('닉네임 변경에 실패했습니다.');
    }

    nextStep();
  };

  // 닉네임 유효성 검사 함수
  const validateNickname = (name: string): boolean => {
    const trimmedName = name.trim();

    // 공백, 길이 제한 확인
    if (trimmedName === '' || trimmedName.length > 10) {
      return false;
    }

    // 한글 자음과 모음, 그리고 알파벳, 숫자를 제외한 기호 포함 여부 확인
    const validRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (!validRegex.test(trimmedName)) {
      return false;
    }

    // 자음과 모음만 있는 경우 및 연속적인 자음/모음 패턴 확인
    // 단일 자음/모음은 허용하지 않음 (ㄱ-ㅎ, ㅏ-ㅣ 단독 금지)
    const koreanConsonantVowelRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
    if (koreanConsonantVowelRegex.test(trimmedName)) {
      return false;
    }

    return true;
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className='flex flex-col w-[790px] items-center justify-center'>
      <div className='w-full flex flex-col px-24 h-full justify-center gap-1'>
        <span className='text-3xl font-semibold cursor-default'>오늘 팬 싸인회에서</span>
        <span className='text-3xl font-semibold cursor-default'>
          사용할 닉네임을 설정해 주세요.
        </span>
        <input
          type='text'
          value={nickname}
          onChange={handleNicknameChange}
          className='p-3 mt-5 bg-white border rounded-md hover:border-[#ff4f5d] focus:border-[#FF4F5D] focus:outline-none border-[#7d7d7d]'
        />
        <span className='text-[#7d7d7d] mt-2 cursor-default'>
          공백/기호를 제외하고 10자 이내
        </span>
      </div>
      <div className='w-full flex justify-end h-28 px-14'>
        <button
          onClick={handleNext}
          className='text-xl text-[#ff4f5d] w-[83px] h-[44px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SetNickname;
