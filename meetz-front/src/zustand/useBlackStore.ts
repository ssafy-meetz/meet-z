// src/zustand/useBlackStore.ts
import { create } from 'zustand';

interface BlackStoreState {
  isDeleteModalOpen: boolean; // 삭제 확인 모달 상태
  isDeletedModalOpen: boolean; // 삭제 완료 모달 상태
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openDeletedModal: () => void;
  closeDeletedModal: () => void;
}

export const useBlackStore = create<BlackStoreState>((set) => ({
  isDeleteModalOpen: false,
  isDeletedModalOpen: false,

  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  openDeletedModal: () => set({ isDeletedModalOpen: true }),
  closeDeletedModal: () => set({ isDeletedModalOpen: false }),
}));
