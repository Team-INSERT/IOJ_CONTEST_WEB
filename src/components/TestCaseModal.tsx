import AddIcon from '@/assets/AddIcon';
import RemoveIcon from '@/assets/RemoveIcon';
import React, { useEffect, useState, useRef } from 'react';

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  onAlert,
  initialTestcases,
  problemKey,
}: TestCaseModalProps) => {
  const [testCases, setTestCases] = useState<
    { input: string; expectedOutput: string }[]
  >([]);

  const STORAGE_KEY = problemKey;

  const textareaRefs = useRef<
    { input?: HTMLTextAreaElement; output?: HTMLTextAreaElement }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const syncHeights = (i: number) => {
    const inp = textareaRefs.current[i]?.input;
    const out = textareaRefs.current[i]?.output;
    if (!inp || !out) return;

    inp.style.height = 'auto';
    out.style.height = 'auto';
    const targetH = Math.max(inp.scrollHeight, out.scrollHeight);

    inp.style.height = `${targetH}px`;
    out.style.height = `${targetH}px`;
  };

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
  }, [isOpen]);

  useEffect(() => {
    const c = containerRef.current;
    if (c) {
      c.scrollTop = c.scrollHeight;
    }
  }, [testCases.length]);

  const handleAdd = () => {
    const updated = [...testCases, { input: '', expectedOutput: '' }];
    setTestCases(updated);
  };

  const handleChange = (
    index: number,
    key: 'input' | 'expectedOutput',
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

  useEffect(() => {
    if (isOpen && testCases.length > 0) {
      setTimeout(() => {
        textareaRefs.current.forEach((_, i) => {
          syncHeights(i);
        });
      }, 0);
    }
  }, [isOpen, testCases.length]);

  const handleCreateTestcase = () => {
    saveTestcases(testCases);
    onClose();
    onAlert('success', '테스트 케이스가 저장되었습니다.');
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-3 w-[60%] h-[70%] bg-white rounded-md py-10 px-[3.25rem] max-h-[60vh]">
        <h2 className="font-semibold text-2xl">테스트케이스 추가</h2>
        <div className="w-full border-t border-[#D9D9D9]" />
        <div
          className="grid grid-cols-10 w-full border font-mono overflow-scroll overflow-x-hidden"
          ref={containerRef}
        >
          <div className="col-span-6 border px-4 py-2 bg-[#FAFAFA] text-[#4D4D4D]">
            Input
          </div>
          <div className="col-span-4 border px-4 py-2 bg-[#FAFAFA] text-[#4D4D4D]">
            Output
          </div>
          {initialTestcases.map((testcase, i) => (
            <React.Fragment key={i}>
              <div className="flex w-full col-span-6 border px-4 py-2">
                <p className="w-full items-stretch bg-gray-50 rounded-[4px] p-3 my-3 whitespace-pre-wrap border border-gray-200">
                  {testcase.input}
                </p>
              </div>
              <div className="flex col-span-4 border px-4 py-2">
                <p className="w-full items-stretch bg-gray-50 rounded-[4px] p-3 my-3 whitespace-pre-wrap border border-gray-200">
                  {testcase.output}
                </p>
              </div>
            </React.Fragment>
          ))}
          {testCases.map((testcase, i) => (
            <React.Fragment key={i}>
              <div className="flex w-full col-span-6 border px-4 py-2">
                <textarea
                  className="w-full items-stretch bg-[#F9F9F9] rounded-[4px] p-3 my-3 whitespace-pre-wrap resize-none border border-gray-200 outline-blue-300"
                  ref={(el) => {
                    textareaRefs.current[i] = {
                      ...textareaRefs.current[i],
                      input: el ?? undefined,
                    };
                  }}
                  value={testcase.input}
                  onChange={(e) => handleChange(i, 'input', e.target.value)}
                  onInput={() => {
                    syncHeights(i);
                  }}
                />
              </div>
              <div className="flex items-center gap-3 col-span-4 border px-4 py-2">
                <textarea
                  className="w-full items-stretch bg-[#F9F9F9] rounded-[4px] p-3 my-3 whitespace-pre-wrap resize-none border border-gray-200 outline-blue-300"
                  ref={(el) => {
                    textareaRefs.current[i] = {
                      ...textareaRefs.current[i],
                      output: el ?? undefined,
                    };
                  }}
                  value={testcase.expectedOutput}
                  onChange={(e) =>
                    handleChange(i, 'expectedOutput', e.target.value)
                  }
                  onInput={() => {
                    syncHeights(i);
                  }}
                />
                <RemoveIcon
                  onClick={() => handleRemove(i)}
                  className="cursor-pointer hover:text-red-600"
                />
              </div>
            </React.Fragment>
          ))}
          <div className="flex w-full justify-center items-center gap-3 col-span-10 px-4 py-2 text-[#808080]">
            <div
              className="group flex justify-center bg-[#F9F9F9] w-full py-5 rounded-md cursor-pointer"
              onClick={() => handleAdd()}
            >
              <AddIcon className="cursor-pointer group-hover:text-blue-normal" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-500 py-1 px-4 text-white rounded-[4px] w-fit"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-blue-normal py-1 px-4 text-white rounded-[4px] w-fit"
            onClick={handleCreateTestcase}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCaseModal;
