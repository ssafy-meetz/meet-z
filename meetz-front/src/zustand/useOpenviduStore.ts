import create from "zustand";
import { OpenVidu, Session as OVSession, Publisher, Subscriber } from "openvidu-browser";

interface OpenviduStore {
    session: OVSession | null;
    subscriber: Subscriber | null;
    publisher: Publisher | null;
    sessionId:string|"";
    OV: OpenVidu | null;
    setSession: (session: OVSession | null) => void;
    setSubscriber: (subscriber: Subscriber | null) => void;
    setPublisher: (publisher: Publisher | null) => void;
    setSessionId:(sessionId:string|"")=>void;
    setOV: (OV: OpenVidu | null) => void;
}

const useOpenviduStore = create<OpenviduStore>((set) => ({
    session: null,
    subscriber: null,
    publisher: null,
    sessionId:"",
    OV: null,
    setSession: (session: OVSession | null) => set({ session }),
    setSubscriber: (subscriber: Subscriber | null) => set({ subscriber }),
    setPublisher: (publisher: Publisher | null) => set({ publisher }),
    setSessionId:(sessionId:string|"")=>set({sessionId}),
    setOV: (OV: OpenVidu | null) => set({ OV }),
}));

export default useOpenviduStore;