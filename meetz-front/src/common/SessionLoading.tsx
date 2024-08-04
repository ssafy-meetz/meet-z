import { PropagateLoader } from "react-spinners";

interface SessionLoadingProps {
  width?: number;  
  height?: number; 
  color?: string; 
}

const SessionLoading = ({
  width = 100,    // 기본값 설정
  height = 70,   // 기본값 설정
  color = "#ffcece" // 기본값 설정
}: SessionLoadingProps) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: `${width}px`, height: `${height}px` }} // 스타일로 지정
    >
      <PropagateLoader color={color} size={width / 5} /> {/* 크기 계산 */}
    </div>
  );
}

export default SessionLoading;