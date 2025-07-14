import { SubmitState } from '@/lib/types/contestSubmitType';
import { BeatLoader } from 'react-spinners';

interface SubmitResultPanelProps {
  submitResult: SubmitState[];
}

const SubmitResultPanel = ({ submitResult }: SubmitResultPanelProps) => {
  return (
    <div className="overflow-y-auto">
      {submitResult.map((item) => (
        <div
          key={item.id}
          className="mb-2 w-full py-[0.81rem] pl-4 bg-gray-900"
        >
          {item.status === 'loading' && (
            <div className="flex items-center gap-1 text-white text-caption font-pRegular">
              <BeatLoader color="#808080" size={5} />
              처리중...
            </div>
          )}
          {item.status === 'done' && (
            <div className="text-white text-caption font-pRegular cursor-pointer">
              {typeof item.data === 'string'
                ? item.data === 'ACCEPTED'
                  ? '정답입니다!'
                  : item.data === 'WRONG_ANSWER'
                    ? '오답입니다.'
                    : item.data === 'COMPILATION_ERROR'
                      ? '컴파일 에러가 발생했습니다.'
                      : item.data === 'OUT_OF_MEMORY'
                        ? '메모리 초과입니다.'
                        : item.data === 'TIME_LIMIT_EXCEEDED'
                          ? '시간 초과입니다.'
                          : item.data === 'RUNTIME_ERROR'
                            ? '런타임 에러가 발생했습니다.'
                            : '알 수 없는 결과입니다.'
                : (item.data?.error ?? '알 수 없는 에러입니다.')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmitResultPanel;
