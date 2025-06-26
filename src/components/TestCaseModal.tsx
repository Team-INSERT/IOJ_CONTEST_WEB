import RemoveIcon from '@/assets/RemoveIcon';
import { usePostCreateTestcase } from '@/lib/service/contest/contest.mutation';
import React, { useState } from 'react';

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemId: number;
  sourcecode: string;
  language: 'C' | 'CPP' | 'JAVA' | 'PYTHON';
  onAlert: (status: 'success' | 'error', message: string) => void;
  onTestcaseCreated: (id: string) => void;
}

const TestCaseModal = ({
  isOpen,
  onClose,
  problemId,
  sourcecode,
  language,
  onAlert,
  onTestcaseCreated,
}: TestCaseModalProps) => {
  const [testCases, setTestCases] = useState<
    { input: string; output: string }[]
  >([]);

  const handleAdd = () => {
    if (testCases.length === 0) {
      setTestCases([{ input: '', output: '' }]);
    }
  };

  const handleChange = (
    index: number,
    key: 'input' | 'output',
    value: string
  ) => {
    const updated = [...testCases];
    updated[index][key] = value;
    setTestCases(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...testCases];
    updated.splice(index, 1);
    setTestCases(updated);
  };

  //테스트케이스 생성
  const { mutate: createTestcase } = usePostCreateTestcase();

  const handleCreateTestcase = () => {
    const formattedTestcases = testCases.map(({ input, output }) => ({
      input: input.replace(/\r?\n/g, '\\n'),
      expectedOutput: output.replace(/\r?\n/g, '\\n'),
    }));

    createTestcase(
      {
        problemId,
        sourcecode,
        language,
        testcaseResultDto: formattedTestcases,
      },
      {
        onSuccess: (response: string) => {
          console.log(response);
          onTestcaseCreated(response);
          onClose();
          onAlert('success', '테스트 케이스가 생성되었습니다.');
          setTestCases([]);
        },
        onError: () => {
          onAlert('error', '테스트 케이스 생성에 실패했습니다.');
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between w-[53.3125rem] h-[33.125rem] py-9 px-8 bg-white rounded"
      >
        <section className="flex flex-col gap-12 w-full">
          <p className="text-3xl font-semibold">테스트 케이스 추가</p>
          <section className="border rounded-[4px] overflow-hidden w-full">
            <article className="flex items-center bg-gray-50 border-b">
              <article className="flex justify-between items-center w-[65%] py-[6px] px-[13px] border-r font-regular text-[0.9375rem] text-gray-800">
                <p>Input</p>
                <button
                  onClick={handleAdd}
                  className="py-[7px] px-[16px] bg-ut-insertBlue text-white font-bold text-[0.9375rem] rounded-md"
                >
                  추가
                </button>
              </article>
              <article className="w-[35%] py-[6px] px-[13px] bg-gray-50 font-regular text-[0.9375rem] text-gray-800">
                Output
              </article>
            </article>
            <article className="flex bg-white">
              <article className="w-[65%] pt-[24px] px-[29px] pb-[24px] border-r">
                <article className="bg-gray-100 p-3 rounded whitespace-pre-wrap font-regular text-[0.9375rem] text-gray-600 border border-grey-200">
                  {`2\n11 424\n32 192`}
                </article>
              </article>
              <article className="w-[35%] pt-[24px] px-[29px] pb-[24px]">
                <article className="bg-gray-100 p-3 rounded h-full whitespace-pre-wrap font-regular text-[0.9375rem] text-gray-600 border border-grey-200">
                  {`435\n224`}
                </article>
              </article>
            </article>
            {testCases.map((tc, idx) => (
              <article key={idx} className="flex bg-white">
                <div className="w-[65%] px-[29px] pb-[44px] border-r">
                  <textarea
                    placeholder="Input"
                    value={tc.input}
                    onChange={(e) => handleChange(idx, 'input', e.target.value)}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    className="w-full bg-gray-50 border text-sm rounded p-3 resize-none text-gray-800 focus:outline-none placeholder:text-[15px] overflow-hidden"
                  />
                </div>
                <div className="w-[35%] h-fit px-[29px] pb-[44px] flex items-center gap-2">
                  <textarea
                    placeholder="output"
                    value={tc.output}
                    onChange={(e) =>
                      handleChange(idx, 'output', e.target.value)
                    }
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    className="w-full bg-gray-50 border text-sm rounded p-3 resize-none text-gray-800 focus:outline-none placeholder:text-[15px] overflow-hidden"
                  />
                  <RemoveIcon
                    onClick={() => handleRemove(idx)}
                    className="cursor-pointer"
                  />
                </div>
              </article>
            ))}
          </section>
        </section>
        <button
          onClick={() => {
            if (testCases.length > 0) {
              handleCreateTestcase();
            }
          }}
          className="w-fit ml-auto py-3 px-[63px] bg-ut-insertBlue rounded text-white text-[1.1875rem] font-bold"
        >
          확인
        </button>
      </main>
    </div>
  );
};

export default TestCaseModal;
