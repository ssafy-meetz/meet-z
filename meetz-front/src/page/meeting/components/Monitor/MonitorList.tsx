import { ReportsDto } from "../../../../types/types"
import Accordion from "../Accordion"

const MonitorList = ({ reports }: { reports: ReportsDto[] | null }) => {
  console.log(reports)

  if (reports?.length === 0) {

    return (
      <div className="flex justify-center items-center h-36">
        <span className="text-xl font-semibold">신고 내역이 없습니다.</span>
      </div>
    )
  }

  return (
    <main className='py-7 pb-72'>
      <div className='justify-center items-center '>
        {reports && reports.map((report, idx) => {
          return (<Accordion title={`${idx}번 팬 - ${report.reportedUserName}`} />)
        })}

      </div>
    </main>
  )
}

export default MonitorList