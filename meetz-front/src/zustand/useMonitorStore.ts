import { create } from 'zustand'

interface monitorStore {
  fanId: number; // 팬 아이디 -> API 연동시 객체로 변경
  warnModalOpend: boolean;
  blackModalOpend: boolean;
  sendModalOpend: boolean;
  setFan: (id: number) => void;
  openWarnModal: () => void;
  closeWarnModal: () => void;
  openBlackModal: () => void;
  closeBlackModal: () => void;
  openMailModal: () => void;
  closeMailModal: () => void;
}
export const useMonitorStore = create<monitorStore>((set) => ({
  fanId: 0,
  warnModalOpend: false,
  blackModalOpend: false,
  sendModalOpend: false,
  setFan: (id) => set({ fanId: id }),
  openMailModal: () => set({ sendModalOpend: true }),
  closeMailModal: () => set({ sendModalOpend: false }),
  openWarnModal: () => set({ warnModalOpend: true }),
  closeWarnModal: () => set({ warnModalOpend: false }),
  openBlackModal: () => set({ blackModalOpend: true }),
  closeBlackModal: () => set({ blackModalOpend: false }),
}))
