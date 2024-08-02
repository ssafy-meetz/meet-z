import {create} from 'zustand'

interface sessionStore{
    myNickname: String;
    yourNickname:String;
    setMyNickname:(nickname:String)=>void,
    setYourNickname:(nickname:String)=>void
}
export const useSessionStore = create<sessionStore>((set)=>({
    myNickname:"",
    yourNickname:"",
    setMyNickname:(nickname)=>set({myNickname:nickname}),
    setYourNickname:(nickname)=>set({yourNickname:nickname})
}))