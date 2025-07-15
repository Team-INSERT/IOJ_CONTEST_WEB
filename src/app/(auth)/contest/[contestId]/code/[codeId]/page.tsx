'use client';

import CodeEditor from '@/components/CodeEditor';
import CodeHeader from '@/components/CodeHeader';
import Loading from '@/components/Loading';
import ProblemDetailPanel from '@/components/ProblemDetailPanel';
import SubmitResultPanel from '@/components/SubmitResultPanel';
import EditorCustomModal from '@/components/EditorCustomModal';
import {
  usePostCreateTestcase,
  usePostSubmitProblem,
} from '@/lib/service/contest/contest.mutation';
import {
  useGetContestDetail,
  useGetContestProblemById,
  useGetSubmitProblemStatus,
  useGetSubmitTestcase,
} from '@/lib/service/contest/contest.query';
import { SubmitState, SubtaskInfo } from '@/lib/types/contestSubmitType';
import { defaultCode, PathUtil } from '@/lib/util';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import TestcaseResultPanel from '@/components/TestcaseResultPanel';
import SlideAlert from '@/components/SlideAlert';
import TestCaseModal from '@/components/TestCaseModal';
import { PulseLoader } from 'react-spinners';

interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  theme: string;
  tabSize: number;
  showLineNumbers: boolean;
  enableAutocompletion: boolean;
  enableLiveAutocompletion: boolean;
  enableSnippets: boolean;
  wordWrap: boolean;
}

const Code = () => {
  const pathname = usePathname();
  const codeId = PathUtil(pathname, 3);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingColumn = useRef(false);
  const isDraggingRow = useRef(false);
  const [leftWidth, setLeftWidth] = useState(45);
  const [editorHeight, setEditorHeight] = useState(60);

  const [activeTab, setActiveTab] = useState('testcase');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'PYTHON' | 'JAVA' | 'C' | 'CPP'>(
    'PYTHON'
  );

  const [alertStatus, setAlertStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState('');

  const [alertKey, setAlertKey] = useState(0);
  const setAlerthandler = (
    status: 'success' | 'error' | null,
    message: string
  ) => {
    setAlertStatus(status);
    setAlertMessage(message);
    setAlertKey((prev) => prev + 1);
  };

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isTestCaseModalOpen, setIsTestCaseModalOpen] = useState(false);

  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    theme: 'monokai',
    tabSize: 2,
    showLineNumbers: true,
    enableAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    wordWrap: false,
  });

  const getLocalStorageKey = (
    contestId: string,
    problemId: string,
    lang: string
  ) => `code_${contestId}_${problemId}_${lang}`;

  useEffect(() => {
    // 로컬 스토리지에서 언어 설정 불러오기
    const savedLanguage = localStorage.getItem('code') || 'PYTHON';
    const validLanguage = ['PYTHON', 'JAVA', 'C', 'CPP'].includes(savedLanguage)
      ? (savedLanguage as 'PYTHON' | 'JAVA' | 'C' | 'CPP')
      : 'PYTHON';
    setLanguage(validLanguage);

    const contestId = PathUtil(pathname, 1);
    const problemKey = getLocalStorageKey(
      String(contestId),
      String(codeId),
      validLanguage
    );
    const savedCode = localStorage.getItem(problemKey);
    setCode(savedCode || defaultCode[validLanguage]);

    // 로컬 스토리지에서 에디터 설정 불러오기
    const savedSettings = localStorage.getItem('editorSettings');
    if (savedSettings) {
      try {
        setEditorSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('에디터 설정 로드 실패:', error);
      }
    }
  }, [codeId, pathname, language]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    const contestId = PathUtil(pathname, 1);
    const problemKey = getLocalStorageKey(
      String(contestId),
      String(codeId),
      language
    );
    localStorage.setItem(problemKey, newCode);
  };

  // 에디터 설정 변경 핸들러
  const handleSettingsChange = (newSettings: EditorSettings) => {
    setEditorSettings(newSettings);
    localStorage.setItem('editorSettings', JSON.stringify(newSettings));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      if (isDraggingColumn.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        const newLeft = (e.clientX / containerWidth) * 100;
        if (newLeft > 30 && newLeft < 60) setLeftWidth(newLeft);
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

  // 문제데이터, 대회 데이터 불러오기
  const { data: codeData, isLoading: codeLoading } =
    useGetContestProblemById(codeId);
  const { data: contestDetail, isLoading: contestLoading } =
    useGetContestDetail(PathUtil(pathname, 1));

  // 제출해서 정답확인하는 부분
  const { mutate: submitCode } = usePostSubmitProblem();
  const [submissionId, setSubmissionId] = useState<string>('');
  const [submitResult, setSubmitResult] = useState<SubmitState[]>([]);
  const isSubmitting = submitResult.some((item) => item.status === 'loading');

  const handleProblemSubmit = () => {
    setActiveTab('result');

    const id = Date.now();

    setSubmitResult((prev) => [{ id, status: 'loading' }, ...prev]);

    submitCode(
      {
        contestId: PathUtil(pathname, 1),
        problemId: PathUtil(pathname, 3),
        sourcecode: code,
        language: language,
      },
      {
        onSuccess: (data) => {
          setSubmissionId(data);
        },
        onError: () => {
          setSubmitResult((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    id,
                    status: 'done',
                    data: { error: '이미 해결된 문제입니다.' },
                  }
                : item
            )
          );
          setAlerthandler('error', '이미 해결된 문제입니다.');
        },
      }
    );
  };

  const { data: submitStatusData, isSuccess } =
    useGetSubmitProblemStatus(submissionId);

  useEffect(() => {
    if (isSuccess && submitStatusData && submissionId) {
      setSubmitResult((prev) =>
        prev.map((item) =>
          item.status === 'loading'
            ? { ...item, status: 'done', data: submitStatusData }
            : item
        )
      );

      switch (submitStatusData.verdict) {
        case 'ACCEPTED':
          setAlerthandler('success', '정답입니다!');
          break;
        case 'PARTIAL':
          const totalScore = submitStatusData.subtaskInfos.reduce(
            (sum: number, subtask: SubtaskInfo) => sum + subtask.score,
            0
          );
          const perfectScore = submitStatusData.subtaskInfos.reduce(
            (sum: number, subtask: SubtaskInfo) => sum + subtask.perfectScore,
            0
          );
          setAlerthandler(
            'success',
            `부분 점수: ${totalScore}/${perfectScore}점`
          );
          break;
        case 'WRONG_ANSWER':
          setAlerthandler('error', '틀렸습니다. 다시 시도해보세요.');
          break;
        case 'OUT_OF_MEMORY':
          setAlerthandler('error', '메모리 초과입니다. 코드를 최적화해보세요.');
          break;
        case 'TIME_LIMIT_EXCEEDED':
          setAlerthandler(
            'error',
            '시간 초과입니다. 알고리즘을 최적화해보세요.'
          );
          break;
        case 'COMPILATION_ERROR':
          setAlerthandler('error', '컴파일 에러입니다. 코드를 확인해보세요.');
          break;
        case 'RUNTIME_ERROR':
          setAlerthandler('error', '런타임 에러입니다. 코드를 확인해보세요.');
          break;
        default:
          setAlerthandler('error', '알 수 없는 에러가 발생했습니다.');
          break;
      }
    }
  }, [isSuccess, submitStatusData, submissionId]);

  const { mutate: createTestcase } = usePostCreateTestcase();

  const [isTestcaseProcessing, setIsTestcaseProcessing] = useState(false);

  const handleTestcaseSubmit = () => {
    setActiveTab('testcase');

    const problemKey = `testcase-modal-${PathUtil(pathname, 3)}`;
    const storedTestcases = (() => {
      try {
        const stored = localStorage.getItem(problemKey);
        let result: { input: string; expectedOutput: string }[] = [];
        if (Array.isArray(codeData?.testcases)) {
          result = codeData.testcases.map(
            (tc: { input: string; output: string }) => ({
              input: tc.input,
              expectedOutput: tc.output,
            })
          );
        }
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) result = result.concat(parsed);
        }
        return result;
      } catch {
        return [];
      }
    })();

    if (storedTestcases.length === 0) {
      setAlerthandler('error', '저장된 테스트케이스가 없습니다.');
      return;
    }

    setIsTestcaseProcessing(true); // 로딩 시작
    setShouldFetchTestcase(false);
    setTestcaseSubmissionId('');

    createTestcase(
      {
        problemId: PathUtil(pathname, 3),
        sourcecode: code,
        language,
        testcaseResultDto: storedTestcases,
      },
      {
        onSuccess: (testcaseId) => {
          setTestcaseSubmissionId(testcaseId);
          setShouldFetchTestcase(true);
        },
        onError: () => {
          setAlerthandler('error', '테스트케이스 생성 실패');
          setIsTestcaseProcessing(false); // 실패했으니 로딩 종료
        },
      }
    );
  };

  // 테스트 케이스 제출해서 확인하는 부분
  const [testcaseSubmissionId, setTestcaseSubmissionId] = useState<string>('');
  const [shouldFetchTestcase, setShouldFetchTestcase] = useState(false);

  // 테스트 케이스 조회 요청
  const shouldEnableTestcaseQuery =
    testcaseSubmissionId !== '' && shouldFetchTestcase;

  const { data: testcaseData, isFetching: isTestcaseSubmitting } =
    useGetSubmitTestcase(testcaseSubmissionId, {
      enabled: shouldEnableTestcaseQuery,
    });

  useEffect(() => {
    if (shouldEnableTestcaseQuery && !isTestcaseSubmitting) {
      setIsTestcaseProcessing(false); // 두 요청 모두 완료됨
    }
  }, [shouldEnableTestcaseQuery, isTestcaseSubmitting]);

  if (codeLoading || contestLoading) return <Loading />;

  return (
    <>
      <CodeHeader
        endTime={contestDetail?.endtime}
        problems={contestDetail?.problemIds}
      />
      <div ref={containerRef} className="flex w-full h-full pt-[64px]">
        {/* 좌측 문제 패널 */}
        <ProblemDetailPanel
          codeId={String(codeId)}
          codeData={codeData}
          style={{ width: `${leftWidth}%` }}
        />

        {/* 좌우 드래그 */}
        <div
          onMouseDown={() => startDragging('col')}
          className="w-1 bg-gray-400 cursor-col-resize hover:bg-gray-600"
        />

        {/* 우측 코드 에디터 및 결과 패널 */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col h-full bg-[#1E1E1E] select-none font-pRegular"
        >
          <div className="flex items-center justify-between px-5 py-2 border-b border-zinc-700 flex-nowrap whitespace-nowrap overflow-x-auto">
            <div className="font-semibold text-white">
              {language === 'PYTHON'
                ? 'main.py'
                : language === 'JAVA'
                  ? 'main.java'
                  : language === 'CPP'
                    ? 'main.cpp'
                    : 'main.c'}
            </div>
            <div className="flex gap-2 text-[14px]">
              <button
                onClick={() => setIsSettingModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                title="에디터 설정"
              >
                <Settings className="w-4 h-4" />
                설정
              </button>

              <button
                className="px-3 py-1 text-white bg-blue-500 rounded"
                onClick={() => {
                  if (confirm('코드가 초기화됩니다 진행하시겠습니까?')) {
                    setCode(defaultCode[language]);
                    handleCodeChange(defaultCode[language]);
                  }
                }}
              >
                초기화
              </button>

              <button
                className="px-3 py-1 text-white bg-blue-500 rounded"
                onClick={() => {
                  handleCodeChange(code);
                  setAlerthandler('success', '코드가 저장되었습니다.');
                }}
              >
                저장
              </button>

              <select
                className="px-2 py-1 text-white bg-blue-500 rounded border-r-8-transparent"
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

              <button
                className="px-3 py-1 text-white bg-blue-500 rounded"
                onClick={() => {
                  setIsTestCaseModalOpen(true);
                }}
              >
                테스트케이스 추가
              </button>

              <button
                onClick={handleTestcaseSubmit}
                disabled={isTestcaseProcessing}
                className={`px-3 py-1 text-white rounded w-[100px] ${
                  isTestcaseProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500'
                }`}
              >
                {isTestcaseProcessing ? (
                  <PulseLoader size={4.5} />
                ) : (
                  '테스트케이스'
                )}
              </button>

              <button
                className={`px-3 py-1 text-white rounded w-[49.2px] ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500'
                }`}
                onClick={handleProblemSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <PulseLoader size={4} /> : '제출'}
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <div
              style={{ height: `${editorHeight}%` }}
              className="overflow-y-auto"
            >
              <CodeEditor
                value={code}
                onChange={handleCodeChange}
                mode={language}
                editorSettings={editorSettings}
              />
            </div>

            {/* 위아래 드래그 */}
            <div
              onMouseDown={() => startDragging('row')}
              className="h-1 bg-gray-500 cursor-row-resize hover:bg-gray-700"
            />

            <div
              style={{ height: `${100 - editorHeight}%` }}
              className="overflow-y-auto text-xs text-white bg-gray-900"
            >
              <div className="flex">
                {['testcase', 'result'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 h-10 text-sm font-pRegular ${activeTab === tab ? 'border-b-2 border-white font-semibold' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'testcase' ? '테스트케이스' : '제출결과'}
                  </button>
                ))}
              </div>
              <div className="p-4 whitespace-pre-wrap min-h-[calc(100%-40px)] h-fit bg-[#131313]">
                {activeTab === 'testcase' && (
                  <TestcaseResultPanel
                    testcaseData={testcaseData}
                    isLoading={isTestcaseProcessing}
                  />
                )}
                {activeTab === 'result' && (
                  <SubmitResultPanel submitResult={submitResult} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 에디터 커스텀 모달 */}
      <EditorCustomModal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
        editorSettings={editorSettings}
        onSettingsChange={handleSettingsChange}
      />
      {/* 테스트 케이스 추가 모달 */}
      <TestCaseModal
        isOpen={isTestCaseModalOpen}
        onClose={() => setIsTestCaseModalOpen(false)}
        problemId={PathUtil(pathname, 3)}
        problemKey={`testcase-modal-${PathUtil(pathname, 3)}`}
        sourcecode={code}
        language={language}
        onAlert={setAlerthandler}
        onTestcaseCreated={() => {}}
        initialTestcases={codeData?.testcases}
      />
      {alertStatus && (
        <SlideAlert key={alertKey} message={alertMessage} type={alertStatus} />
      )}
    </>
  );
};

export default Code;
