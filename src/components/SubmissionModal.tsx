'use client';

import React from 'react';
import { SubmissionResult, JudgeStatus } from '@/lib/types/contestSubmitType';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: SubmissionResult | null;
}

const getVerdictColor = (verdict: JudgeStatus): string => {
  switch (verdict) {
    case 'ACCEPTED':
      return 'text-ut-correctGreen';
    case 'PARTIAL':
      return 'text-blue-600';
    case 'WRONG_ANSWER':
    case 'COMPILATION_ERROR':
    case 'OUT_OF_MEMORY':
    case 'TIME_LIMIT_EXCEEDED':
    case 'RUNTIME_ERROR':
      return 'text-ut-warningRed';
    default:
      return 'text-gray-600';
  }
};

const getVerdictMessage = (verdict: JudgeStatus): string => {
  switch (verdict) {
    case 'ACCEPTED':
      return '정답';
    case 'PARTIAL':
      return '부분 정답';
    case 'WRONG_ANSWER':
      return '오답';
    case 'COMPILATION_ERROR':
      return '컴파일 에러';
    case 'OUT_OF_MEMORY':
      return '메모리 초과';
    case 'TIME_LIMIT_EXCEEDED':
      return '시간 초과';
    case 'RUNTIME_ERROR':
      return '런타임 에러';
    default:
      return '알 수 없음';
  }
};

const SubmissionModal = ({
  isOpen,
  onClose,
  submission,
}: SubmissionModalProps) => {
  if (!isOpen || !submission) return null;

  const totalScore = submission.subtaskInfos.reduce(
    (sum, subtask) => sum + subtask.score,
    0
  );
  const perfectScore = submission.subtaskInfos.reduce(
    (sum, subtask) => sum + subtask.perfectScore,
    0
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="flex flex-col items-start justify-center max-h-[500px] w-[940px] rounded-s bg-white px-[40px] py-[52px]">
        <div className="flex justify-between items-end">
          <h2 className="text-Nbt font-pRegular text-black font-semibold self-stretch">
            제출 실행 결과
          </h2>
          <p className="text-Nstext text-blue-normal">제출 시각: </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`text-xl font-pBold ${getVerdictColor(submission.verdict)}`}
          >
            {getVerdictMessage(submission.verdict)}
          </span>
          <span className="text-lg text-gray-700 font-pRegular">
            {totalScore}/{perfectScore}점
          </span>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          <h3 className="text-xl font-pBold text-gray-800 mb-4">
            서브태스크 상세 결과
          </h3>

          {submission.subtaskInfos.map((subtask, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-pSemibold text-gray-800">
                  서브태스크 {index + 1}
                </span>
                <span
                  className={`text-sm font-pBold ${getVerdictColor(subtask.verdict)}`}
                >
                  {getVerdictMessage(subtask.verdict)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-pSemibold">점수: </span>
                  <span
                    className={
                      subtask.score === subtask.perfectScore
                        ? 'text-ut-correctGreen font-pSemibold'
                        : 'text-gray-600'
                    }
                  >
                    {subtask.score}/{subtask.perfectScore}점
                  </span>
                </div>
                <div>
                  <span className="font-pSemibold">테스트케이스: </span>
                  <span
                    className={
                      subtask.passedTestcases === subtask.totalTestcases
                        ? 'text-ut-correctGreen font-pSemibold'
                        : 'text-gray-600'
                    }
                  >
                    {subtask.passedTestcases}/{subtask.totalTestcases}개 통과
                  </span>
                </div>
                <div>
                  <span className="font-pSemibold">실행 시간: </span>
                  <span className="text-gray-600">
                    {subtask.maxExecutionTime}ms
                  </span>
                </div>
                <div>
                  <span className="font-pSemibold">메모리 사용: </span>
                  <span className="text-gray-600">
                    {(subtask.maxMemoryUsed / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
