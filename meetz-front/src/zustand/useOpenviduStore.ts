import { create } from "zustand";
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from "openvidu-browser";


interface OpenviduState {
    session: OVSession | null;
    subscriber: Subscriber | null;
    publisher: Publisher | null;
    OV: OpenVidu | null;
    sessionId: string;
    exSession: OVSession | null;
    setSession: (session: OVSession | null) => void;
    setSubscriber: (subscriber: Subscriber | null) => void;
    setPublisher: (publisher: Publisher | null) => void;
    setOV: (ov: OpenVidu | null) => void;
    setSessionId: (sessionId: string) => void;
    setExSession: (exSession: OVSession | null) => void;
  }
  
  const useOpenviduStore = create<OpenviduState>((set) => ({
    session: null,
    subscriber: null,
    publisher: null,
    OV: null,
    sessionId: "",
    exSession: null,
    setSession: (session) => set({ session }),
    setSubscriber: (subscriber) => set({ subscriber }),
    setPublisher: (publisher) => set({ publisher }),
    setOV: (OV) => set({ OV }),
    setSessionId: (sessionId) => set({ sessionId }),
    setExSession: (exSession) => set({ exSession }),
  }));
  
  export default useOpenviduStore;