'use client';

import React from 'react';
import XIcon from '@/assets/XIcon';

interface Props {
  onClose: () => void;
}

const GradingModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[50rem] max-w-[90vw] rounded-2xl bg-white shadow-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute text-gray-400 transition top-4 right-4 hover:text-red-400"
        >
          <XIcon />
        </button>

        <div className="flex flex-col items-center justify-center px-10 py-10 gap-10 bg-gradient-to-tr from-[#e8f1ff] via-white to-[#ffeaea]">
          <div className="text-Nbt">순위기준</div>
          <div className="flex justify-between w-full">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">문제 해결 수</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  참가자가 해결한 문제의 개수가
                  <br />
                  <span className="font-semibold text-blue-600">
                    가장 중요한 순위 결정 요소
                  </span>
                  입니다.
                </p>
              </div>

              <div>
                <h2 className="mb-1 text-xl font-bold">패널티</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  문제 해결 수가 동일할 경우,
                  <br />
                  <span className="font-semibold text-blue-600">
                    페널티가 적은 참가자
                  </span>
                  가 상위 순위를 차지합니다.
                </p>
              </div>

              <div>
                <h2 className="mb-1 text-xl font-bold">실패한 문제</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  실패(<code className="font-bold text-gray-900">failed</code>)
                  상태인 문제는 점수가
                  <br />
                  부여되지 않으며 순위 산정에서 제외됩니다.
                  <br />
                  <span className="font-semibold text-blue-600">
                    추가 페널티는 부여되지 않습니다.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex-1 pl-10 border-l border-gray-300">
              <div>
                <h2 className="mb-1 text-xl font-bold">실격</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  부정행위 등으로 실격 처리된 경우,
                  <br />
                  해당 참가자는 모든 점수가 0점 처리되며
                  <br />
                  <span className="font-semibold text-red-600">
                    순위에서 제외됩니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingModal;
