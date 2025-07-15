import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
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
    subtasks: { description: string; score: string }[];
  };
  style?: React.CSSProperties;
}

const ProblemDetailPanel = ({
  codeId,
  codeData,
  style,
}: ProblemDetailPanelProps) => {
  return (
    <div style={style} className="px-10 py-6 overflow-auto font-pRegular">
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
        <div className="flex flex-col gap-3 text-[17px]">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            문제
          </h3>
          <Latex>{codeData.content}</Latex>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            입력
          </h3>
          <Latex>{codeData.inputContent}</Latex>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            출력
          </h3>
          <Latex>{codeData.outputContent}</Latex>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <h4 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            예제 입력
          </h4>
          <h4 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
            예제 출력
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-4">
          {codeData.testcases.map((tc, i) => (
            <React.Fragment key={i}>
              <div className="p-3 whitespace-pre-wrap border rounded-md font-mono bg-gray-50">
                {tc.input}
              </div>
              <div className="p-3 whitespace-pre-wrap border rounded-md font-mono bg-gray-50">
                {tc.output}
              </div>
            </React.Fragment>
          ))}
        </div>
        {codeData.subtasks.length > 1 && (
          <div>
            <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt font-pSemibold">
              부분문제
            </h4>
            {codeData.subtasks.map((subtask, i) => (
              <div key={i} className="py-1">
                <Latex>
                  {(i + 1).toString()}. ({subtask.score}점){' '}
                  {subtask.description}
                </Latex>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetailPanel;
