import { create } from "zustand";

interface sessionStore {
  starName: string;
  fanName: string;
  wait: number;
  remain: number;
  settingDone: Boolean;
  fanId: string;
  timer: number;
  nextStarName: string;
  takePhoto: boolean;
  isSessionEnd:boolean;
  setStartName: (nickname: string) => void;
  setFanName: (nickname: string) => void;
  setWait: (num: number) => void;
  setRemain: (num: number) => void;
  setSettingDone: (setting: boolean) => void;
  setFanId: (id: string) => void;
  setTimer: (time: number) => void;
  setNextStarName: (nickname: string) => void;
  setTakePhoto: (take: boolean) => void;
  setIsSessionEnd:(end:boolean) =>void;
}
export const useSessionStore = create<sessionStore>((set) => ({
  starName: "",
  fanName: "",
  wait: 200,
  remain: 200,
  settingDone: false,
  fanId: "",
  timer: 0,
  nextStarName: "",
  takePhoto: false,
  isSessionEnd:false,
  setStartName: (nickname) => set({ starName: nickname }),
  setFanName: (nickName) => set({ fanName: nickName }),
  setWait: (num) => set({ wait: num }),
  setRemain: (num) => set({ remain: num }),
  setSettingDone: (setting) => set({ settingDone: setting }),
  setFanId: (id) => set({ fanId: id }),
  setTimer: (time) => set({ timer: time }),
  setNextStarName: (nickname) => set({ nextStarName: nickname }),
  setTakePhoto: (take) => set({ takePhoto: take }),
  setIsSessionEnd:(end)=>set({isSessionEnd:end})
}));
