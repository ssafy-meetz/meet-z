import { create } from 'zustand'

interface DetailStore {
  isDeleteModalOpen: boolean;
  isDeletedModalOpen: boolean;
  sendModalOpend: boolean;
  modalStep: number;
  setModalStep: (step: number) => void;
  openMailModal: () => void;
  closeMailModal: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openDeletedModal: () => void;
  closeDeletedModal: () => void;


  resetModals: () => void;
}

export const useDetailstore = create<DetailStore>((set) => ({
  isDeleteModalOpen: false,
  isDeletedModalOpen: false,
  sendModalOpend: false,
  modalStep: 0,

  setModalStep: (step) => set({ modalStep: step }),
  openMailModal: () => set({ sendModalOpend: true }),
  closeMailModal: () => set({ sendModalOpend: false }),

  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  openDeletedModal: () => set({ isDeletedModalOpen: true }),
  closeDeletedModal: () => set({ isDeletedModalOpen: false }),

  // resetModals 함수 구현
  resetModals: () =>
    set({
      isDeleteModalOpen: false,
      isDeletedModalOpen: false,
      sendModalOpend: false,
      modalStep: 0,
    }),
}));