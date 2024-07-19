import { create } from 'zustand'

interface userStore {
  refreshToken: String;
  accessToken: String;
  expireAt: String;
  role: String;
  setRole: (val: String) => void;
  clearTokens: () => void
  loginHandler: (username: String, password: String) => void;
  logoutHandler: () => void;
  refreshAccessToken: () => void;
}

export const useUserStore = create<userStore>((set) => ({
  // 로그인한 유저의 정보를 userStore에 저장
  refreshToken: "",
  accessToken: "",
  expireAt: "",
  role: "",

  // 백엔드에서 받아온 정보로 토큰과 역할을 설정하는 
  setTokens: (refreshToken: String, accessToken: String, expireAt: String) => set({
    refreshToken, accessToken, expireAt
  }),
  setRole: (role) => set({ role }),

  // 토큰을 비우는 함수
  clearTokens: () => set({
    refreshToken: "",
    accessToken: "",
    expireAt: "",
    role: ""
  }),

  // 로그인
  loginHandler: async (username: String, password: String) => {
    // API 통신 코드 수정 필요
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      const { 'refresh-token': refreshToken, 'access-token': accessToken, 'expire-at': expireAt, role } = data.data;
      set({ refreshToken, accessToken, expireAt, role });
      localStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰을 로컬 스토리지에 저장
    } else {
      // 로그인 실패 처리
      console.error('Login failed', data);
    }
  },

  // 로그아웃
  logoutHandler: () => {
    set({
      refreshToken: "",
      accessToken: "",
      expireAt: "",
      role: ""
    });
    localStorage.removeItem('refreshToken');
  },

  // 액세스 토큰을 갱신하는 함수
  //  - 로컬스토리지에서 리프레시 토큰을 불러와 사용
  refreshAccessToken: async () => {

    // API 통신 코드 수정 필요
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      // 로컬스토리지에 리프레시 토큰이 없으면 로그인페이지로 보내야함
      console.error('No refresh token available');
      return;
    }

    // 수정 필요
    const response = await fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({ token: refreshToken }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      const { 'access-token': accessToken, 'expire-at': expireAt } = data.data;
      set((state) => ({ ...state, accessToken, expireAt }));
    } else {
      console.error('Failed to refresh access token', data);
      set({
        refreshToken: "",
        accessToken: "",
        expireAt: "",
        role: ""
      });
      localStorage.removeItem('refreshToken');
    }
  },
}))
