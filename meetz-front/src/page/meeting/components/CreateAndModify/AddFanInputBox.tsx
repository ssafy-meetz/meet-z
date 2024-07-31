import { useState } from "react";
import checkNotBlackedFan from "../../../../apis/meeting/CheckNotBlackedFan";
import { useUserStore } from "../../../../zustand/useUserStore";
import useMeetingSettingStore from "../../../../zustand/useMeetingSettingStore";

const AddFanInputBox = () => {
  const { accessToken } = useUserStore();
  const { tempNotBlackList, setTempNotBlackList } = useMeetingSettingStore();
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [isBlacked, setIsBlacked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const checkFanHandler = async () => {
    try {
      const result = await checkNotBlackedFan(name, email, phone, accessToken);
      if (result) {
        setIsBlacked(false);
        setTempNotBlackList([...tempNotBlackList, { name, email, phone }]);
      }
    } catch (error) {
      setIsBlacked(true);
    } finally {
      setAddBtnClicked(true);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <>
      <div className="w-full mb-2 flex">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-32 hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2"
          type="text"
          placeholder="이름"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2"
          type="text"
          placeholder="이메일"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="hover:border-[#FF4F5D] focus:outline-none focus:border-[#FF4F5D] flex-1 border-b border-gray-300 px-2 py-2 mr-2"
          type="text"
          placeholder="연락처( - 없이 입력)"
        />
        <button
          onClick={checkFanHandler}
          className="bg-[#ff4f5d] text-white px-4 py-2 rounded-xl"
        >
          추가
        </button>
      </div>
      {addBtnClicked && (
        <div className="flex justify-center">
          {!isBlacked ? (
            <span className="text-gray-400">
              블랙리스트에 없는 회원입니다. 해당 회원이 팬 리스트에 추가되었습니다.
            </span>
          ) : (
            <span className="text-red-500">
              블랙리스트에 등록된 회원입니다. 해당 회원은 팬 리스트에 추가할 수 없습니다.
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default AddFanInputBox;
