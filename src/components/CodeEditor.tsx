// components/CodeEditor.tsx
'use client';

import AceEditor from 'react-ace';

// 언어 모드
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';

// 추가 테마들
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-twilight';

// 스니펫
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/c_cpp';

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

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  mode?: 'PYTHON' | 'JAVA' | 'CPP' | 'C';
  editorSettings?: EditorSettings;
}

export default function CodeEditor({
  value,
  onChange,
  mode = 'PYTHON',
  editorSettings = {
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    theme: 'monokai',
    tabSize: 2,
    showLineNumbers: true,
    enableAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    wordWrap: false,
  },
}: CodeEditorProps) {
  const getAceMode = (language: string) => {
    switch (language) {
      case 'PYTHON':
        return 'python';
      case 'JAVA':
        return 'java';
      case 'C':
      case 'CPP':
        return 'c_cpp';
      default:
        return 'python';
    }
  };

  return (
    <AceEditor
      mode={getAceMode(mode)}
      theme={editorSettings.theme}
      name="editor"
      value={value}
      onChange={onChange}
      fontSize={editorSettings.fontSize}
      width="100%"
      height="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: editorSettings.enableAutocompletion,
        enableLiveAutocompletion: editorSettings.enableLiveAutocompletion,
        enableSnippets: editorSettings.enableSnippets,
        enableMobileMenu: true,
        showLineNumbers: editorSettings.showLineNumbers,
        tabSize: editorSettings.tabSize,
        wrap: editorSettings.wordWrap,
        fontFamily: editorSettings.fontFamily,
        showPrintMargin: false,
        highlightActiveLine: true,
        highlightSelectedWord: true,
      }}
    />
  );
}
