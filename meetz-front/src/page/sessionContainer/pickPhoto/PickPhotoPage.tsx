import { useState } from "react";

const PickPhotoPage = () => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const frameList = [
    { name: 'frame1', img: '/frame1.png' },
    { name: 'frame2', img: '/frame2.png' },
    { name: 'frame3', img: '/frame3.png' },
  ]

  const pickFrameHandler = (e: React.ChangeEvent) => {

  }
  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className="max-w-screen-xl w-screen px-24 py-2" >
        <div className="flex flex-col justify-center items-center w-full mt-5 px-24 h-[660px] border rounded-3xl border-[#d9d9d9] bg-white shadow-2xl">
          <div className='flex flex-col gap-5 max-w-screen-xl w-full items-center justify-center opacity-0 animate-staggeredFadeIn'>
            <span
              className='inline-block font-bold text-3xl'
            >
              프레임 선택
            </span>
            <img src={`/frame${selectedFrame + 1}.png`} alt="" />
            <div className="w-full flex justify-around items-center">
              {frameList.map((frame, i) => (<div className="flex flex-col gap-3">
                <img src={frame.img} alt={frame.name} />
              </div>))}
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default PickPhotoPage