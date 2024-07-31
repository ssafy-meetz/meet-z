import { FanDto } from "../../../../types/types";

const CleanFanList = ({ fanList }: { fanList: FanDto[] }) => {
  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 11) {
      return phoneNumber; // 전화번호가 11자리가 아닌 경우 원본 그대로 반환
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
  };

  return (
    <div className="overflow-y-auto h-96 border border-b-2 mt-6" style={{ 'scrollbarWidth': 'thin' }}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#ff4f5d] text-white">
            <th className="py-4 pl-5 text-lg font-light rounded-tl-lg rounded-bl-lg">| 번호</th>
            <th className="py-4 pl-2 text-lg font-light">| 이름</th>
            <th className="py-4 pl-1 text-lg font-light">| 이메일</th>
            <th className="py-4 p-1 text-lg font-light rounded-tr-lg rounded-br-lg">| 연락처</th>
          </tr>
        </thead>
        <tbody>
          {fanList.map((fan, index) => (
            <tr key={fan.email}>
              <td className="p2 pl-10">{index + 1}</td>
              <td className="p2 pl-4">{fan.name}</td>
              <td className="p-2 pl-4">{fan.email}</td>
              <td className="p-2 pl-4">{formatPhoneNumber(fan.phone)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CleanFanList;
