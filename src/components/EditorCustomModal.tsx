'use client';

import React, { useState } from 'react';
import { X, Settings, Palette, Type, Grid } from 'lucide-react';

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

interface EditorCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  editorSettings: EditorSettings;
  onSettingsChange: (settings: EditorSettings) => void;
}

const EditorCustomModal: React.FC<EditorCustomModalProps> = ({
  isOpen,
  onClose,
  editorSettings,
  onSettingsChange,
}) => {
  const [localSettings, setLocalSettings] =
    useState<EditorSettings>(editorSettings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const hasChanges =
    JSON.stringify(localSettings) !== JSON.stringify(editorSettings);

  const handleClose = () => {
    if (hasChanges) {
      if (confirm('변경 사항이 있습니다. 저장하고 닫으시겠습니까?')) {
        handleSave();
      } else {
        onClose();
        setLocalSettings(editorSettings);
      }
    } else {
      onClose();
    }
  };

  const handleReset = () => {
    const defaultSettings: EditorSettings = {
      fontSize: 16,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      theme: 'monokai',
      tabSize: 2,
      showLineNumbers: true,
      enableAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      wordWrap: false,
    };

    if (confirm('설정값이 초기화됩니다. 계속하시겠습니까?')) {
      setLocalSettings(defaultSettings);
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-[69.5vh] overflow-y-auto font-pRegular">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="w-5 h-5" />
            에디터 설정
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* 폰트 설정 */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Type className="w-4 h-4" />
              폰트 설정
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                폰트 크기
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={localSettings.fontSize}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      fontSize: parseInt(e.target.value),
                    })
                  }
                  className="flex-1"
                />
                <span className="w-8 text-sm">{localSettings.fontSize}px</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                폰트 패밀리
              </label>
              <select
                value={localSettings.fontFamily}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    fontFamily: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Monaco, Menlo, 'Ubuntu Mono', monospace">
                  Monaco
                </option>
                <option value="'Fira Code', monospace">Fira Code</option>
                <option value="'Source Code Pro', monospace">
                  Source Code Pro
                </option>
                <option value="'JetBrains Mono', monospace">
                  JetBrains Mono
                </option>
                <option value="Consolas, monospace">Consolas</option>
              </select>
            </div>
          </div>

          {/* 테마 설정 */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Palette className="w-4 h-4" />
              테마 설정
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  value: 'monokai',
                  name: 'Monokai (어두운 테마)',
                  bg: '#272822',
                },
                { value: 'github', name: 'GitHub (밝은 테마)', bg: '#ffffff' },
                {
                  value: 'dracula',
                  name: 'Dracula (보라색 테마)',
                  bg: '#282a36',
                },
                {
                  value: 'solarized_dark',
                  name: 'Solarized Dark',
                  bg: '#002b36',
                },
                {
                  value: 'tomorrow_night',
                  name: 'Tomorrow Night',
                  bg: '#1d1f21',
                },
                { value: 'twilight', name: 'Twilight', bg: '#141414' },
              ].map((theme) => (
                <label
                  key={theme.value}
                  className="flex items-center gap-3 p-2 border rounded cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    checked={localSettings.theme === theme.value}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        theme: e.target.value,
                      })
                    }
                    className="text-blue-600"
                  />
                  <div
                    className="w-4 h-4 border border-gray-300 rounded"
                    style={{ backgroundColor: theme.bg }}
                  />
                  <span className="text-sm">{theme.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 편집 설정 */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Grid className="w-4 h-4" />
              편집 설정
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                탭 크기
              </label>
              <select
                value={localSettings.tabSize}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    tabSize: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>2 스페이스</option>
                <option value={4}>4 스페이스</option>
                <option value={8}>8 스페이스</option>
              </select>
            </div>

            <div className="space-y-3">
              {[
                { key: 'showLineNumbers', label: '줄 번호 표시' },
                { key: 'enableAutocompletion', label: '자동 완성' },
                { key: 'enableLiveAutocompletion', label: '실시간 자동 완성' },
                { key: 'enableSnippets', label: '코드 스니펫' },
                { key: 'wordWrap', label: '줄 바꿈' },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      localSettings[
                        option.key as keyof EditorSettings
                      ] as boolean
                    }
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        [option.key]: e.target.checked,
                      })
                    }
                    className="text-blue-600"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            초기화
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCustomModal;
