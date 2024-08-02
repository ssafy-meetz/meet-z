import { useRef, useState } from "react";
import { FaFileExcel, FaRegCircleCheck } from "react-icons/fa6";
import Loading from "../../../../common/Loading";
import sendExcelFile from "../../../../apis/meeting/sendExcelFile";
import { useUserStore } from "../../../../zustand/useUserStore";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";
import ShowBlackList from "./ShowBlackList";
import NoBlackList from "./NoBlackList";

const ExcelBox = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckBlackList, setShowCheckBlackList] = useState(false);
  const { accessToken } = useUserStore();
  const { excelFile, setExcelFile, setTempNotBlackList, setNotBlackCnt, setBlackList, blackList } = useMeetingSettingStore();

  const attachExcelFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const loadingHandler = (time: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, time);
  };

  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }

    const file = files[0];
    setExcelFile(file);
    loadingHandler(1000);
    loadCleanFanList(file);
  };

  const clearFileHandler = () => {
    setExcelFile(null);
    setTempNotBlackList([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const truncateFileName = (name: string) => {
    return name.length > 7 ? name.substring(0, 15) + '..' : name;
  };

  const formatFileSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const loadCleanFanList = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { NotBlackList, cnt, BlackList } = await sendExcelFile(formData, accessToken);
      setTempNotBlackList(NotBlackList);
      setNotBlackCnt(cnt);
      setBlackList(BlackList);
      setShowCheckBlackList(true);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        const eMsg = error.response.data.message;
        alert(eMsg);
        return;
      }
    }
  };

  return (
    <>
      <div
        onClick={attachExcelFile}
        className="group border-dashed border-2 h-[160px] border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center mb-6 hover:border-red-500 transition duration-100 cursor-pointer"
      >
        {isLoading ? (
          <div className="h-12 flex justify-center items-center">
            <Loading width={48} height={48} />
          </div>
        ) : (
          <>
            <button className={`text-5xl mb-4 group-hover:text-[#ff4f5d] transition duration-100 ${excelFile ? 'text-[#ff4f5d]' : 'text-gray-300'}`}>
              {!excelFile || excelFile === null ? <FaFileExcel /> : <FaRegCircleCheck />}
            </button>
            <span className="text-lg">
              {excelFile ? `${truncateFileName(excelFile.name)} ${formatFileSize(excelFile.size)}` : '클릭하거나 엑셀 파일을 드래그하여 첨부 하세요.'}
            </span>
          </>
        )}
      </div>
      <div className="flex gap-3 justify-center mb-6">
        <button onClick={clearFileHandler} className={`text-[#ff4f5d] bg-white w-72 py-3 border border-[#ff4f5d] rounded-xl mb-6 ${excelFile ? '' : 'hidden'}`}>초기화</button>
      </div>
      {showCheckBlackList ? <ShowBlackList blackList={blackList} /> : <NoBlackList />}
      <input
        onChange={fileChangeHandler}
        type="file"
        ref={inputRef}
        accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
      />
    </>
  );
};

export default ExcelBox;
