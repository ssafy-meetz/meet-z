import { create } from 'zustand'
import { ChatFanDto } from '../types/types';

interface ManagerChatStore {
  fanList: ChatFanDto[];
  selectedFan: ChatFanDto | null; // Initially null
  setFanList: (fanList: ChatFanDto[]) => void;
  setSelectedFan: (fan: ChatFanDto) => void;
}

export const useManagerChatStore = create<ManagerChatStore>((set) => ({
  fanList: [],
  selectedFan: null,
  setFanList: (fanList: ChatFanDto[]) => set({ fanList }),
  setSelectedFan: (fan: ChatFanDto) => set({ selectedFan: fan })
}));
