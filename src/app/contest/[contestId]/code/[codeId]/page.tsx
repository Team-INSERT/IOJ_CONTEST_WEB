'use client';

import CodeEditor from '@/components/CodeEditor';
import CodeHeader from '@/components/Contest/CodeHeader';
import StarStatus from '@/components/Contest/StarStatus';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const exampleData = {
  title: 'a*b 출력하기',
  content: 'a와 b를 입력받아 a*b를 곲한 값을 출력하세요',
  inputContent: '첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)',
  outputContent: '첫째 줄에 A*B를 출력한다.',
  level: 1,
  memoryLimit: 100,
  timeLimit: 1,
  testcases: [
    {
      input: '8\n10',
      output: '80\n',
    },
    {
      input: '6\n9',
      output: '54\n',
    },
    {
      input: '3\n4',
      output: '12\n',
    },
  ],
};

const defaultCode = {
  c: `int main() {
  std::cout<<"Hello World";
  return 0;
}`,
  c_cpp: `#include <iostream>

  using namespace std;

  int main() {
    cout<<"Hello World";
    return 0;
  }`,
  java: `import java.util.*;

  public class main {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
}`,
  python: `a, b = map(int, input().split())
print(a * b)`,
};

const Code = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'run' | 'testcase' | 'result'>(
    'run'
  );

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'python' | 'java' | 'c_cpp' | 'c'>(
    'python'
  );

  useEffect(() => {
    const CodeType = localStorage.getItem('code');
    if (CodeType === 'c') {
      setCode(defaultCode.c);
      setLanguage('c');
    } else if (CodeType === 'c_cpp') {
      setCode(defaultCode.c_cpp);
      setLanguage('c_cpp');
    } else if (CodeType === 'java') {
      setCode(defaultCode.java);
      setLanguage('java');
    } else if (CodeType === 'python') {
      setCode(defaultCode.python);
      setLanguage('python');
    } else {
      setCode(defaultCode.python);
      setLanguage('python');
      localStorage.setItem('code', 'python');
    }
  }, []);

  return (
    <>
      <CodeHeader />
      <div className="flex w-full h-full pt-[48px]">
        {/* 좌측 문제 */}
        <div className="w-1/2 px-10 py-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-gray-700 text-text">{params.codeId}</h2>
            <div className="flex items-center justify-between pb-3 text-bt1">
              <div>{exampleData.title}</div>
              <StarStatus level={exampleData.level} />
            </div>
            <div className="pt-1 text-gray-500 border-t border-gray-200 text-caption">
              <span className="text-ut-insertBlue">시간 제한</span> :{' '}
              {exampleData.timeLimit} Sec &nbsp; | &nbsp;
              <span className="text-ut-insertBlue">메모리 제한</span> :{' '}
              {exampleData.memoryLimit} MB
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b-2 text-bt border-ut-insertBlue w-fit">
              문제
            </h3>
            <p className="text-gray-900 text-text">{exampleData.content}</p>
          </div>

          <div className="space-y-4">
            <h3 className="border-b-2 text-bt border-ut-insertBlue w-fit">
              입력
            </h3>
            <p className="text-gray-900 text-text">
              {exampleData.inputContent}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="border-b-2 text-bt border-ut-insertBlue w-fit">
              출력
            </h3>
            <p className="text-gray-900 text-text">
              {exampleData.outputContent}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-14">
            <div>
              <h4 className="inline-block mb-5 border-b-2 text-bt border-ut-insertBlue w-fit">
                예제 입력
              </h4>
              <div className="space-y-2">
                {exampleData.testcases.map((testcase, index) => (
                  <div key={index} className="p-3 border rounded-md bg-gray-50">
                    {testcase.input}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="inline-block mb-5 border-b-2 text-bt border-ut-insertBlue w-fit">
                예제 출력
              </h4>
              <div className="space-y-2">
                {exampleData.testcases.map((testcase, index) => (
                  <div key={index} className="p-3 border rounded-md bg-gray-50">
                    {testcase.output}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 우측 코드 영역 */}
        <div className="flex flex-col w-1/2 h-full bg-[#272527]">
          {/* 상단 툴바 */}
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
                  const value = e.target.value as
                    | 'python'
                    | 'java'
                    | 'c_cpp'
                    | 'c';
                  setLanguage(value);
                  setCode(defaultCode[value]);
                  localStorage.setItem('code', value);
                }}
                value={language}
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="c_cpp">C++</option>
              </select>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">
                테스트케이스
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">
                실행
              </button>
              <button className="px-3 py-1 text-sm text-white bg-green-500 rounded">
                제출
              </button>
            </div>
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 overflow-y-scroll">
            <CodeEditor value={code} onChange={setCode} mode={language} />
          </div>

          {/* 하단 탭 */}
          <div className="text-sm text-white bg-zinc-900">
            <div className="flex border-b border-zinc-800">
              <button
                className={`px-4 py-2 ${activeTab === 'run' ? 'border-b-2 border-white font-semibold' : ''}`}
                onClick={() => setActiveTab('run')}
              >
                실행화면
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'testcase' ? 'border-b-2 border-white font-semibold' : ''}`}
                onClick={() => setActiveTab('testcase')}
              >
                테스트케이스
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'result' ? 'border-b-2 border-white font-semibold' : ''}`}
                onClick={() => setActiveTab('result')}
              >
                제출결과
              </button>
            </div>

            <div className="p-4 overflow-y-auto text-xs whitespace-pre-wrap h-28">
              {activeTab === 'run' && (
                <>
                  프로세스가 시작되었습니다. (입력값을 직접 입력해주세요.)
                  <br /> {'>'}
                  <br />
                  프로세스가 종료되었습니다.
                </>
              )}
              {activeTab === 'testcase' && <div>테스트케이스 준비 중...</div>}
              {activeTab === 'result' && <div>제출 결과 없음</div>}
            </div>

            <div className="flex justify-end px-4 pb-3">
              <button className="px-3 py-1 text-sm text-white bg-red-600 rounded">
                정지
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;
