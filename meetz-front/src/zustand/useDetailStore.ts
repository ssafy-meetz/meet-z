import { create } from 'zustand'

interface DetailStore {
    sendModalOpend: boolean;
    modalStep: number;
    setModalStep: (step: number) => void;
    openMailModal: () => void;
    closeMailModal: () => void;
}
export const useDetailstore = create<DetailStore>((set) => ({
    sendModalOpend: false,
    modalStep: 0,
    setModalStep: (step) => set({ modalStep: step }),
    openMailModal: () => set({ sendModalOpend: true }),
    closeMailModal: () => set({ sendModalOpend: false }),
}))
