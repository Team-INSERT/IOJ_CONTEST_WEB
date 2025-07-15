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
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 font-pRegular"
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between w-[53.3125rem] h-[33.125rem] py-9 px-8 bg-white rounded"
      >
        <section className="border rounded overflow-x-auto w-full">
          <div
            style={{ gridTemplateColumns: '65% 35%' }}
            className="grid items-center border-b bg-gray-50"
          >
            <div className="flex justify-between items-center py-2 px-4">
              <span className="font-semibold text-gray-800">Input</span>
              <button
                onClick={handleAdd}
                className="py-1 px-4 bg-ut-insertBlue text-white rounded"
              >
                추가
              </button>
            </div>
            <div className="py-2 px-4">
              <span className="font-semibold text-gray-800">Output</span>
            </div>
          </div>

          {initialTestcases?.map((tc, i) => (
            <div
              key={`init-${i}`}
              className="grid grid-cols-[65%_35%] items-start my-4 mx-4 gap-4"
            >
              <div className="p-3 bg-gray-50 border rounded-md whitespace-pre-wrap h-full text-gray-700">
                {tc.input.replace(/\\n/g, '\n')}
              </div>
              <div className="p-3 bg-gray-50 border rounded-md whitespace-pre-wrap h-full text-gray-700">
                {tc.output.replace(/\\n/g, '\n')}
              </div>
            </div>
          ))}

          {testCases.map((tc, idx) => (
            <div
              key={`user-${idx}`}
              className="grid grid-cols-[65%_35%] items-stretch my-4 mx-4 gap-4"
            >
              {/* 입력란 */}
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) => handleChange(idx, 'input', e.target.value)}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = 'auto';
                  t.style.height = `${t.scrollHeight}px`;
                }}
                className="p-3 bg-gray-50 border rounded-md whitespace-pre-wrap h-full text-gray-700"
              />

              <div className="relative">
                <textarea
                  placeholder="Output"
                  value={tc.expectedOutput}
                  onChange={(e) =>
                    handleChange(idx, 'expectedOutput', e.target.value)
                  }
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = 'auto';
                    t.style.height = `${t.scrollHeight}px`;
                  }}
                  className="p-3 bg-gray-50 border rounded-md whitespace-pre-wrap h-full text-gray-700"
                />
                <RemoveIcon
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))}
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
