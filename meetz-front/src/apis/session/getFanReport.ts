import fetchUserData from "../../lib/fetchUserData";
import { useSessionStore } from "../../zustand/useSessionStore";

import instance from "../axios";
const getFanReport = async() => {
    const fanId = useSessionStore();
    const {accessToken} = fetchUserData();
    try{
        const{data,status}=await instance.post(`api/meeting/report/${fanId}`,{
            'Authorization' : `Bearer ${accessToken}`
        })
        if(status===200){
            return data;
        }
    }catch(error:any){
        console.error(error);
    }

}
export default  getFanReport;