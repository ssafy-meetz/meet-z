import getFanReport from "../../../../apis/session/getFanReport";
import { useReportModal } from "../../../../zustand/useReportModal";
import Alert from "/src/assets/images/alert.png";

const ReportFanModal = () => {
  const { setOpenModal, setConfirmModal } = useReportModal();
  const confirmReport = async () => {
    //api 팬 신고
    // await getFanReport();

    setConfirmModal(true);
    setOpenModal(false);
  };
  const cancelReport = () => {
    setOpenModal(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[460px] h-[240px] flex flex-col  items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white"
      >
        <div className="flex flex-col gap-6">
          <div className="gap-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16">
              <img src={Alert} alt="alert" />
            </div>
            <div>
              <span className="text-xl font-semibold cursor-default">
                해당 팬을 신고하시겠습니까?
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <button
              className="text-xl text-white border px-5 py-1  border-[#FF4F5D] bg-[#ff4f5d] rounded-lg"
              onClick={confirmReport}
            >
              신고
            </button>
            <button
              className="text-xl text-[#FF4F5D] border px-5 py-1 border-[#FF4F5D] rounded-lg "
              onClick={cancelReport}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportFanModal;
