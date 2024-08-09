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
