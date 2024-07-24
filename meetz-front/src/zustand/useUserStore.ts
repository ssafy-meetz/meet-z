import { create } from 'zustand';
import postUserLogin from '../apis/auth/login';

interface UserStore {
  refreshToken: string;
  accessToken: string;
  expireAt: string;
  role: string;
  loginHandler: (username: string, password: string, isManager: boolean) => Promise<void>;
  logoutHandler: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set) => ({
  refreshToken: "",
  accessToken: "",
  expireAt: "",
  role: "",

  /**
   * userStore - 로그인 API 호출해 userStore에 user 정보, 로컬스토리지에 리프레시 토큰 저장
   * @param {string} username - 스태프/아이돌/팬 이메일
   * @param {string} password - 가입한/발급받은 비밀번호
   * @returns {Promise<void>}
   */
  loginHandler: async (username: string, password: string, isManager: boolean): Promise<void> => {
    try {
      const { refreshToken, accessToken, expireAt, role } = await postUserLogin(username, password, isManager);
      set({ refreshToken, accessToken, expireAt, role });
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      alert(`${error}`);
    }
  },

  /**
   * userStore - 로그아웃.
   * 모든 유저 정보와 로컬 스토리지를 초기화
   */
  logoutHandler: () => {
    set({
      refreshToken: "",
      accessToken: "",
      expireAt: "",
      role: ""
    });
    localStorage.removeItem('refreshToken');
  },

  /**
   * Zustand - 액세스 토큰 갱신
   */
  refreshAccessToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    // 리프레시 토큰이 없으면 다시 로그인 시키는 로직 추가 해야함.
    if (!refreshToken) {
      console.error('No refresh token available');

      return false;
    }

    // 리프레시 토큰을 body에 담아서 다시 액세스 토큰과 만료 날짜를 응답 받아야 함.
    // 아래 코드는 수정해야 함.
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, expireAt } = data.data;
        set((state) => ({ ...state, accessToken, expireAt }));
        return true;
      } else {
        console.error('Failed to refresh access token', data);
        set({
          refreshToken: "",
          accessToken: "",
          expireAt: "",
          role: ""
        });
        localStorage.removeItem('refreshToken');
        return false;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      set({
        refreshToken: "",
        accessToken: "",
        expireAt: "",
        role: ""
      });
      localStorage.removeItem('refreshToken');
      return false;
    }
  },
}));
