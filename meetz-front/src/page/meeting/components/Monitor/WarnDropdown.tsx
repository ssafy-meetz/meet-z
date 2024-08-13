import { useMonitorStore } from "../../../../zustand/useMonitorStore"

const WarnDropdown = () => {
  const { inputText, selectedOption, setSelectedOption, setInputText } = useMonitorStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  }

  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-full bg-white font-semibold border border-[#FF4F5D] text-[#FF4F5D] py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-red-600"
      >
        <option value="" disabled className="text-red-200">경고 사유 선택</option>
        <option value="욕설/비속어 사용">욕설/비속어 사용</option>
        <option value="성희롱">성희롱</option>
        <option value="음주/난동">음주/난동</option>
        <option value="other">기타(사유 입력)</option>
      </select>
      {selectedOption === 'other' ? <input type="text" value={inputText} onChange={inputChangeHandler} placeholder="사유를 입력하세요." className="pl-2 h-8 border rounded border-[#FF4F5D] outline-[#FF4F5D] mt-2" /> : ''}
      <div className="pointer-events-none absolute top-2 right-0 flex justify-center items-center px-2 text-[#FF4F5D]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  )
}

export default WarnDropdown