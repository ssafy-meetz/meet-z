import { StarDto } from "../../../../types/types"

const DetailRoomList = ({ starList }: { starList: StarDto[] | undefined }) => {
  return (
    <div className='max-w-screen-xl w-screen px-24'>
      <div className='py-12'>
        <span className='text-2xl font-semibold'>방 목록</span>
      </div>
      <div className='flex gap-8 flex-wrap justify-center'>
        {starList && starList.map((star) => (
          <div
            key={star.email}
            className='min-w-64 p-8 flex flex-col gap-3 border rounded-3xl border-[#ff4f5d] bg-white shadow-lg'
          >
            <span className='flex justify-center text-2xl text-[#ff4f5d]'>
              {star.name}
            </span>
            <div className='flex flex-col'>
              <span>이메일 : {star.email}</span>
              <span>비밀번호: {star.password}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailRoomList