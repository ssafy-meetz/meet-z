import { MoonLoader } from "react-spinners"

const Loading = ({ width, height }: { width: number, height: number }) => {
  return (
    <div className={`flex justify-center items-center w-[${width}px] h-[${height}px]`}>
      <MoonLoader color="#ff4f5d" size={38} />
    </div>
  )
}

export default Loading