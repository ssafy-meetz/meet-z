import { create } from "zustand";

interface SessionStore {
  starName: string;
  fanName: string;
  wait: number;
  remain: number;
  settingDone: boolean;
  fanId: string;
  timer: number;
  nextStarName: string;
  takePhoto: boolean;
  isSessionEnd: boolean;
  message: string;
  setStartName: (nickname: string) => void;
  setFanName: (nickname: string) => void;
  setWait: (num: number) => void;
  setRemain: (num: number) => void;
  setSettingDone: (setting: boolean) => void;
  setFanId: (id: string) => void;
  setTimer: (time: number) => void;
  decrementTimer: () => void;
  setNextStarName: (nickname: string) => void;
  setTakePhoto: (take: boolean) => void;
  setIsSessionEnd: (end: boolean) => void;
  setMessage: (message: string) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  starName: "",
  fanName: "",
  wait: 200,
  remain: 200,
  settingDone: false,
  fanId: "",
  timer: 0,
  nextStarName: "",
  takePhoto: false,
  isSessionEnd: false,
  message: '스타와 연결 중이에요',
  setStartName: (nickname) => set({ starName: nickname }),
  setFanName: (nickname) => set({ fanName: nickname }),
  setWait: (num) => set({ wait: num }),
  setRemain: (num) => set({ remain: num }),
  setSettingDone: (setting) => set({ settingDone: setting }),
  setFanId: (id) => set({ fanId: id }),
  setTimer: (time: number) => set({ timer: time }),
  decrementTimer: () => set((state) => ({ timer: state.timer > 0 ? state.timer - 1 : 0 })),
  setNextStarName: (nickname) => set({ nextStarName: nickname }),
  setTakePhoto: (take) => set({ takePhoto: take }),
  setIsSessionEnd: (end) => set({ isSessionEnd: end }),
  setMessage: (message: string) => set({ message }),
}));
