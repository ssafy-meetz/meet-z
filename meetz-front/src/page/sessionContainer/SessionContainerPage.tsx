import { useEffect, useState } from "react";
import FanSettingPage from "./setting/pages/FanSettingPage";
import StarLoadingPage from "./setting/pages/StarLoadingPage";
import SessionSwitchPage from "./session/pages/SessionSwitchPage";
import { useSessionStore } from "../../zustand/useSessionStore";
import StarSessionPage from "./session/pages/StarSessionPage";
import FanSessionPage from "./session/pages/FanSessionPage";
import { EventSourcePolyfill } from "event-source-polyfill";
import fetchUserData from "../../lib/fetchUserData";
import { useOpenvidu } from "../../hooks/session/useOpenvidu";
import { parse } from "path";
import FanSessionContainerPage from "./FanSessionContainerPage";
import StarSessionContainerPage from "./StarSessionContainerPage";
const SessionContainerPage = () => {
  const storedRole: String | null = window.sessionStorage.getItem("rl");
  if (storedRole === "STAR") {
    return <StarSessionContainerPage />;
  }
  if (storedRole === "FAN") {
    return <FanSessionContainerPage />;
  }
};
export default SessionContainerPage;
