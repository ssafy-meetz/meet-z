import { useLocation, useNavigate } from "react-router-dom";
import FanSessionContainerPage from "./FanSessionContainerPage";
import StarSessionContainerPage from "./StarSessionContainerPage";
import { useEffect } from "react";
import useCheckAuth from "../../hooks/meeting/useCheckAuth";
const SessionContainerPage = () => {
  const { pathname } = useLocation();

  const storedRole: String | null = window.sessionStorage.getItem("rl");
  //여기서 useCheckAuth는 StarSessionContainerPage와 FanSessionContainerPage에 각각 권한에 맞게 선언되어 있음.

  useCheckAuth();

  useEffect(() => {
    console.log(pathname)
    localStorage.setItem('path', pathname);
  }, [])

  // useEffect(() => {
  //   if (!storedRole || storedRole === '') {
  //     navigate('/')
  //   }
  // }, [storedRole])

  if (storedRole === "STAR") {
    return <StarSessionContainerPage />;
  }
  if (storedRole === "FAN") {
    return <FanSessionContainerPage />;
  }

};
export default SessionContainerPage;
