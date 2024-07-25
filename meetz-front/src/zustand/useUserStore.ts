import { create } from 'zustand';

interface UserStore {
  accessToken: string;
  expireAt: string;
  role: string;
  setUserData: (accessToken: string, expireAt: string, role: string) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  accessToken: "",
  expireAt: "",
  role: "",

  setUserData: (accessToken, expireAt, role) => {
    set({ accessToken, expireAt, role });
  },

  clearUserData: () => {
    set({
      accessToken: "",
      expireAt: "",
      role: ""
    });
  },
}));
