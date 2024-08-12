import LoadingSession from "../components/LoadingSession"

const SessionLoadingPage = () => {

  return (
    <div className='bg-gradient-to-br from-[#FE9374] to-[#FE4D5C] w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col max-w-screen-xl w-full items-center justify-center'>
        <LoadingSession />
      </div>
    </div>
  )
}

export default SessionLoadingPage
