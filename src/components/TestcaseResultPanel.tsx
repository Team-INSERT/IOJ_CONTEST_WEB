import React from 'react';
import { ContestTestcaseType } from '@/lib/types/contestSubmitType';
import { Loader2 } from 'lucide-react';

interface TestcaseResultPanelProps {
  testcaseData?: ContestTestcaseType[]; // optional 처리
  isLoading: boolean;
}

const TestcaseResultPanel = ({
  testcaseData,
  isLoading,
}: TestcaseResultPanelProps) => {
  const matchedCount = Array.isArray(testcaseData)
    ? testcaseData.filter(
        (t) => t.output === t.expectedOutput && t.verdict === 'ACCEPTED'
      ).length
    : 0;

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="text-stext">
        테스트 케이스 일치 비율 :{' '}
        <span className="text-ut-insertBlue">{matchedCount}</span> /{' '}
        {testcaseData?.length ?? 0}
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-gray-300 bg-gray-800 text-caption w-full px-[0.62rem] py-4 rounded">
          각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로 표준입력에
          전달됩니다. 일반 실행에서 에러가 없더라도 테스트케이스 실행 시 에러가
          발생할 수 있으며, 채점 시에도 동일하게 반영됩니다. 코드를 수정해 다시
          시도해보시기 바랍니다.
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full gap-2 text-sm text-white animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            테스트케이스 실행 중입니다...
          </div>
        ) : !testcaseData || testcaseData.length === 0 ? (
          <div className="text-center text-white">테스트 결과가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-2">번호</th>
                  <th className="px-4 py-2">입력값</th>
                  <th className="px-4 py-2">출력값</th>
                  <th className="px-4 py-2">예상 출력값</th>
                  <th className="px-4 py-2">실행 결과</th>
                </tr>
              </thead>
              <tbody>
                {testcaseData.map((test, idx) => {
                  const isAccepted =
                    test.output === test.expectedOutput &&
                    test.verdict === 'ACCEPTED';
                  const isRuntimeError = test.verdict === 'RUNTIME_ERROR';

                  return (
                    <tr
                      key={idx}
                      className="align-top border-t border-gray-700"
                    >
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2 whitespace-pre-wrap">
                        {test.input}
                      </td>
                      <td className="px-4 py-2 whitespace-pre-wrap">
                        {isRuntimeError ? (
                          <code className="text-red-400 whitespace-pre-wrap block max-w-[500px] overflow-x-auto">
                            {test.output}
                          </code>
                        ) : (
                          test.output
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-pre-wrap">
                        {test.expectedOutput}
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          isAccepted
                            ? 'text-blue-400'
                            : isRuntimeError
                              ? 'text-red-400'
                              : 'text-white'
                        }`}
                      >
                        {isAccepted
                          ? '일치'
                          : isRuntimeError
                            ? '런타임 에러'
                            : '불일치'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestcaseResultPanel;
