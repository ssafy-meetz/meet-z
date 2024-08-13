import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import getAccessTKByRefreshTK from "../../apis/auth/getAccessTKByRefreshTK";
import { useEffect, useState } from "react";
import fetchUserData from "../../lib/fetchUserData";
import clearUserData from "../../lib/clearUserData";
import setUserData from "../../lib/setUserData";
import postLogout from "../../apis/auth/postLogout";

/**
 * 페이지 접속 시 권한을 확인하는 커스텀 훅
 */
const useCheckAuth = () => {
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

  const callLogout = async () => {
    await postLogout(localStorage.getItem('rt') || '');
  }

  useEffect(() => {

    if (isAuthChecked) return; // 이미 인증을 체크한 경우 중복 실행 방지

    const { role, expireAt, accessToken } = fetchUserData();

    if (!role || !accessToken || !expireAt) {
      alert("로그인 정보가 초기화 되었습니다. 다시 로그인을 진행해주세요.");
      callLogout();
      clearUserData();
      localStorage.clear();
      navigate('/');
      setIsAuthChecked(true);
      return;
    }

    // if (role && role !== pageRole) {
    //   alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
    //   callLogout();
    //   clearUserData();
    //   localStorage.clear();
    //   navigate('/');
    //   setIsAuthChecked(true);
    //   return;
    // }

    // const refreshTKOG = localStorage.getItem('rt');
    // if (!refreshTKOG || refreshTKOG === '') {
    //   alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
    //   clearUserData();
    //   localStorage.clear();
    //   navigate('/');
    //   setIsAuthChecked(true);
    //   return;
    // }

    // const expireDate = new Date(expireAt);
    // const nowDate = new Date();
    // if (expireAt && expireDate < nowDate) {
    //   try {
    //     refreshAccessToken(refreshTKOG);
    //     setIsAuthChecked(true);
    //   } catch (error: any) {
    //     clearUserData();
    //     localStorage.clear();
    //     alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
    //     navigate('/');
    //   }
    //   return;
    // }
  }, []);

  const handleUnload = (event: BeforeUnloadEvent) => {
    // 사용자에게 경고 메시지를 띄우도록 설정
    event.preventDefault();

    // 여기서 로그아웃 API를 호출하지 않고, 사용자가 정말로 페이지를 떠날 때만 로그아웃을 진행
    return event;
  };

  // 페이지를 떠날 때 로그아웃 로직을 실행
  useEffect(() => {
    const unloadHandler = () => {

      const rtk = window.localStorage.getItem('rt') || '';
      navigator.sendBeacon(import.meta.env.VITE_API_DEPLOYED_URL + `/api/leave?token=${rtk}`);
      clearUserData();
      localStorage.clear();
    };

    // 실제 unload 시점에 로그아웃 로직 실행
    window.addEventListener('unload', unloadHandler);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('unload', unloadHandler);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

}

export default useCheckAuth;
