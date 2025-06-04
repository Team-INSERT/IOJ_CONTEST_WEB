'use client';

import AceEditor from 'react-ace';

// 언어 모드
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';

// 테마, 스니펫
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/c_cpp';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  mode?: 'python' | 'java' | 'c_cpp' | 'c';
}

export default function CodeEditor({ value, onChange, mode }: CodeEditorProps) {
  return (
    <AceEditor
      mode={mode || 'python'}
      theme="monokai"
      name="editor"
      value={value}
      onChange={onChange}
      fontSize={14}
      width="100%"
      height="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        enableMobileMenu: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
