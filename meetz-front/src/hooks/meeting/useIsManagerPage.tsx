import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * 현재 접속 경로가 end 또는 monitor 페이지인지 여부
 * 
 * @returns {boolean}
 */
const useIsManagerPage = () => {
    const [isManagerPage, setIsManagerPage] = useState(false);
    const { pathname } = useLocation();
    if (pathname.includes('end') || pathname.includes('monitor') || pathname.includes('create') || pathname.includes('modify')) {
        setIsManagerPage(true);
    } else {
        setIsManagerPage(false)
    };
    return { isManagerPage };
};

export default useIsManagerPage;