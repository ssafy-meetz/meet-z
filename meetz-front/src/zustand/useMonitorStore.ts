import { create } from 'zustand'

interface monitorStore {
  fanId: number; // 팬 아이디 -> API 연동시 객체로 변경
  warnModalOpend: boolean;
  setFan: (id: number) => void;
  openWarnModal: () => void;
  closeWarnModal: () => void;
}
export const useMonitorStore = create<monitorStore>((set) => ({
  fanId: 0,
  warnModalOpend: false,
  setFan: (id) => set({ fanId: id }),
  openWarnModal: () => set({ warnModalOpend: true }),
  closeWarnModal: () => set({ warnModalOpend: false })
}))
