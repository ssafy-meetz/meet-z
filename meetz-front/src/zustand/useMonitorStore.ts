import { create } from 'zustand'

interface monitorStore {
  fanId: number; // 팬 아이디 -> API 연동시 객체로 변경
  warnModalOpend: boolean;
  blackModalOpend: boolean;
  setFan: (id: number) => void;
  openWarnModal: () => void;
  closeWarnModal: () => void;
  openBlackModal: () => void;
  closeBlackModal: () => void;
}
export const useMonitorStore = create<monitorStore>((set) => ({
  fanId: 0,
  warnModalOpend: false,
  blackModalOpend: false,
  setFan: (id) => set({ fanId: id }),
  openWarnModal: () => set({ warnModalOpend: true }),
  closeWarnModal: () => set({ warnModalOpend: false }),
  openBlackModal: () => set({ blackModalOpend: true }),
  closeBlackModal: () => set({ blackModalOpend: false }),
}))
