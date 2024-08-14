import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import { useState } from "react";
import useEmailValidation from "../../../hooks/form/useEmailValidation";
import usePasswordValidation from "../../../hooks/form/usePasswordValidation";
import postUserLogin from "../../../apis/auth/login";
import setUserData from "../../../lib/setUserData";
import getMeetingInfoAtEnterFan from "../../../apis/meeting/getMeetingInfoAtEnterFan";
import getMeetingInfoAtEnterStar from "../../../apis/meeting/getMeetingInfoAtEnterStar";
import { useSessionStore } from "../../../zustand/useSessionStore";

const LoginBox = () => {
  const navigate = useNavigate();
  const [isManager, setIsManager] = useState(false);
  const { email, isValidEmail, handleEmailChange } = useEmailValidation();
  const { password, isValidPassword, handlePasswordChange } =
    usePasswordValidation();

  const onChangeRadioBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManager(e.target.value === "manager");
  };
  const { setRemain, setWaitingTime, setWait } = useSessionStore();

  const routeAfterLogin = async (role: string, accessToken: string) => {
    if (role === "MANAGER") {
      navigate("/meeting/yet");
      return;
    }

    // 팬이라면 미팅 설정페이지로 이동
    if (role === "FAN") {
      try {
        const meetingInfo = await getMeetingInfoAtEnterFan(accessToken);
        if (meetingInfo && meetingInfo.meetingId !== null) {
          sessionStorage.setItem("mi", JSON.stringify(meetingInfo));
          navigate("/session");
          setWait(meetingInfo.userPosition);
          setWaitingTime(meetingInfo.waitingTime);
        } else {
          throw new Error("미팅 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        alert(error);
      }
    }

    // 스타라면 미팅 대기 페이지로 이동
    if (role === "STAR") {
      try {
        const meetingInfo = await getMeetingInfoAtEnterStar(accessToken);
        if (meetingInfo && meetingInfo.meetingId !== null) {
          sessionStorage.setItem("mis", JSON.stringify(meetingInfo));
          setRemain(meetingInfo.fanList.length);
          navigate("/session");
        } else {
          throw new Error("미팅 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error: any) {
        if (error.message === "존재하지 않는 회원입니다.") {
          alert("존재하지 않는 회원입니다.");
        } else if (error.message === "올바른 형식이 아닙니다.") {
          alert("올바른 형식이 아닙니다.");
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      }
    }
  };

  const formClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail) {
      alert("올바르지 않은 이메일 형식입니다.");
      return;
    }

    if (!isValidPassword) {
      alert("비밀번호는 8글자 이상이며, 특수문자를 포함해야 합니다.");
      return;
    }

    // 로그인 API 요청 보내기
    try {
      const { refreshToken, accessToken, expireAt, role } = await postUserLogin(
        email,
        password,
        isManager
      );
      alert("로그인에 성공했습니다.");

      localStorage.setItem("rt", refreshToken);
      setUserData(role, expireAt, accessToken);
      routeAfterLogin(role, accessToken);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-[464px] flex flex-col items-center shadow-lg  animate-fadeIn">
      <form
        className="w-[360px]  flex flex-col mx-14 my-16"
        onSubmit={(e) => formClickHandler(e)}
      >
        <div className="mb-10 flex ">
          <img src={logo} alt="Meet:Z 로고" className="w-[150px] h-[30px]" />
        </div>
        <div className="flex mb-4 w-full">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="userType"
              value="fan"
              className="mr-2 form-radio accent-[#FF4F5D] transition-transform duration-200 ease-in-out transform hover:scale-110 focus:scale-110 active:scale-95 "
              checked={!isManager}
              onChange={onChangeRadioBtn}
            />
            <span>팬 / 스타</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="manager"
              className="mr-2 form-radio accent-[#FF4F5D] transition-transform duration-200 ease-in-out transform hover:scale-110 focus:scale-110 active:scale-95 "
              checked={isManager}
              onChange={onChangeRadioBtn}
            />
            <span>매니저</span>
          </label>
        </div>

        <input
          type="text"
          placeholder="이메일 또는 임시 아이디"
          value={email}
          onChange={handleEmailChange}
          className="w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out focus:border-[#FF4F5D] focus:outline-none p-4 mb-4 border border-[#C4C4C4] rounded-lg"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          className="w-full hover:border-[#ff4f5d] transition-all duration-400 ease-in-out focus:border-[#FF4F5D] focus:outline-none p-4 mb-4 border border-[#C4C4C4] rounded-lg"
        />
        <div className="text-right w-full mb-8 ">
          <Link to="/signup" className="text-[#C4C4C4] underline">
            STAFF 회원가입
          </Link>
        </div>
        <button className="w-full transform duration-100 ease-in-out  hover:bg-[#fd5866] hover:scale-105 active:scale-95 transition bg-[#FF4F5D] text-white p-4 rounded-lg">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginBox;
