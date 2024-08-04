const StateHeader = () => {
  return (
    <div className='flex justify-between p-2'>
      <div className='text-3xl font-bold'>
        남은 인원 : <span className='text-[#FE9374]'>30</span>
      </div>
      <div className='text-3xl font-bold'>
        완료 인원 : <span className='text-[#FE9374]'>20</span>
      </div>
      <div className='text-3xl font-bold'>
        전체 인원 : <span className='text-[#FE9374]'>50</span>
      </div>
    </div>
  )
}

export default StateHeader