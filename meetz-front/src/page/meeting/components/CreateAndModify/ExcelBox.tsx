import { useEffect, useRef, useState } from "react";
import { FaFileExcel, FaRegCircleCheck } from "react-icons/fa6";
import Loading from "../../../../common/Loading";
import sendExcelFile from "../../../../apis/meeting/sendExcelFile";
import { useUserStore } from "../../../../zustand/useUserStore";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const ExcelBox = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useUserStore();
  const { excelFile, blackList, notBlackList, setBlackList, setNotBlackList, setNotBlackCnt, setExcelFile } = useMeetingSettingStore();

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

    loadingHandler(1000);
    setExcelFile(files[0]);
  };

  const clearFileHandler = () => {
    setExcelFile(null);
    setNotBlackList([]);
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

  const loadCleanFanList = async () => {
    if (!excelFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    // 엑셀 파일 전송 API 연결
    try {
      const { BlackList, NotBlackList, cnt } = await sendExcelFile(formData, accessToken);
      setBlackList(BlackList);
      setNotBlackList(NotBlackList);
      setNotBlackCnt(cnt);
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
  }

  useEffect(() => {
    if (!notBlackList || notBlackList === null || !blackList || blackList === null) {
      loadCleanFanList();
    } else {
      setExcelFile(excelFile);
      loadCleanFanList();
    }
  }, [excelFile]);

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
      <div className="flex gap-3 justify-center mb-14">
        <button onClick={clearFileHandler} className={`text-[#ff4f5d] bg-white w-72 py-3 border border-[#ff4f5d] rounded-xl mb-6 ${excelFile ? '' : 'hidden'}`}>초기화</button>
      </div>
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
