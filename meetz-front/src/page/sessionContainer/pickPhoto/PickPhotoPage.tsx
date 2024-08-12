import { useState } from "react";
import useSaveImage from "../../../hooks/session/useSaveImage";
import { useSessionStore } from "../../../zustand/useSessionStore";

const PickPhotoPage = () => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const { setIsSessionEnd } = useSessionStore();
  const { sendImage } = useSaveImage();
  const frameList = [
    { name: "frame1", img: "/frame1.png" },
    { name: "frame2", img: "/frame2.png" },
    { name: "frame3", img: "/frame3.png" },
  ];
  const colors = [
    { id: 1, color: "bg-[#FE4D5C]" },
    { id: 2, color: "bg-[#D9D9D9]" },
    { id: 3, color: "bg-black" },
  ];

  const handleColorSelect = (id: number) => {
    setSelectedFrame(id);
  };
  const selectPhotoFrame = () => {
    sendImage(selectedFrame);
    setIsSessionEnd(true);
  };
  return (
    <div className="bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center">
      <div className="max-w-screen-xl w-screen px-24 py-2">
        <div className="flex flex-col justify-center items-center w-full mt-5 px-24 h-[660px] border rounded-3xl border-[#d9d9d9] bg-white shadow-2xl">
          <div className="flex flex-col gap-5 max-w-[800px] w-full justify-center opacity-0 animate-staggeredFadeIn">
            <div className="flex flex-col">
              <div className="flex gap-2 pt-8">
                <span className="inline-block font-medium text-3xl">Frame</span>
                <span className="inline-block font-light text-3xl">Select</span>
              </div>
              <p className="font-light text-xl">
                스타와 찍은 사진을 꾸밀 프레임을 설정해주세요
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              {selectedFrame !== 0 && (
                <img
                  src={`/frame${selectedFrame}.png`}
                  alt=""
                  className="w-[800px]  h-[374px]"
                />
              )}
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`w-10 h-10 rounded-full ${color.color} ${selectedFrame === color.id ? "ring-4 ring-purple-300" : ""}`}
                    onClick={() => handleColorSelect(color.id)}
                  />
                ))}
              </div>
              <button
                onClick={selectPhotoFrame}
                className="text-xl mt-2 mb-4 text-[#ff4f5d] w-[160px] h-[48px] font-semibold rounded-3xl border-2 border-[#ff4f5d] hover:bg-[#ff4f5d] hover:text-white"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickPhotoPage;
