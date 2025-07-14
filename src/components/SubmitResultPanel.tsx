import { SubmitState, SubmissionResult } from '@/lib/types/contestSubmitType';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';
import SubmissionModal from './SubmissionModal';

interface SubmitResultPanelProps {
  submitResult: SubmitState[];
}

const getSubmissionMessage = (
  data: SubmissionResult | { error: string }
): string => {
  if ('error' in data) {
    return data.error;
  }

  switch (data.verdict) {
    case 'ACCEPTED':
      return '정답입니다!';
    case 'PARTIAL':
      const totalScore = data.subtaskInfos.reduce(
        (sum, subtask) => sum + subtask.score,
        0
      );
      const perfectScore = data.subtaskInfos.reduce(
        (sum, subtask) => sum + subtask.perfectScore,
        0
      );
      return `부분 점수 (${totalScore}/${perfectScore}점)`;
    case 'WRONG_ANSWER':
      return '오답입니다.';
    case 'COMPILATION_ERROR':
      return '컴파일 에러가 발생했습니다.';
    case 'OUT_OF_MEMORY':
      return '메모리 초과입니다.';
    case 'TIME_LIMIT_EXCEEDED':
      return '시간 초과입니다.';
    case 'RUNTIME_ERROR':
      return '런타임 에러가 발생했습니다.';
    default:
      return '알 수 없는 결과입니다.';
  }
};

const SubmitResultPanel = ({ submitResult }: SubmitResultPanelProps) => {
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmissionClick = (
    data: SubmissionResult | { error: string }
  ) => {
    if ('error' in data) return;
    setSelectedSubmission(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  return (
    <>
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
              <div
                className="text-white text-caption font-pRegular cursor-pointer hover:bg-gray-800 transition-colors px-2 py-1 rounded"
                onClick={() => handleSubmissionClick(item.data)}
              >
                {getSubmissionMessage(item.data)}
              </div>
            )}
          </div>
        ))}
      </div>

      <SubmissionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submission={selectedSubmission}
      />
    </>
  );
};

export default SubmitResultPanel;
