import { create } from 'zustand';
import { FanDto } from '../types/types';

interface MeetingSettingState {
    meetingName: string;
    stars: string[];
    newStar: string;
    inputValue: string;
    inputWidth: number;
    isOpenModal: boolean;
    blackList: FanDto[];
    notBlackList: FanDto[];
    notBlackCnt: number;
    excelFile: File | null;
    tempNotBlackList: FanDto[];
    setMeetingName: (meetingName: string) => void;
    setStars: (stars: string[]) => void;
    setNewStar: (newStar: string) => void;
    setInputValue: (inputValue: string) => void;
    setInputWidth: (inputWidth: number) => void;
    setIsOpenModal: () => void;
    setBlackList: (blackList: FanDto[]) => void;
    setNotBlackList: (notBlackList: FanDto[]) => void;
    setNotBlackCnt: (notBlackCnt: number) => void;
    setExcelFile: (excelFile: File | null) => void;
    setTempNotBlackList: (tempNotBlackList: FanDto[]) => void;
    resetTempNotBlackList: () => void;
    saveNotBlackList: () => void;
    resetStore: () => void;
}

const useMeetingSettingStore = create<MeetingSettingState>((set) => ({
    meetingName: '',
    stars: [],
    newStar: '',
    inputValue: '',
    inputWidth: 70,
    isOpenModal: false,
    blackList: [],
    notBlackList: [],
    notBlackCnt: 0,
    excelFile: null,
    tempNotBlackList: [],
    setMeetingName: (meetingName) => set({ meetingName }),
    setStars: (stars) => set({ stars }),
    setNewStar: (newStar) => set({ newStar }),
    setInputValue: (inputValue) => set({ inputValue }),
    setInputWidth: (inputWidth) => set({ inputWidth }),
    setIsOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
    setBlackList: (blackList) => set({ blackList }),
    setNotBlackList: (notBlackList) => set({ notBlackList }),
    setNotBlackCnt: (notBlackCnt) => set({ notBlackCnt }),
    setExcelFile: (excelFile) => set({ excelFile }),
    setTempNotBlackList: (tempNotBlackList) => set({ tempNotBlackList }),
    resetTempNotBlackList: () => set({ tempNotBlackList: [] }),
    saveNotBlackList: () => set((state) => ({ notBlackList: state.tempNotBlackList })),
    resetStore: () => set({
        meetingName: '',
        stars: [],
        newStar: '',
        inputValue: '',
        inputWidth: 70,
        isOpenModal: false,
        blackList: [],
        notBlackList: [],
        notBlackCnt: 0,
        excelFile: null,
        tempNotBlackList: [],
    }),
}));

export default useMeetingSettingStore;
