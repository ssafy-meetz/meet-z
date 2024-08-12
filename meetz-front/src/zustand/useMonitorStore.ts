import { create } from 'zustand'
import { ReportDetailDto } from '../types/types';

interface monitorStore {
  reportedUserId: number; // 팬 아이디 -> API 연동시 객체로 변경
  reportDetail: ReportDetailDto | null;
  warnModalOpend: boolean;
  blackModalOpend: boolean;
  selectedOption: string;
  inputText: string;
  setInputText: (text: string) => void;
  setSelectedOption: (val: string) => void;
  setReportedUserId: (id: number) => void;
  setReportDetail: (data: ReportDetailDto) => void;
  openWarnModal: () => void;
  closeWarnModal: () => void;
  openBlackModal: () => void;
  closeBlackModal: () => void;
}
export const useMonitorStore = create<monitorStore>((set) => ({
  reportedUserId: 0,
  reportDetail: null,
  warnModalOpend: false,
  blackModalOpend: false,
  selectedOption: "",
  inputText: "",
  setInputText: (text) => set({ inputText: text }),
  setSelectedOption: (val) => set({ selectedOption: val }),
  setReportedUserId: (id) => set({ reportedUserId: id }),
  setReportDetail: (data) => set({ reportDetail: data }),
  openWarnModal: () => set({ warnModalOpend: true }),
  closeWarnModal: () => set({ warnModalOpend: false }),
  openBlackModal: () => set({ blackModalOpend: true }),
  closeBlackModal: () => set({ blackModalOpend: false }),
}))
