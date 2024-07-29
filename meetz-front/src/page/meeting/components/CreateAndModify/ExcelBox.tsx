import { useRef, useState } from "react";
import { FaFileExcel, FaRegCircleCheck } from "react-icons/fa6";
import Loading from "../../../../common/Loading";

const ExcelBox = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      loadingHandler(1500);
      setSelectedFile(files[0]);
    }
  };

  const FileUploadHandler = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    // 엑셀 파일 전송 API 연결
  };

  const clearFileHandler = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const truncateFileName = (name: string) => {
    return name.length > 7 ? name.substring(0, 7) + '..' : name;
  };

  const formatFileSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
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
            <button className="text-gray-300 text-5xl mb-4 group-hover:text-[#ff4f5d] transition duration-100">
              {!selectedFile || selectedFile === null ? <FaFileExcel /> : <FaRegCircleCheck />}
            </button>
            <span className="text-lg">
              {selectedFile ? `${truncateFileName(selectedFile.name)} ${formatFileSize(selectedFile.size)}` : '클릭하거나 엑셀 파일을 드래그하여 첨부 하세요.'}
            </span>
          </>
        )}
      </div>
      <div className="flex gap-3 justify-center mb-14">
        <button onClick={FileUploadHandler} className="bg-[#ff4f5d] text-white w-72 py-3 rounded-xl mb-6">블랙리스트 체크</button>
        <button onClick={clearFileHandler} className="text-[#ff4f5d] bg-white w-72 py-3 border border-[#ff4f5d] rounded-xl mb-6">초기화</button>
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
