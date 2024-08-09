import { useState, useEffect } from 'react';
import checkNotBlackedFan from '../../../../apis/meeting/CheckNotBlackedFan';
import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';
import fetchUserData from '../../../../lib/fetchUserData';
import useEmailValidation from '../../../../hooks/form/useEmailValidation';
import usePhoneValidation from '../../../../hooks/form/usePhoneValidation';

const AddFanInputBox = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const { accessToken } = fetchUserData();
  const { tempNotBlackList, setTempNotBlackList, setBlackList, blackList } =
    useMeetingSettingStore();
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [isBlacked, setIsBlacked] = useState(false);
  const [name, setName] = useState('');
  const { email, setEmail, isValidEmail, handleEmailChange } =
    useEmailValidation();
  const { phone, setPhone, isValidPhone, handlePhoneChange } =
    usePhoneValidation();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const checkFanHandler = async () => {
    if (!name || !isValidEmail || !isValidPhone) {
      setEmail('');
      setName('');
      setPhone('');
      alert('입력 정보 또는 형식을 다시 확인해주세요.');
      return;
    }

    try {
      const result = await checkNotBlackedFan(
        name,
        email,
        phone,
        accessToken || ''
      );
      if (result) {
        setIsBlacked(false);
        setTempNotBlackList([...tempNotBlackList, { name, email, phone }]);
        setIsHighlighted(true);
      }
    } catch (error) {
      setIsBlacked(true);
      setBlackList([...blackList, { name, email, phone }]);
    } finally {
      setAddBtnClicked(true);
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  useEffect(() => {
    if (isHighlighted) {
      scrollToBottom();
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);

  return (
    <>
      <div className='w-full mb-2 flex'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-32 hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2'
          type='text'
          placeholder='이름'
        />
        <input
          value={email}
          onChange={(e) => handleEmailChange(e)}
          className='hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2'
          type='text'
          placeholder='이메일'
        />
        <input
          value={phone}
          onChange={(e) => handlePhoneChange(e)}
          className='hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2'
          type='text'
          placeholder='연락처( - 없이 입력)'
        />
        <button
          onClick={checkFanHandler}
          className='bg-[#ff4f5d] text-white px-4 py-2 rounded-xl active:scale-95 duration-100 ease-in-out transform hover:scale-105 hover:bg-[#ff626f] transition'
        >
          추가
        </button>
      </div>
      {addBtnClicked && (
        <div className='flex justify-center mt-5'>
          {!isBlacked ? (
            <span
              className={`transition-colors ${isHighlighted ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              블랙리스트에 없는 회원입니다. 해당 회원이 팬 리스트에
              추가되었습니다.
            </span>
          ) : (
            <span className='text-red-500'>
              블랙리스트에 등록된 회원입니다. 해당 회원은 팬 리스트에 추가할 수
              없습니다.
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default AddFanInputBox;
