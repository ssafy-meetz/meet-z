import { useState } from "react";
import FanSettingPage from "./setting/pages/FanSettingPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import { useSessionStore } from "../../zustand/useSessionStore";
import StarSessionPage from "./session/pages/StarSessionPage";
import FanSessionPage from "./session/pages/FanSessionPage";


const SessionContainerPage = () =>{
    
    // const storedRole:String|null = window.sessionStorage.getItem('rl');
    const storedRole:String|null = "FAN";
    const storedMeetingId:String|null = window.sessionStorage.getItem('mi');
    const {wait,fanId,remain,settingDone,setWait,setFanId,setRemain,setSettingDone} = useSessionStore();
    //SSE 연결
    
    if(storedRole==="STAR"){
        if(settingDone){
            return <StarSessionPage />
        }
        if(remain===0){
            return <SessionSwitchPage />
        }
        // return <StarLoadingPage />
        return <StarSessionPage />

    }
    
    if(storedRole==="FAN"){
        if(wait===0&&settingDone){
            return <FanSessionPage />
        }
        if(remain===0){
            return <SessionSwitchPage />
        }
        // return <FanSettingPage />
        return <FanSessionPage />
    }
    

}
export default SessionContainerPage