import { create } from 'zustand'
import { ChatDto, ChatFanDto } from '../types/types';

interface ManagerChatStore {
  fanList: ChatFanDto[];
  selectedFan: ChatFanDto | null; // Initially null
  inputMessage: string;
  chatHistory: ChatDto[];
  setFanList: (fanList: ChatFanDto[]) => void;
  setSelectedFan: (fan: ChatFanDto) => void;
  setInputMessage: (ipt: string) => void;
  setChatHistory: (chatHistory: ChatDto[]) => void;
}

export const useManagerChatStore = create<ManagerChatStore>((set) => ({
  fanList: [],
  selectedFan: null,
  inputMessage: "",
  chatHistory: [],
  setFanList: (fanList: ChatFanDto[]) => set({ fanList }),
  setSelectedFan: (fan: ChatFanDto) => set({ selectedFan: fan }),
  setInputMessage: (ipt: string) => set({ inputMessage: ipt }),
  setChatHistory: (chatHistory: ChatDto[]) => set({ chatHistory })
}));
