import { useRef, useState } from 'react';
import { FaFileExcel, FaRegCircleCheck } from 'react-icons/fa6';
import Loading from '../../../../common/Loading';
import sendExcelFile from '../../../../apis/meeting/sendExcelFile';
import useMeetingSettingStore from '../../../../zustand/useMeetingSettingStore';
import ShowBlackList from './ShowBlackList';
import NoBlackList from './NoBlackList';
import fetchUserData from '../../../../lib/fetchUserData';

const ExcelBox = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckBlackList, setShowCheckBlackList] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false); // 드래그 상태 관리
  const { accessToken } = fetchUserData();
  const {
    excelFile,
    setExcelFile,
    setTempNotBlackList,
    setNotBlackCnt,
    setBlackList,
    blackList,
  } = useMeetingSettingStore();

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

  const fileChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const files =
      event.type === 'drop'
        ? (event as React.DragEvent<HTMLDivElement>).dataTransfer.files
        : (event as React.ChangeEvent<HTMLInputElement>).target.files;

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
    setBlackList([]);
    setTempNotBlackList([]);
    if (inputRef.current) {
      inputRef.current.value = ''; // 이 부분이 중요
      inputRef.current.type = 'text'; // input 타입을 잠시 다른 값으로 변경했다가
      inputRef.current.type = 'file'; // 다시 file로 바꿔주기
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
    formData.append('file', file);

    try {
      const { NotBlackList, cnt, BlackList } = await sendExcelFile(
        formData,
        accessToken || ''
      );
      setTempNotBlackList(NotBlackList);
      setNotBlackCnt(cnt);
      setBlackList(BlackList);
      setShowCheckBlackList(true);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (error: any) {
      const eMsg = error;
      clearFileHandler();
      alert(`${eMsg}`.split(': ')[1]);
      return;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true); // 드래그 중임을 표시
  };

  const handleDragLeave = () => {
    setIsDragOver(false); // 드래그 중이 아님을 표시
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false); // 드래그 중이 아님을 표시
    fileChangeHandler(event); // 파일 처리
  };

  return (
    <>
      <div
        onClick={attachExcelFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group border-dashed border-2 h-[160px] border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center mb-6 hover:border-red-500 transition duration-100 cursor-pointer ${isDragOver ? 'border-red-500 bg-gray-100' : ''}`}
      >
        {isLoading ? (
          <div className='h-12 flex justify-center items-center'>
            <Loading width={48} height={48} />
          </div>
        ) : (
          <>
            <button
              className={`text-5xl mb-4 group-hover:text-[#ff4f5d] transition duration-100 ${excelFile ? 'text-[#ff4f5d]' : 'text-gray-300'}`}
            >
              {!excelFile || excelFile === null ? (
                <FaFileExcel />
              ) : (
                <FaRegCircleCheck />
              )}
            </button>
            <span className='text-lg'>
              {excelFile
                ? `${truncateFileName(excelFile.name)} ${formatFileSize(excelFile.size)}`
                : '클릭하거나 엑셀 파일을 드래그하여 첨부 하세요.'}
            </span>
          </>
        )}
      </div>
      <div className='flex gap-3 justify-center mb-6'>
        <button
          onClick={clearFileHandler}
          className={` hover:border-[#FF4F5D] focus:outline-none text-[#ff4f5d] focus:border-[#FF4F5D] transition duration-100 ease-in-out transform hover:bg-[#ff4f5d] hover:text-white hover:scale-105 bg-whitetext-[#ff4f5d] bg-white w-72 py-3 border border-[#ff4f5d] rounded-xl mb-6 ${excelFile ? '' : 'hidden'}`}
        >
          초기화
        </button>
      </div>
      {showCheckBlackList ? (
        <ShowBlackList blackList={blackList} />
      ) : (
        <NoBlackList />
      )}
      <input
        onChange={fileChangeHandler}
        type='file'
        ref={inputRef}
        accept='.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        className='hidden'
      />
    </>
  );
};

export default ExcelBox;
