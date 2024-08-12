import Router from "./routes";
import Layout from "./Layout";
import { useEffect } from "react";
import clearUserData from "./lib/clearUserData";
import { useNavigate } from "react-router-dom";

function App() {

  const handleUnload = (event: BeforeUnloadEvent) => {
    // 사용자에게 경고 메시지를 띄우도록 설정
    event.preventDefault();

    // 여기서 로그아웃 API를 호출하지 않고, 사용자가 정말로 페이지를 떠날 때만 로그아웃을 진행합니다.
    return event;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // 페이지를 떠날 때 로그아웃 로직을 실행
  useEffect(() => {
    const unloadHandler = () => {
      const rtk = window.localStorage.getItem('rt') || '';
      navigator.sendBeacon(import.meta.env.VITE_API_DEPLOYED_URL + `/api/leave?token=${rtk}`);
      clearUserData();
      localStorage.clear();
    };

    // 실제 unload 시점에 로그아웃 로직 실행
    window.addEventListener('unload', unloadHandler);

    return () => {
      window.removeEventListener('unload', unloadHandler);
    };
  }, []);

  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
