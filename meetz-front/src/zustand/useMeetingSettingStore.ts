import { create } from 'zustand';

interface MeetingSeetingState {
    meetingName: string;
    stars: string[];
    newStar: string;
    inputValue: string;
    inputWidth: number;
    isOpenModal: boolean;
    setMeetingName: (meetingName: string) => void;
    setStars: (stars: string[]) => void;
    setNewStar: (newStar: string) => void;
    setInputValue: (inputValue: string) => void;
    setInputWidth: (inputWidth: number) => void;
    setIsOpenModal: () => void;
}

const useMeetingSettingStore = create<MeetingSeetingState>((set) => ({
    meetingName: '',
    stars: [],
    newStar: '',
    inputValue: '',
    inputWidth: 70,
    isOpenModal: false,
    setMeetingName: (meetingName) => set({ meetingName }),
    setStars: (stars) => set({ stars }),
    setNewStar: (newStar) => set({ newStar }),
    setInputValue: (inputValue) => set({ inputValue }),
    setInputWidth: (inputWidth) => set({ inputWidth }),
    setIsOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal }))
}));

export default useMeetingSettingStore;
