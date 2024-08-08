import { create } from 'zustand';
import { BlacklistDto } from '../types/types';

interface BlackStoreState {
  isDeleteModalOpen: boolean; // 삭제 확인 모달 상태
  isDeletedModalOpen: boolean; // 삭제 완료 모달 상태
  isDelete: boolean;
  selectedBlacklistId: number | undefined; // 선택된 블랙리스트 ID
  blacklist: BlacklistDto[]; // 블랙리스트 상태
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openDeletedModal: () => void;
  closeDeletedModal: () => void;
  setIsDelete: (value: boolean) => void;
  setSelectedBlacklistId: (id: number | undefined) => void;
  setBlacklist: (blacklist: BlacklistDto[]) => void; // 블랙리스트 상태 설정 함수
  updateBlacklist: (id: number) => void; // 블랙리스트 업데이트 함수
}

export const useBlackStore = create<BlackStoreState>((set) => ({
  isDeleteModalOpen: false,
  isDeletedModalOpen: false,
  isDelete: false,
  selectedBlacklistId: undefined,
  blacklist: [], // 초기 블랙리스트 상태

  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  openDeletedModal: () => set({ isDeletedModalOpen: true }),
  closeDeletedModal: () => set({ isDeletedModalOpen: false }),
  setIsDelete: (value: boolean) => set({ isDelete: value }),
  setSelectedBlacklistId: (id: number | undefined) => set({ selectedBlacklistId: id }),
  setBlacklist: (blacklist: BlacklistDto[]) => set({ blacklist }), // 블랙리스트 상태 설정 함수
  updateBlacklist: (id: number) => set((state) => ({
    blacklist: state.blacklist.filter((item) => item.blacklistId !== id)
  })),
}));
