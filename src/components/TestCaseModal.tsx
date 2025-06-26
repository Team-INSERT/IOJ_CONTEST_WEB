import RemoveIcon from '@/assets/RemoveIcon';
import React, { useEffect, useState } from 'react';

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemId: number;
  sourcecode: string;
  language: 'C' | 'CPP' | 'JAVA' | 'PYTHON';
  onAlert: (status: 'success' | 'error', message: string) => void;
  onTestcaseCreated: (id: string) => void;
  initialTestcases: { input: string; output: string }[];
  problemKey: string;
}

const TestCaseModal = ({
  isOpen,
  onClose,
  problemId,
  onAlert,
  initialTestcases,
  problemKey,
}: TestCaseModalProps) => {
  const [testCases, setTestCases] = useState<
    { input: string; expectedOutput: string }[]
  >([]);

  const STORAGE_KEY = problemKey;

  const loadTestcases = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveTestcases = (data: { input: string; expectedOutput: string }[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('저장 실패:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const parsed = loadTestcases();
      if (Array.isArray(parsed)) {
        setTestCases(parsed);
      } else {
        setTestCases([]);
      }
    }
  }, [isOpen, problemId]);

  const handleAdd = () => {
    const updated = [...testCases, { input: '', expectedOutput: '' }];
    setTestCases(updated);
    saveTestcases(updated);
  };

  const handleChange = (
    index: number,
    key: 'input' | 'expectedOutput',
    value: string
  ) => {
    const updated = [...testCases];
    updated[index][key] = value;
    setTestCases(updated);
    saveTestcases(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...testCases];
    updated.splice(index, 1);
    setTestCases(updated);
    saveTestcases(updated);
  };

  const handleCreateTestcase = () => {
    saveTestcases(testCases);
    onClose();
    onAlert('success', '테스트 케이스가 저장되었습니다.');
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
        <section className="flex flex-col gap-6 w-full overflow-y-auto pr-2 max-h-[calc(100%-5rem)]">
          <p className="text-3xl font-semibold">테스트 케이스 추가</p>
          <section className="border rounded-[4px] overflow-x-auto w-full">
            <article className="flex items-center border-b bg-gray-50">
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

            {initialTestcases?.length > 0 && (
              <article className="flex bg-white">
                <article className="w-[65%] pt-[24px] px-[29px] pb-[24px] border-r">
                  <article className="bg-gray-100 p-3 rounded whitespace-pre-wrap font-regular text-[0.9375rem] text-gray-600 border border-grey-200">
                    {initialTestcases.map((tc) => tc.input).join('\n')}
                  </article>
                </article>
                <article className="w-[35%] pt-[24px] px-[29px] pb-[24px]">
                  <article className="bg-gray-100 p-3 rounded h-full whitespace-pre-wrap font-regular text-[0.9375rem] text-gray-600 border border-grey-200">
                    {initialTestcases.map((tc, i) => (
                      <div key={`out-${i}`} className="mb-2 last:mb-0">
                        {tc.output?.replace(/\\n/g, '\n') ?? ''}
                      </div>
                    ))}
                  </article>
                </article>
              </article>
            )}

            {testCases.map((tc, idx) => (
              <article
                key={idx}
                className="flex items-center justify-center bg-white"
              >
                <div className="w-[65%] py-[14px] px-[29px] border-r">
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
                <div className="w-[35%] py-[14px] px-[29px] flex items-center gap-2">
                  <textarea
                    placeholder="output"
                    value={tc.expectedOutput}
                    onChange={(e) =>
                      handleChange(idx, 'expectedOutput', e.target.value)
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
            handleCreateTestcase();
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
