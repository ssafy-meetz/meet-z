import { create } from 'zustand';

interface EnvSettingState {
  currentStep: number;
  isChattingBoxVisible: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  beforeStep: () => void;
  toggleChattingBox: () => void;
}

const useEnvSettingStore = create<EnvSettingState>((set) => ({
  currentStep: 1,
  isChattingBoxVisible: false,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  beforeStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  toggleChattingBox: () => set((state) => ({ isChattingBoxVisible: !state.isChattingBoxVisible })),
}));

export default useEnvSettingStore;
