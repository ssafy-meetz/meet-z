import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../zustand/useUserStore";
import getAccessTKByRefreshTK from "../../apis/auth/getAccessTKByRefreshTK";
import useIsManagerPage from "./useIsManagerPage";


/**
 * 페이지 접속 시 권한을 확인하는 커스텀 훅
 */
const useCheckAuth = async () => {
    const navigate = useNavigate();
    const { accessToken, expireAt, role, setUserData } = useUserStore();
    const { isManagerPage } = useIsManagerPage();
    const refreshTKOG = localStorage.getItem('rt');

    if (!role || !accessToken || !expireAt) { // 역할이 없으면 로그인 페이지로 리다이렉트
        navigate('/');
        return;
    }
    if (!refreshTKOG || refreshTKOG === '') {
        alert("로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.");
        navigate('/');
        return;
    }

    const expirtDate = new Date(expireAt);
    const nowDate = new Date();

    if (expirtDate < nowDate) {//토큰이 만료 됐다면
        const { accessToken, expireAt, role, refreshToken } = await getAccessTKByRefreshTK(refreshTKOG);
        setUserData(accessToken, expireAt, role);
        localStorage.setItem('rt', refreshToken);
    }

    if (role === 'MANAGER' && !isManagerPage) {
        alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
        navigate('/');
        return;
    }

    if (role !== 'MANAGER' && isManagerPage) {
        alert('로그인 오류가 발생했습니다. 다시 로그인을 진행해주세요.');
        navigate('/');
        return;
    }
}

export default useCheckAuth