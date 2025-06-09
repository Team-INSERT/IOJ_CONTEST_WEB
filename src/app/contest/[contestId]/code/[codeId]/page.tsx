'use client';

import CodeEditor from '@/components/CodeEditor';
import CodeHeader from '@/components/CodeHeader';
import Loading from '@/components/Loading';
import StarStatus from '@/components/StarStatus';
import {
  useGetContestById,
  useGetContestProblemById,
} from '@/lib/service/contest/contest.query';
import { defaultCode, PathUtil } from '@/lib/util';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const Code = () => {
  const pathname = usePathname();
  const codeId = PathUtil(pathname, 3);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingColumn = useRef(false);
  const isDraggingRow = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [editorHeight, setEditorHeight] = useState(70);

  const [activeTab, setActiveTab] = useState('run');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'PYTHON' | 'JAVA' | 'C' | 'CPP'>(
    'PYTHON'
  );

  useEffect(() => {
    const saved = localStorage.getItem('code') || 'PYTHON';
    const validLanguage = ['PYTHON', 'JAVA', 'C', 'CPP'].includes(saved)
      ? (saved as 'PYTHON' | 'JAVA' | 'C' | 'CPP')
      : 'PYTHON';
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

  const { data: codeData, isLoading: codeLoading } =
    useGetContestProblemById(codeId);
  const { data: contestDetail, isLoading: contestLoading } = useGetContestById(
    PathUtil(pathname, 1)
  );

  if (codeLoading || contestLoading)
    return <Loading text={'문제 불러오는 중...'} />;

  return (
    <>
      <CodeHeader
        endTime={contestDetail?.endTime}
        problems={contestDetail.problems}
      />
      <div ref={containerRef} className="flex w-full h-full pt-[48px]">
        <div
          style={{ width: `${leftWidth}%` }}
          className="px-10 py-6 overflow-auto select-none"
        >
          <h2 className="text-gray-700 text-text">{codeId}</h2>
          <div className="flex justify-between pb-3 text-bt1">
            <div>{codeData?.title}</div>
            <StarStatus level={codeData?.level} />
          </div>
          <div className="pt-1 text-gray-500 border-t text-caption">
            <span className="text-ut-insertBlue">시간 제한</span>:{' '}
            {codeData?.timeLimit} Sec &nbsp;|&nbsp;
            <span className="text-ut-insertBlue">메모리 제한</span>:{' '}
            {codeData?.memoryLimit} MB
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                문제
              </h3>
              <p>{codeData?.content}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                입력
              </h3>
              <p>{codeData?.inputContent}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="pb-1 border-b-2 border-ut-insertBlue w-fit text-bt">
                출력
              </h3>
              <p>{codeData?.outputContent}</p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-14">
              <div>
                <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt">
                  예제 입력
                </h4>
                <div className="flex flex-col gap-3">
                  {codeData?.testcases.map(
                    (data: { input: string }, i: number) => (
                      <div key={i} className="p-3 border rounded-md bg-gray-50">
                        {data.input}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="pb-1 mb-5 border-b-2 border-ut-insertBlue w-fit text-bt">
                  예제 출력
                </h4>
                <div className="flex flex-col gap-3">
                  {codeData?.testcases.map(
                    (data: { output: string }, i: number) => (
                      <div key={i} className="p-3 border rounded-md bg-gray-50">
                        {data.output}
                      </div>
                    )
                  )}
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
              {language === 'PYTHON'
                ? 'main.py'
                : language === 'JAVA'
                  ? 'main.java'
                  : language === 'CPP'
                    ? 'main.cpp'
                    : 'main.c'}
            </div>
            <div className="flex gap-2">
              <select
                className="px-2 py-1 text-sm text-white bg-blue-500 rounded border-r-8-transparent"
                onChange={(e) => {
                  const val = e.target.value as 'PYTHON' | 'JAVA' | 'C' | 'CPP';
                  setLanguage(val);
                  setCode(defaultCode[val]);
                  localStorage.setItem('code', val);
                }}
                value={language}
              >
                <option value="PYTHON">Python</option>
                <option value="JAVA">Java</option>
                <option value="C">C</option>
                <option value="CPP">C++</option>
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
