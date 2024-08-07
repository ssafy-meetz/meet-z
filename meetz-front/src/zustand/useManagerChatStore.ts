import { create } from 'zustand';
import { messageDto, ChatFanDto } from '../types/types';

interface ManagerChatStore {
  fanList: ChatFanDto[];
  selectedFan: ChatFanDto | null; // Initially null
  inputMessage: string;
  chatHistory: messageDto[];
  chatRoomId: number;
  managerId: number;
  setManagerId: (managerId: number) => void;
  setChatRoomId: (chatRoomId: number) => void;
  setFanList: (fanList: ChatFanDto[]) => void;
  setSelectedFan: (fan: ChatFanDto) => void;
  setInputMessage: (ipt: string) => void;
  setChatHistory: (chatHistory: messageDto[]) => void;
  addChatMessage: (message: messageDto) => void; // 새로운 메시지를 추가하는 함수
}

export const useManagerChatStore = create<ManagerChatStore>((set) => ({
  fanList: [],
  selectedFan: null,
  inputMessage: "",
  chatHistory: [],
  chatRoomId: 0,
  managerId: 0,
  setManagerId: (managerId: number) => set({ managerId }),
  setChatRoomId: (chatRoomId: number) => set({ chatRoomId }),
  setFanList: (fanList: ChatFanDto[]) => set({ fanList }),
  setSelectedFan: (fan: ChatFanDto) => set({ selectedFan: fan }),
  setInputMessage: (ipt: string) => set({ inputMessage: ipt }),
  setChatHistory: (chatHistory: messageDto[]) => set({ chatHistory }),
  addChatMessage: (message: messageDto) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
}));
