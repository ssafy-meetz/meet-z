import { create } from 'zustand'
import { ReportDetailDto } from '../types/types';

interface monitorStore {
  reportedUserId: number; // 팬 아이디 -> API 연동시 객체로 변경
  reportDetail: ReportDetailDto | null;
  warnModalOpend: boolean;
  blackModalOpend: boolean;
  selectedOption: string;
  inputText: string;
  blackCompleteModalOpened: boolean;
  warnCompleteModalOpened: boolean;
  alreadyWarnedModalOpened: boolean;
  warnedErrorMsg: string;
  setWarnedErrorMsg: (msg: string) => void;
  openAlreadyWarnedModalOpened: () => void;
  closeAlreadyWarnedModalOpened: () => void;
  openBlackCompleteModalOpened: () => void;
  closeBlackCompleteModalOpened: () => void;
  openWarnCompleteModalOpened: () => void;
  closeWarnCompleteModalOpened: () => void;
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
  blackCompleteModalOpened: false,
  warnCompleteModalOpened: false,
  alreadyWarnedModalOpened: false,
  warnedErrorMsg: "",
  setWarnedErrorMsg: (msg) => set({ warnedErrorMsg: msg }),
  openAlreadyWarnedModalOpened: () => set({ alreadyWarnedModalOpened: true }),
  closeAlreadyWarnedModalOpened: () => set({ alreadyWarnedModalOpened: false }),
  openWarnCompleteModalOpened: () => set({ warnCompleteModalOpened: true }),
  closeWarnCompleteModalOpened: () => set({ warnCompleteModalOpened: false }),
  openBlackCompleteModalOpened: () => set({ blackCompleteModalOpened: true }),
  closeBlackCompleteModalOpened: () => set({ blackCompleteModalOpened: false }),
  setInputText: (text) => set({ inputText: text }),
  setSelectedOption: (val) => set({ selectedOption: val }),
  setReportedUserId: (id) => set({ reportedUserId: id }),
  setReportDetail: (data) => set({ reportDetail: data }),
  openWarnModal: () => set({ warnModalOpend: true }),
  closeWarnModal: () => set({ warnModalOpend: false }),
  openBlackModal: () => set({ blackModalOpend: true }),
  closeBlackModal: () => set({ blackModalOpend: false }),
}))
