import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/useUserStore";
import getAccessTKByRefreshTK from "../../apis/auth/getAccessTKByRefreshTK";
import { useEffect } from "react";

/**
 * 페이지 접속 시 권한을 확인하는 커스텀 훅
 */
const useCheckAuth = (pageRole: string) => {
  const navigate = useNavigate();
  const { accessToken, expireAt, role, setUserData, clearUserData } = useUserStore();

  const refreshAccessToken = async (refreshTKOG: string) => {
    try {
      const { accessToken, expireAt, role, refreshToken } = await getAccessTKByRefreshTK(refreshTKOG);
      setUserData(accessToken, expireAt, role);
      localStorage.setItem('rt', refreshToken);
    } catch (error) {
      clearUserData();
      localStorage.clear();
      alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
      navigate('/');
    }
    return;
  }

  useEffect(() => {
    if (!role || !accessToken || !expireAt) { // 역할이 없으면 로그인 페이지로 리다이렉트
      alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
      clearUserData();
      localStorage.clear();
      navigate('/');
      return;
    }

    const refreshTKOG = localStorage.getItem('rt');
    if (!refreshTKOG || refreshTKOG === '') {
      alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
      clearUserData();
      localStorage.clear();
      navigate('/');
      return;
    }

    const expireDate = new Date(expireAt);
    const nowDate = new Date();
    if (expireDate < nowDate) { // 토큰이 만료 됐다면
      refreshAccessToken(refreshTKOG);
    }

    if (role !== pageRole) {
      alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
      clearUserData();
      localStorage.clear();
      navigate('/');
      return;
    }
  }, []);
}

export default useCheckAuth;
