import { create } from 'zustand';
import { FanDto } from '../types/types';

interface MeetingSeetingState {
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
}

const useMeetingSettingStore = create<MeetingSeetingState>((set) => ({
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
    setMeetingName: (meetingName) => set({ meetingName }),
    setStars: (stars) => set({ stars }),
    setNewStar: (newStar) => set({ newStar }),
    setInputValue: (inputValue) => set({ inputValue }),
    setInputWidth: (inputWidth) => set({ inputWidth }),
    setIsOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
    setBlackList: (blackList) => set({ blackList }),
    setNotBlackList: (notBlackList) => set({ notBlackList }),
    setNotBlackCnt: (notBlackCnt) => set({ notBlackCnt }),
    setExcelFile: (excelFile) => set({ excelFile })
}));

export default useMeetingSettingStore;
