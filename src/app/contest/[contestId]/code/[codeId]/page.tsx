'use client';

import CodeEditor from '@/components/CodeEditor';
import CodeHeader from '@/components/CodeHeader';
import StarStatus from '@/components/StarStatus';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const exampleData = {
  title: 'a*b 출력하기',
  content: 'a와 b를 입력받아 a*b를 곱한 값을 출력하세요',
  inputContent: '첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)',
  outputContent: '첫째 줄에 A*B를 출력한다.',
  level: 1,
  memoryLimit: 100,
  timeLimit: 1,
  testcases: [
    { input: '8\n10', output: '80\n' },
    { input: '6\n9', output: '54\n' },
    { input: '3\n4', output: '12\n' },
  ],
};

const defaultCode = {
  c: `#include <stdio.h>\n\nint main() {\n  int a, b;\n  scanf("%d %d", &a, &b);\n  printf("%d\\n", a * b);\n  return 0;\n}`,
  c_cpp: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a * b << endl;\n  return 0;\n}`,
  java: `import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a * b);\n  }\n}`,
  python: `a, b = map(int, input().split())\nprint(a * b)`,
};

const Code = () => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingColumn = useRef(false);
  const isDraggingRow = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [editorHeight, setEditorHeight] = useState(70);

  const [activeTab, setActiveTab] = useState('run');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'python' | 'java' | 'c' | 'c_cpp'>(
    'python'
  );

  useEffect(() => {
    const saved = localStorage.getItem('code') || 'python';
    const validLanguage = ['python', 'java', 'c', 'c_cpp'].includes(saved)
      ? (saved as 'python' | 'java' | 'c' | 'c_cpp')
      : 'python';
    setLanguage(validLanguage);
    setCode(defaultCode[validLanguage]);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      if (isDraggingColumn.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        const newLeft = (e.clientX / containerWidth) * 100;
        if (newLeft > 30 && newLeft < 70) setLeftWidth(newLeft);
      }
      if (isDraggingRow.current) {
        const containerHeight =
          containerRef.current.getBoundingClientRect().height;
        const newTop =
          ((e.clientY - containerRef.current.getBoundingClientRect().top) /
            containerHeight) *
          100;
        if (newTop > 30 && newTop < 90) setEditorHeight(newTop);
      }
    }
  };

  const stopDragging = () => {
    isDraggingColumn.current = false;
    isDraggingRow.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopDragging);
  };

  const startDragging = (type: 'col' | 'row') => {
    if (type === 'col') isDraggingColumn.current = true;
    if (type === 'row') isDraggingRow.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);
  };

  return (
    <>
      <CodeHeader />
      <div ref={containerRef} className="flex w-full h-full pt-[48px]">
        <div
          style={{ width: `${leftWidth}%` }}
          className="px-10 py-6 overflow-auto select-none"
        >
          <h2 className="text-gray-700 text-text">{params.codeId}</h2>
          <div className="flex justify-between pb-3 text-bt1">
            <div>{exampleData.title}</div>
            <StarStatus level={exampleData.level} />
          </div>
          <div className="pt-1 text-gray-500 border-t text-caption">
            <span className="text-ut-insertBlue">시간 제한</span>:{' '}
            {exampleData.timeLimit} Sec &nbsp;|&nbsp;
            <span className="text-ut-insertBlue">메모리 제한</span>:{' '}
            {exampleData.memoryLimit} MB
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                문제
              </h3>
              <p>{exampleData.content}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                입력
              </h3>
              <p>{exampleData.inputContent}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                출력
              </h3>
              <p>{exampleData.outputContent}</p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-14">
              <div>
                <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt">
                  예제 입력
                </h4>
                <div className="flex flex-col gap-3">
                  {exampleData.testcases.map((t, i) => (
                    <div key={i} className="p-3 border rounded-md bg-gray-50">
                      {t.input}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt">
                  예제 출력
                </h4>
                <div className="flex flex-col gap-3">
                  {exampleData.testcases.map((t, i) => (
                    <div key={i} className="p-3 border rounded-md bg-gray-50">
                      {t.output}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onMouseDown={() => startDragging('col')}
          className="w-1 bg-gray-400 cursor-col-resize hover:bg-gray-600"
        />

        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col h-full bg-[#272527] select-none"
        >
          <div className="flex items-center justify-between px-5 py-2 border-b border-zinc-700">
            <div className="font-semibold text-white">
              {language === 'python'
                ? 'main.py'
                : language === 'java'
                  ? 'main.java'
                  : language === 'c_cpp'
                    ? 'main.cpp'
                    : 'main.c'}
            </div>
            <div className="flex gap-2">
              <select
                className="px-2 py-1 text-sm text-white bg-blue-500 rounded border-r-8-transparent"
                onChange={(e) => {
                  const val = e.target.value as
                    | 'python'
                    | 'java'
                    | 'c'
                    | 'c_cpp';
                  setLanguage(val);
                  setCode(defaultCode[val]);
                  localStorage.setItem('code', val);
                }}
                value={language}
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="c_cpp">C++</option>
              </select>
              <button className="px-3 py-1 text-white bg-blue-500 rounded">
                테스트케이스
              </button>
              <button className="px-3 py-1 text-white bg-blue-500 rounded">
                실행
              </button>
              <button className="px-3 py-1 text-white bg-green-500 rounded">
                제출
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <div
              style={{ height: `${editorHeight}%` }}
              className="overflow-y-auto"
            >
              <CodeEditor value={code} onChange={setCode} mode={language} />
            </div>

            <div
              onMouseDown={() => startDragging('row')}
              className="h-1 bg-gray-500 cursor-row-resize hover:bg-gray-700"
            />

            <div
              style={{ height: `${100 - editorHeight}%` }}
              className="overflow-y-auto text-xs text-white bg-zinc-900"
            >
              <div className="flex border-b border-zinc-800">
                {['run', 'testcase', 'result'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-white font-semibold' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'run'
                      ? '실행화면'
                      : tab === 'testcase'
                        ? '테스트케이스'
                        : '제출결과'}
                  </button>
                ))}
              </div>
              <div className="p-4 whitespace-pre-wrap h-28">
                {activeTab === 'run' &&
                  '프로세스가 시작되었습니다. (입력값을 직접 입력해주세요.)\n>\n프로세스가 종료되었습니다.'}
                {activeTab === 'testcase' && '테스트케이스 준비 중...'}
                {activeTab === 'result' && '제출 결과 없음'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;
