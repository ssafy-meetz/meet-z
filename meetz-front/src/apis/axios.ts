import axios from "axios";

const instance = axios.create({
    // 추후 수정 : 로컬/서버의 API 주소 여부(.env)에 따라 동적 설정
    baseURL: process.env.VITE_API_BASE_URL ? '' : '',
    timeout: 10000, // 10초 이상 응답 없으면 요청 취소
})

export default instance;