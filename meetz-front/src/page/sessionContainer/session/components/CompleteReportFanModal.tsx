import { useReportModal } from "../../../../zustand/useReportModal";
import { useSessionStore } from "../../../../zustand/useSessionStore";

const CompleteReportFanModal = () => {
  const { fanName } = useSessionStore();
  const { setConfirmModal } = useReportModal();
  const closeModal = () => {
    setConfirmModal(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[460px] h-[240px] flex flex-col  items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white"
      >
        <div className="flex flex-col">
          <div className="gap-1 flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold cursor-default">{fanName}</p>
            <span className="text-2xl font-bold cursor-default">
              신고가 완료되었습니다.
            </span>
          </div>
          <div className="flex justify-center mt-7">
            <button
              onClick={closeModal}
              className="text-xl text-white bg-[#ff4f5d] border px-5 py-1 border-[#FF4F5D] rounded-lg "
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompleteReportFanModal;
