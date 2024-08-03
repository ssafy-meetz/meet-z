import { create } from 'zustand'

interface sessionStore{
    starName:String;
    setStartName:(nickname:String)=>void
}
export const useSessionStore = create<sessionStore>((set)=>({
    starName:"",
    setStartName:(nickname)=>set({starName:nickname}),
}))