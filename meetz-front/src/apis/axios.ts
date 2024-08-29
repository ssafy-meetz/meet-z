import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_NOW_BASEURL === 'local' ? import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_DEPLOYED_URL,
  timeout: 30000, // 30초 이상 응답 없으면 요청 취소
  headers: {
    'Content-Type': 'application/json',
  }
})

export default instance;