import { useState } from 'react';

const ScriptBox = () => {
  const [script, setScript] = useState(`
안녕하세요! 오늘 저랑 영상대화 할 수 있어서 너무 기뻐요. 어떻게 지내셨어요?
안녕하세요! 저도 정말 기대하고 있었어요. 그런데 요즘 너무 바빠 보여서 좀 걱정되더라고요. 괜찮으세요?
네, 요즘 정말 바빴긴 한데 그래도 팬분들과 소통할 수 있어서 행복해요. 덕분에 힘도 나고요. 혹시 궁금한 거 있으세요?
그런데 솔직히 말해도 되요? 최근에 어떤 일이 있어서 진짜 화가 났거든요.
무슨 일 있으셨어요? 말해주세요.
사실 얼마 전에 팬사인회에서 너무 짧게 대화할 수 있어서 너무 실망했어요. 솔직히 그때 너무 짜증나서 씨*** 하려다가 참았어요.
정말 죄송해요. 팬사인회 시간이 제한되어 있어서 그런 거였어요. 그래도 그렇게 느끼셨다면 정말 미안해요. 더 노력할게요.
아니에요, 저도 이해해요. 그냥 너무 기대했던 순간이라서 그랬던 것 같아요. 그래도 이렇게 영상으로 직접 대화할 수 있어서 너무 좋아요.
저도 이렇게 이야기 나눌 수 있어서 좋아요. 앞으로 더 좋은 시간 만들 수 있도록 노력할게요. 다른 궁금한 점 있으세요?
네, 다음 앨범에 대해 조금만 힌트 줄 수 있나요? 정말 기대하고 있어요.
음, 제가 많은 말을 해줄 수는 없지만 이번 앨범에는 좀 더 색다른 시도를 해보고 싶어요. 팬분들이 좋아해주실지 정말 기대돼요. 다른 질문도 있으세요?
휴식 시간에는 주로 뭘 하면서 보내세요?
저는 주로 책 읽거나 영화를 보면서 보내요. 요즘에는 요리도 조금씩 배우고 있어요. 혹시 추천할 만한 영화나 있나요?
오, 요리도 배우시다니 멋지네요! 저는 최근에 본 '기생충' 영화가 정말 인상 깊었어요. 책으로는 '데미안'을 추천드리고 싶어요.
'기생충' 정말 명작이죠. '데미안'도 한번 읽어볼게요. 감사합니다+`);

  const handleWarn = () => {
    alert('해당 팬에게 경고가 누적되었습니다.');
  };

  const handleBan = () => {
    alert('해당 팬이 영구 제명되었습니다.');
  };

  return (
    <div className='flex flex-col items-center p-4 space-y-4 gap-12'>
      <div className='bg-[#F9F9F9] shadow-md rounded-lg p-6 space-y-4'>
        <div className='text-lg'>
          {script.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className='flex justify-end space-x-4 py-'>
        <button
          onClick={handleWarn}
          className='bg-white text-[#FF4F5D] px-4 py-2 border border-[#FF4F5D] hover:text-white rounded-3xl hover:bg-[#FF4F5D]'
        >
          해당 팬 경고 누적하기
        </button>
        <button
          onClick={handleBan}
          className='bg-white text-[#FF4F5D] px-4 py-2 rounded-3xl border border-[#FF4F5D] hover:text-white hover:bg-[#FF4F5D]'
        >
          해당 팬 영구제명하기
        </button>
      </div>
    </div>
  );
};

export default ScriptBox;
