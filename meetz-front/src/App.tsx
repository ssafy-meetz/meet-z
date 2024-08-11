import Router from "./routes";
import Layout from "./Layout";
import { useEffect } from "react";
import clearUserData from "./lib/clearUserData";

function App() {

  const handleUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();

    // 로그아웃 로직은 이 메시지 확인 후 자동으로 처리됩니다.
    const rtk = window.localStorage.getItem('rt') || '';
    navigator.sendBeacon(import.meta.env.VITE_API_DEPLOYED_URL + `/api/leave?token=${rtk}`);
    clearUserData();
    localStorage.clear();

    return event;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      localStorage.clear();
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
