'use client';

import React from 'react';

interface Props {
  onClose: () => void;
}

const GradingModal = ({ onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-pRegular"
      onClick={onClose}
    >
      <div
        className="relative w-[50rem] max-w-[90vw] rounded-2xl bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center px-10 py-10 gap-10 bg-gradient-to-tr from-[#e8f1ff] via-white to-[#ffeaea]">
          <div className="font-black text-3xl">채점기준</div>
          <div className="flex justify-between w-full">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">문제 해결 수</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  참가자가 해결한 문제의 개수에 따라 순위가 결정됩니다.
                  <br />각 문제는 정답 시{' '}
                  <span className="font-semibold text-blue-600">100점</span>으로
                  처리됩니다.
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
                  <br />
                  패널티 ={' '}
                  <span className="font-semibold text-blue-600">
                    (대회 시작 시간 - 문제 해결 시간)분
                  </span>
                  <br />
                </p>
              </div>
            </div>

            <div className="flex-1 pl-10 border-l border-gray-300 space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">실패한 문제</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  실패 상태인 문제는 점수가
                  <br />
                  부여되지 않으며 순위 산정에서 제외됩니다.
                  <br />
                  <span className="font-semibold text-blue-600">
                    추가 패널티는 부여되지 않습니다.
                  </span>
                </p>
              </div>
              <div>
                <h2 className="mb-1 text-xl font-bold">시간 제한</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  문제별 시간 제한은 언어에 따라 달라집니다.
                  <br />
                  문제의 기본 시간 제한을 T라고 하면
                  <br />
                  <span className="font-semibold text-blue-600">
                    python: 3*T + 2{' '}
                  </span>{' '}
                  |{' '}
                  <span className="font-semibold text-blue-600">
                    Java: 2*T + 1
                  </span>{' '}
                  |{' '}
                  <span className="font-semibold text-blue-600">C/C++: T</span>
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
