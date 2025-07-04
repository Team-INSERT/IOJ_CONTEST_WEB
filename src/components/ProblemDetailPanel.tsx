import React from 'react';
import StarStatus from '@/components/StarStatus';

interface ProblemDetailPanelProps {
  codeId: string;
  codeData: {
    title: string;
    level: number;
    timeLimit: number;
    memoryLimit: number;
    content: string;
    inputContent: string;
    outputContent: string;
    testcases: { input: string; output: string }[];
  };
  style?: React.CSSProperties;
}

const ProblemDetailPanel = ({
  codeId,
  codeData,
  style,
}: ProblemDetailPanelProps) => {
  return (
    <div style={style} className="px-10 py-6 overflow-auto select-none">
      <h2 className="text-gray-700 text-text font-pRegular">{codeId}</h2>
      <div className="flex justify-between pb-3 text-bt1 font-pSemibold">
        <div>{codeData.title}</div>
        <StarStatus level={codeData.level} />
      </div>
      <div className="pt-3 text-gray-500 border-t text-stext font-pBold">
        <span className="text-ut-insertBlue">시간 제한</span>:{' '}
        {codeData.timeLimit} Sec &nbsp;| &nbsp;
        <span className="text-ut-insertBlue">메모리 제한</span>:{' '}
        {codeData.memoryLimit / 1024} MB
      </div>
      <div className="mt-6 space-y-6">
        <div className="flex flex-col gap-3">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            문제
          </h3>
          <p>{codeData.content}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            입력
          </h3>
          <p>{codeData.inputContent}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            출력
          </h3>
          <p>{codeData.outputContent}</p>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-14">
          <div>
            <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
              예제 입력
            </h4>
            <div className="flex flex-col gap-3">
              {codeData.testcases.map((tc, i) => (
                <div
                  key={i}
                  className="p-3 whitespace-pre-line border rounded-md bg-gray-50"
                >
                  {tc.input}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
              예제 출력
            </h4>
            <div className="flex flex-col gap-3">
              {codeData.testcases.map((tc, i) => (
                <div key={i} className="p-3 border rounded-md bg-gray-50">
                  {tc.output}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPanel;
