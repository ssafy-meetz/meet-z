import Loading from '../../../../common/Loading';
const LoadEmailModal = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[460px] h-[240px] flex flex-col  items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
      >
        <div className='flex flex-col '>
          <div className='gap-6 flex flex-col items-center justify-center'>
            <Loading width={64} height={64} />

            <span className='text-xl font-semibold cursor-default'>
              메일 발송 진행 중
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadEmailModal;
