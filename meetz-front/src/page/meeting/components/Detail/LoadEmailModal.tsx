import Loading from '../../../../common/Loading';

const LoadEmailModal = () => {
  return (
    <div
      className='fixed bottom-0 left-0 mb-4 ml-4 w-[300px] h-[100px] flex gap-6 items-center justify-center rounded-3xl border-2 border-[#FF4F5D] bg-white'
    >
      <Loading width={46} height={46} />
      <span className='text-xl font-semibold cursor-default'>
        메일 발송 진행 중
      </span>
    </div>
  );
};

export default LoadEmailModal;
