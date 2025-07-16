import React, { useState } from 'react';
import RuntimeError from '@/assets/RuntimeError';
import Correct from '@/assets/Correct';
import Subtask from '@/assets/Subtask';
import Wrong from '@/assets/Wrong';
import Arrow from '@/assets/Arrow';
import {
  JudgeStatus,
  SubmissionResult,
  SubtaskInfo,
} from '@/lib/types/contestSubmitType';

interface SubmitResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: SubmissionResult | null;
}

const SubmitResultModal = ({
  isOpen,
  onClose,
  submission,
}: SubmitResultModalProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean[]>([]);

  const getVerdictDisplay = (verdict: JudgeStatus, detail: string) => {
    switch (verdict) {
      case 'ACCEPTED':
        return {
          icon: <Correct />,
          title: '정답',
          description: '모든 테스트케이스에 대해 올바른 답을 출력했습니다.',
        };
      case 'WRONG_ANSWER':
        return {
          icon: <Wrong />,
          title: `${detail}번째 테스트케이스에서 오답`,
          description: '테스트케이스에 대해 올바르지 않은 답을 출력했습니다.',
        };
      case 'OUT_OF_MEMORY':
        return {
          icon: <Wrong />,
          title: `${detail}번째 테스트케이스에서 메모리 초과`,
          description: '할당된 메모리를 초과했습니다.',
        };
      case 'TIME_LIMIT_EXCEEDED':
        return {
          icon: <Wrong />,
          title: `${detail}번째 테스트케이스에서 시간 초과`,
          description: '할당된 시간을 초과하였습니다.',
        };
      case 'RUNTIME_ERROR':
        return {
          icon: <RuntimeError />,
          title: '런타임 에러',
          description: '런타임 도중 에러가 발생하였습니다.',
        };
      default:
        return {
          icon: <Wrong />,
          title: '알 수 없는 에러',
          description: '알 수 없는 에러가 발생하였습니다.',
        };
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setIsDetailOpen([]);
    }
  };

  const handleDetailToggle = (index: number) => {
    setIsDetailOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (!isOpen || !submission) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-[16px] text-black"
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col items-start gap-3 py-10 px-[3.25rem] max-h-[60vh] bg-white w-[70%] font-pRegular rounded overflow-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-end self-stretch">
          {submission.verdict === 'COMPILATION_ERROR' ? (
            <div className="flex items-center gap-1">
              <RuntimeError width="40" height="42" />
              <h2 className="font-semibold text-2xl">컴파일 에러 내용</h2>
            </div>
          ) : (
            <h2 className="font-semibold text-2xl">제출 실행 결과</h2>
          )}
          <div className="flex gap-10">
            <p>
              <span className="text-blue-normal font-semibold">
                제출 시각 :{' '}
              </span>
              {new Date(submission.submittedAt).toLocaleString('ko-KR')}
            </p>
            <p>
              <span className="text-blue-normal font-semibold">
                획득 점수 :{' '}
              </span>
              {submission.subtaskInfos.reduce((sum, obj) => sum + obj.score, 0)}{' '}
              <span className="text-[#666]">/ 100점</span>
            </p>
          </div>
        </div>
        {/* line */}
        <div className="w-full border-t border-[#D9D9D9]" />
        {/* 부분문제들 */}
        {submission.verdict === 'COMPILATION_ERROR' && (
          <div className="flex w-full text-[#4D4D4D] bg-[#F2F2F2] px-[12px] py-[8px] rounded text-sm">
            {submission.compilationDetail}
          </div>
        )}
        {submission.subtaskInfos.map((subtask: SubtaskInfo, i) => (
          <div key={i} className="w-full">
            <div className="flex items-center self-stretch gap-5 py-[20px]">
              <div className="flex gap-2 flex-shrink-0 min-w-[160px] text-[#666] font-bold items-center self-stretch">
                <Subtask />
                서브테스크 {i + 1}
              </div>
              <div className="flex-shrink-0 min-w-[140px]">
                <span className="font-bold text-[#1C1C1C]">
                  {subtask.score}점{' '}
                </span>
                <span className="font-medium text-[#666]">
                  / {subtask.perfectScore}점
                </span>
              </div>
              <div
                className={`flex justify-between items-center flex-1 min-w-0 ${subtask.verdict === 'RUNTIME_ERROR' && 'cursor-pointer'}`}
                onClick={() =>
                  subtask.verdict === 'RUNTIME_ERROR' && handleDetailToggle(i)
                }
              >
                <div className="flex gap-2 items-center">
                  {getVerdictDisplay(subtask.verdict, subtask.detail).icon}
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-[#1C1C1C]">
                      {getVerdictDisplay(subtask.verdict, subtask.detail).title}
                    </p>
                    <p className="text-[#666] text-sm">
                      {
                        getVerdictDisplay(subtask.verdict, subtask.detail)
                          .description
                      }
                    </p>
                  </div>
                </div>
                {subtask.verdict === 'RUNTIME_ERROR' && (
                  <div className={isDetailOpen[i] ? 'rotate-180' : ''}>
                    <Arrow />
                  </div>
                )}
              </div>
              <div className="flex gap-3 flex-shrink-0 min-w-[168px] text-[15px]">
                <div className="flex flex-col gap-1 text-[#666]">
                  <p>실행시간</p>
                  <p>사용 메모리</p>
                </div>
                <div className="flex flex-col gap-1 text-[#1C1C1C] font-semibold">
                  <p>{subtask.maxExecutionTime} 초</p>
                  <p>{(subtask.maxMemoryUsed / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
            {isDetailOpen[i] && (
              <div className="flex w-full text-[#4D4D4D] bg-[#F2F2F2] px-[12px] py-[8px] rounded text-sm">
                {subtask.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmitResultModal;
