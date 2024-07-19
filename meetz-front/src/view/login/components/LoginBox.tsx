import React from 'react';
import logo from '/src/assets/images/logo.png';

const LoginBox = () => {
    return (
            <div className="bg-white rounded-2xl  w-[464px] h-[479px] flex flex-col items-center">
                <div className="w-[360px] flex flex-col mt-[64px]">
                    <div className="mb-10">
                        <img src={logo} alt="Meet:Z 로고" className="w-[102px] h-[19px]" />
                    </div>
                    <div className="flex mb-4 w-full">
                        <label className="mr-4 flex items-center">
                            <input type="radio" name="userType" className="mr-2 form-radio accent-[#FF4F5D]" defaultChecked />
                            <span className="text-[16px]">팬 / 아이돌</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="userType" className="mr-2 form-radio accent-[#FF4F5D]" />
                            <span className="text-[16px]">매니저</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder="이메일 또는 임시 아이디"
                        className="w-full focus:border-[#FF4F5D] focus:outline-none p-4 mb-4 border border-[#C4C4C4] rounded-lg text-[16px] font-[pretendard]"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="focus:border-[#FF4F5D] focus:outline-none w-full p-4  mb-3 border  border-[#C4C4C4] rounded-lg text-[16px]"
                    />
                    <div className="text-right w-full mb-8">
                        <a href="#" className="text-[#C4C4C4] underline text-[16px]">STAFF 회원가입</a>
                    </div>  
                    <button className="w-full bg-[#FF4F5D] text-white p-4 rounded-lg text-[16px]">
                        로그인
                    </button>
                </div>
            </div>
    );
};

export default LoginBox;