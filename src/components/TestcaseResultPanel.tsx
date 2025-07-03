import React from 'react';
import { ContestTestcaseType } from '@/lib/types/contestSubmitType';
import { BeatLoader } from 'react-spinners';
import { usePathname } from 'next/navigation';
import { PathUtil } from '@/lib/util';

interface TestcaseResultPanelProps {
  testcaseData?: ContestTestcaseType[];
  isLoading: boolean;
}

const getVerdictMessage = (test: ContestTestcaseType): string => {
  const { verdict, output, expectedOutput } = test;

  if (verdict === 'ACCEPTED' && output === expectedOutput) {
    return '일치';
  }

  if (verdict === 'RUNTIME_ERROR') {
    return '런타임 에러';
  }

  if (verdict === 'OUT_OF_MEMORY') {
    return '메모리 초과';
  }

  if (verdict === 'TIME_LIMIT_EXCEEDED') {
    return '시간 초과';
  }

  return '불일치';
};

const getVerdictColor = (
  verdict: string | undefined,
  isAccepted: boolean
): string => {
  if (isAccepted) return 'text-blue-400';

  const errorVerdicts = [
    'RUNTIME_ERROR',
    'OUT_OF_MEMORY',
    'TIME_LIMIT_EXCEEDED',
  ];

  if (verdict && errorVerdicts.includes(verdict)) {
    return 'text-red-400';
  }

  return 'text-white';
};

const TestcaseResultPanel = ({
  testcaseData,
  isLoading,
}: TestcaseResultPanelProps) => {
  const url = usePathname();
  const matchedCount = Array.isArray(testcaseData)
    ? testcaseData.filter(
        (t) => t.output === t.expectedOutput && t.verdict === 'ACCEPTED'
      ).length
    : 0;

  const storedTestcases = localStorage.getItem(
    `testcase-modal-${PathUtil(url, 3)}`
  );

  let storedTestcaseCount = 0;
  if (storedTestcases) {
    try {
      const parsedTestcases = JSON.parse(storedTestcases);
      if (Array.isArray(parsedTestcases)) {
        storedTestcaseCount = parsedTestcases.length;
        console.log('localStorage 테스트케이스 갯수:', storedTestcaseCount);
      }
    } catch (error) {
      console.error('localStorage 데이터 파싱 에러:', error);
    }
  }

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="text-stext font-pBold">
        테스트 케이스 일치 비율 :{' '}
        <span className="text-ut-insertBlue">{matchedCount}</span> /{' '}
        {storedTestcaseCount}
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-gray-300 bg-gray-800 text-caption font-pRegular w-full px-[0.62rem] py-4 rounded">
          각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로 표준입력에
          전달됩니다. 일반 실행에서 에러가 없더라도 테스트케이스 실행 시 에러가
          발생할 수 있으며, 채점 시에도 동일하게 반영됩니다. 코드를 수정해 다시
          시도해보시기 바랍니다.
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full gap-2 text-sm text-white animate-pulse">
            <BeatLoader color="#808080" size={8} margin={3} />
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
                  const verdictText = getVerdictMessage(test);
                  const isAccepted =
                    test.verdict === 'ACCEPTED' &&
                    test.output === test.expectedOutput;
                  const colorClass = getVerdictColor(test.verdict, isAccepted);

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
                        {colorClass === 'text-red-400' ? (
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
                      <td className={`px-4 py-2 ${colorClass}`}>
                        {verdictText}
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
