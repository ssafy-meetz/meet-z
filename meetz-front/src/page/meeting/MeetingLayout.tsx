import { Outlet } from "react-router-dom"
import Header from "../../common/ui/Header"
import Footer from "../../common/ui/Footer"

const MeetingLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MeetingLayout