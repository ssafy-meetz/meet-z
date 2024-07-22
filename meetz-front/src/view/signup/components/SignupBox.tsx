import { useState } from 'react';
import logo from '/src/assets/images/logo.png';
import useEmailValidation from '../../../hooks/form/useEmailValidation';
import usePasswordValidation from '../../../hooks/form/usePasswordValidation';
import usePhoneValidation from '../../../hooks/form/usePhoneValidation';
import useAuthTimer from '../../../hooks/form/useAuthTimer';

const SignupBox = () => {
  const [secondPW, setSecondPW] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [inputAuthNum, setInputAuthNum] = useState("");
  const [company, setCompany] = useState("");
  const [notDuplicated, setNotDuplicated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { email, isValidEmail, handleEmailChange } = useEmailValidation();
  const { password, setPassword, isValidPassword, handlePasswordChange } = usePasswordValidation();
  const { phone, isValidPhone, handlePhoneChange } = usePhoneValidation();
  const { time, isActive, setTime, startTimer, stopTimer } = useAuthTimer(120);

  const checkDuplicate = () => {
    if (!isValidEmail) {
      alert("유효하지 않은 이메일입니다!");
      setNotDuplicated(false);
      return;
    }

    // 이메일 중복 검사 로직 (API 호출로 대체)
    const isDuplicate = false; // 임시 값
    if (isDuplicate) {
      alert("중복된 이메일입니다!");
      setNotDuplicated(false);
      return;
    }

    alert("사용 가능한 이메일입니다.");
    setNotDuplicated(true);
    return;
  };

  const getEmailAuthenticate = () => {
    if (!isValidEmail) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    if (isAuthenticated) {
      alert("이미 인증이 완료되었습니다.")
      return;
    }

    if (!isActive) { // 타이머가 작동하지 않는 상태라면
      startTimer(); //isActive = true로
      try {
        const result = "123456"; // api : 이메일 인증 요청
        setAuthNum(result);

      } catch (e) {
        alert("서버 오류가 발생했습니다.");
      }
      return;
    }

    // 타이머가 작동하고 있는 상태라면
    stopTimer();
    if (authNum !== inputAuthNum) { // 인증 번호 불일치시
      setTime(120); //isActive = false로
      alert("인증 번호가 일치하지 않습니다.");
      setInputAuthNum("");
      return;
    }

    alert("인증에 성공했습니다.");
    setIsAuthenticated(true); // 이메일 인증 성공 여부
  };

  const checkMatchPassword = () => {
    if (password !== secondPW) {
      return false;
    }
    return true;
  };

  const formClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!notDuplicated) return;
    if (!isAuthenticated) return;
    if (!isValidPassword) {
      alert("비밀번호는 8글자 이상이어야 하며, 반드시 특수문자를 한 개 이상 포함해야 합니다!");
      setPassword("");
      setSecondPW("");
      return;
    }
    if (!checkMatchPassword()) {
      alert("비밀번호가 일치하지 않습니다!");
      setPassword("");
      setSecondPW("");
      return;
    };
    if (!isValidPhone) {
      alert("휴대폰 번호를 다시 확인하세요!");
      return;
    }

    // 회원가입 API 호출 로직 추가
    alert("회원가입이 완료되었습니다.");
  };

  return (
    <div className='bg-white rounded-2xl w-464px h-660 flex flex-col items-center'>
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
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-[256px]'
              onChange={handleEmailChange}
            />
            <button
              type='button'
              className='flex items-center justify-center text-[16px] w-[96px] h-full text-[#FF4F5D] rounded-lg border border-solid border-[#FF4F5D]'
              onClick={checkDuplicate}
            >
              중복확인
            </button>
          </div>
          <div className='flex items-center justify-between space-x-2 h-[48px]'>
            <input
              type='password'
              placeholder='인증번호 입력'
              className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-[256px]'
              value={inputAuthNum}
              onChange={(e) => setInputAuthNum(e.target.value)}
              disabled={!isActive}
            />
            <button
              type='button'
              className='flex items-center justify-center text-[16px] w-[96px] h-full text-[#FF4F5D] rounded-lg border border-solid border-[#FF4F5D]'
              onClick={getEmailAuthenticate}
            >
              {!isAuthenticated ? (isActive ? `인증 ${time}초` : '인증번호 발송') : '인증 완료'}
            </button>
          </div>
          <input
            type='password'
            value={password}
            placeholder='비밀번호 (영문, 특수문자를 포함하는 8자 이상)'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
            onChange={handlePasswordChange}
          />
          <input
            type='password'
            value={secondPW}
            placeholder='비밀번호 확인'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
            onChange={(e) => setSecondPW(e.target.value)}
          />
          <input
            type='text'
            value={company}
            placeholder='기관 또는 개인명'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type='text'
            value={phone}
            placeholder='휴대폰 번호 입력 (‘-’ 제외 11자리 입력)'
            className='border border-[#C4C4C4] h-full focus:border-[#FF4F5D] focus:outline-none p-3 text-[16px] rounded-lg w-full'
            onChange={handlePhoneChange}
          />
        </div>
        <button
          type='submit'
          className='mt-[48px] w-full bg-[#FF4F5D] text-white p-4 rounded-lg text-16px'
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignupBox;
