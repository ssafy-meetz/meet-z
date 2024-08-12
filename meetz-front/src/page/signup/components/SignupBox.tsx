import { useRef, useState } from 'react';
import logo from '/src/assets/images/logo.png';
import { FaTimes, FaCheck } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기
import useEmailValidation from '../../../hooks/form/useEmailValidation';
import usePasswordValidation from '../../../hooks/form/usePasswordValidation';
import usePhoneValidation from '../../../hooks/form/usePhoneValidation';
import useAuthTimer from '../../../hooks/form/useAuthTimer';
import postUserSignup from '../../../apis/auth/signup';
import checkDuplicatedEmail from '../../../apis/auth/checkDuplicatedEmail';
import reqCertifyEmail from '../../../apis/auth/reqCertifyEmail';
import checkEmailAuthNum from '../../../apis/auth/checkEmailAuthNum';
import { useNavigate } from 'react-router-dom';

const SignupBox = () => {
  const navigate = useNavigate();
  const [secondPW, setSecondPW] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [company, setCompany] = useState('');
  const [notDuplicated, setNotDuplicated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { email, isValidEmail, handleEmailChange } = useEmailValidation();
  const { password, setPassword, isValidPassword, handlePasswordChange } =
    usePasswordValidation();
  const { phone, isValidPhone, handlePhoneChange } = usePhoneValidation();
  const { time, isActive, setTime, startTimer, stopTimer } = useAuthTimer(180);
  const authCodeInputRef = useRef<HTMLInputElement>(null);

  const checkDuplicate = async () => {
    if (!isValidEmail) {
      alert('유효하지 않은 이메일입니다!');
      setNotDuplicated(false);
      return;
    }

    try {
      const isNotDuplicate = await checkDuplicatedEmail(email);
      if (isNotDuplicate) {
        alert('사용 가능한 이메일입니다.');
        setAuthCode('');
        setIsAuthenticated(false);
        setNotDuplicated(true);
        setTime(180);
        stopTimer();
        return;
      }

      alert('중복된 이메일입니다!');
      setNotDuplicated(false);
      return;
    } catch (error: any) {
      if (error.message === '이미 가입된 이메일입니다.') {
        alert('이미 가입된 이메일입니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const getEmailAuthenticate = async () => {
    if (!isValidEmail) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }
    if (isAuthenticated) {
      alert('이미 인증이 완료되었습니다.');
      return;
    }

    if (!isActive) {
      startTimer();
      if (authCodeInputRef.current) {
        authCodeInputRef.current.focus();
      }
      alert('인증 번호를 발송했습니다. 제한 시간 내에 인증을 완료해주세요.');
      await reqCertifyEmail(email);
      return;
    }

    if (!authCode || authCode === null || authCode === '') {
      alert('올바른 인증 번호를 입력하세요.');
      return;
    }

    stopTimer();
    try {
      const result = await checkEmailAuthNum(email, authCode);
      if (result) {
        alert('인증이 완료되었습니다.');
        setIsAuthenticated(true);
        return;
      }
    } catch (e) {
      alert('인증 번호가 일치하지 않습니다.');
      setIsAuthenticated(false);
      setAuthCode('');
      stopTimer();
      setTime(120);
    }
  };

  const checkMatchPassword = () => {
    if (password !== secondPW) {
      return false;
    }
    return true;
  };

  const formClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!notDuplicated) {
      alert('이메일을 다시 확인해주세요.');
      return;
    }
    if (!isAuthenticated) {
      alert('이메일 인증을 완료하세요.');
      return;
    }
    if (!isValidPassword) {
      alert(
        '비밀번호는 8글자 이상이어야 하며, 반드시 특수문자를 한 개 이상 포함해야 합니다!'
      );
      setPassword('');
      setSecondPW('');
      return;
    }
    if (!checkMatchPassword()) {
      alert('비밀번호가 일치하지 않습니다!');
      setPassword('');
      setSecondPW('');
      return;
    }
    if (!isValidPhone) {
      alert('휴대폰 번호를 다시 확인하세요!');
      return;
    }

    try {
      const successSignup = await postUserSignup(
        email,
        password,
        company,
        phone
      );
      if (successSignup) {
        alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
        navigate('/');
        return;
      }

      alert('회원가입에 실패했습니다.');
    } catch (e) {
      alert(`회원가입에 실패했습니다.`);
    }
  };

  return (
    <div className='bg-white rounded-2xl w-[464px] h-[660px] flex flex-col items-center  animate-fadeIn'>
      <form className='w-[360px] my-[64px]' onSubmit={formClickHandler}>
        <div className='flex items-center justify-between w-[269px] h[24px] mb-[40px]'>
          <img src={logo} alt='Meet:Z 로고' className='w-[102px] h-[19px]' />
          <span className='text-[20px] font-bold'>Manager sign up</span>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between space-x-2 h-[48px]'>
            <input
              type='email'
              placeholder='이메일(example@company.com)'
              value={email}
              className='border border-[#C4C4C4] h-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out focus:border-[#FF4F5D] focus:outline-none p-3 rounded-lg w-[256px]'
              onChange={handleEmailChange}
            />
            <button
              type='button'
              className='flex items-center justify-center  w-[96px] active:scale-95 h-full text-[#FF4F5D] rounded-lg transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 border border-solid border-[#FF4F5D]'
              onClick={checkDuplicate}
            >
              중복확인
            </button>
          </div>
          <div className='flex items-center justify-between space-x-2 h-[48px]'>
            <input
              ref={authCodeInputRef}
              type='password'
              placeholder='인증번호를 입력해주세요.'
              className='border border-[#C4C4C4] h-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out focus:border-[#FF4F5D] focus:outline-none p-3 rounded-lg w-[256px]'
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button
              type='button'
              className={`flex items-center justify-center w-[96px] h-full text-[#FF4F5D] transition active:scale-95 duration-100 ease-in-out transform rounded-lg border border-solid border-[#FF4F5D]
                ${isActive ? 'bg-[#ff4f5d] text-white scale-105' : ''}
                ${
                  isAuthenticated
                    ? 'bg-gray-100 text-gray-400 border-gray-400'
                    : 'hover:bg-[#ff4f5d] hover:text-white hover:scale-105'
                }`}
              onClick={getEmailAuthenticate}
              disabled={isAuthenticated}
            >
              {!isAuthenticated
                ? isActive
                  ? `인증 ${time}초`
                  : '인증번호 발송'
                : '인증 완료'}
            </button>
          </div>
          <div className='relative'>
            <input
              type='password'
              value={password}
              placeholder='비밀번호 (영문, 특수문자를 포함하는 8자 이상)'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 rounded-lg w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out'
              onChange={handlePasswordChange}
            />
            <span className='absolute inset-y-0 right-3 flex items-center'>
              {password &&
                (isValidPassword ? (
                  <FaCheck className='text-green-500' />
                ) : (
                  <FaTimes className='text-red-500' />
                ))}
            </span>
          </div>
          <div className='relative'>
            <input
              type='password'
              value={secondPW}
              placeholder='비밀번호 확인'
              className='border  border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 rounded-lg w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out'
              onChange={(e) => setSecondPW(e.target.value)}
            />
            <span className='absolute inset-y-0 right-3 flex items-center'>
              {secondPW &&
                (checkMatchPassword() ? (
                  <FaCheck className='text-green-500' />
                ) : (
                  <FaTimes className='text-red-500' />
                ))}
            </span>
          </div>
          <div className='relative'>
            <input
              type='text'
              value={company}
              placeholder='기관 또는 개인명'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 rounded-lg w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out'
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className='relative'>
            <input
              type='text'
              value={phone}
              placeholder='휴대폰 번호 입력 (‘-’ 제외 11자리 입력)'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D]  focus:outline-none p-3 rounded-lg w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out'
              onChange={handlePhoneChange}
            />
            <span className='absolute inset-y-0 right-3 flex items-center'>
              {phone &&
                (isValidPhone ? (
                  <FaCheck className='text-green-500' />
                ) : (
                  <FaTimes className='text-red-500' />
                ))}
            </span>
          </div>
        </div>
        <button
          type='submit'
          className='mt-[48px] w-full bg-[#FF4F5D]  duration-100 ease-in-out transform hover:scale-105 active:scale-95 hover:bg-[#fd5866] transition text-white p-4 rounded-lg '
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignupBox;
