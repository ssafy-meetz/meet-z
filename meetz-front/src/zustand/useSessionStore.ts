import { create } from 'zustand'

interface sessionStore{
    starName:String;
    fanName:String;
    wait:Number;
    remain:Number;
    settingDone:Boolean;
    fanId:String;
    token:String;
    timer:Number;
    setStartName:(nickname:String)=>void;
    setFanName:(nickname:String)=>void;
    setWait:(num:Number)=>void;
    setRemain:(num:Number)=>void;
    setSettingDone:(setting:boolean)=>void;
    setFanId:(id:String)=>void;
    setToken:(t:String)=>void;
    setTimer:(time:Number)=>void;
}
export const useSessionStore = create<sessionStore>((set)=>({
    starName:"",
    fanName:"",
    wait:Number.MAX_VALUE,
    remain:Number.MAX_VALUE,
    settingDone:false,
    fanId:"",
    token:"",
    timer:0,
    setStartName:(nickname)=>set({starName:nickname}),
    setFanName:(nickName)=>set({fanName:nickName}),
    setWait:(num)=>set({wait:num}),
    setRemain:(num)=>set({remain:num}),
    setSettingDone:(setting)=>set({settingDone:setting}),
    setFanId:(id)=>set({fanId:id}),
    setToken:(t)=>set({token:t}),
    setTimer:(time)=>set({timer:time})

}))