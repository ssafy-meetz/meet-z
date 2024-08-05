import { useState } from "react";
import FanSettingPage from "./setting/pages/FanSettingPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import SessionPage from "./session/pages/SessionPage";
import { useSessionStore } from "../../zustand/useSessionStore";

const SessionContainerPage = () =>{
    
    const storedRole:String|null = window.sessionStorage.getItem('rl');
    const storedMeetingId:String|null = window.sessionStorage.getItem('mi');
    const {wait,fanId,remain,settingDone,setWait,setFanId,setRemain,setSettingDone} = useSessionStore();
    //SSE 연결
    
    if(storedRole==="STAR"){
        if(settingDone){
            return <SessionPage />
        }
        if(remain===0){
            return <SessionSwitchPage />
        }
        
        return <StarLoadingPage />

    }
    
    if(storedRole==="FAN"){
        if(wait===0&&settingDone){
            return <SessionPage />
        }
        if(remain===0){
            return <SessionSwitchPage />
        }
        return <FanSettingPage />
    }
    

}
export default SessionContainerPage