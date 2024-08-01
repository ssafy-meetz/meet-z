import { FanDto } from "../../../../types/types"

const ShowBlackList = ({ blackList }: { blackList: FanDto[] }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-12 border border-[#ff45f5d] mb-6 rounded-lg">
            {!blackList || blackList.length === 0 ? (<span className="text-gray-400">블랙리스트에 등록된 회원이 없습니다.</span>) : (<><span className="text-[#ff4f5d]"> 블랙리스트에 등록된 {blackList.length} 명의 회원이 제외되었습니다.</span>{blackList.map(black => <span className="text-gray-400">{black.name} {black.email} {black.phone}</span>)}</>)}
        </div >
    )
}

export default ShowBlackList