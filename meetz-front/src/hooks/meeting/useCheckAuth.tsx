import { useNavigate } from "react-router-dom";
import getAccessTKByRefreshTK from "../../apis/auth/getAccessTKByRefreshTK";
import { useEffect, useState } from "react";
import fetchUserData from "../../lib/fetchUserData";
import clearUserData from "../../lib/clearUserData";
import setUserData from "../../lib/setUserData";

/**
 * 페이지 접속 시 권한을 확인하는 커스텀 훅
 */
const useCheckAuth = (pageRole: string) => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const refreshAccessToken = async (refreshTKOG: string) => {
    try {
      const { accessToken, expireAt, role, refreshToken } = await getAccessTKByRefreshTK(refreshTKOG);
      setUserData(role, expireAt, accessToken);
      localStorage.setItem('rt', refreshToken);
    } catch (error: any) {
      throw new Error('토큰 재발급 에러 발생');
    }
  }

  useEffect(() => {
    if (isAuthChecked) return; // 이미 인증을 체크한 경우 중복 실행 방지

    const { role, expireAt, accessToken } = fetchUserData();

    if (!role || !accessToken || !expireAt) {
      alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
      clearUserData();
      localStorage.clear();
      navigate('/');
      setIsAuthChecked(true);
      return;
    }

    const refreshTKOG = localStorage.getItem('rt');
    if (!refreshTKOG || refreshTKOG === '') {
      alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
      clearUserData();
      localStorage.clear();
      navigate('/');
      setIsAuthChecked(true);
      return;
    }

    const expireDate = new Date(expireAt);
    const nowDate = new Date();
    if (expireAt && expireDate < nowDate) {
      try {
        refreshAccessToken(refreshTKOG);
        setIsAuthChecked(true);
      } catch (error: any) {
        clearUserData();
        localStorage.clear();
        alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
        navigate('/');
      }
      return;
    }

    if (role && role !== pageRole) {
      alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
      clearUserData();
      localStorage.clear();
      navigate('/');
      setIsAuthChecked(true);
      return;
    }
  }, []);

}

export default useCheckAuth;
