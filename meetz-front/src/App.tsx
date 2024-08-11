import Router from "./routes";
import Layout from "./Layout";
import { useEffect } from "react";
import clearUserData from "./lib/clearUserData";

function App() {

  const handleUnload = () => {
    const rtk = window.localStorage.getItem('rt') || '';
    // 로그아웃 API 호출
    navigator.sendBeacon(import.meta.env.VITE_API_DEPLOYED_URL + `/api/leave?token=${rtk}`);
    clearUserData();
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      clearUserData();
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
