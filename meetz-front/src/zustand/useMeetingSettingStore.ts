import { create } from 'zustand';

interface MeetingSeetingState {
    meetingName: string;
    stars: string[];
    newStar: string;
    inputValue: string;
    inputWidth: number;
    setMeetingName: (meetingName: string) => void;
    setStars: (stars: string[]) => void;
    setNewStar: (newStar: string) => void;
    setInputValue: (inputValue: string) => void;
    setInputWidth: (inputWidth: number) => void;
}

const useMeetingSettingStore = create<MeetingSeetingState>((set) => ({
    meetingName: '',
    stars: [],
    newStar: '',
    inputValue: '',
    inputWidth: 70,
    setMeetingName: (meetingName) => set({ meetingName }),
    setStars: (stars) => set({ stars }),
    setNewStar: (newStar) => set({ newStar }),
    setInputValue: (inputValue) => set({ inputValue }),
    setInputWidth: (inputWidth) => set({ inputWidth }),
}));

export default useMeetingSettingStore;
