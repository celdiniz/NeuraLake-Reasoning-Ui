import React from 'react';
import { X, RotateCcw, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
  onBaseUrlChange: (url: string) => void;
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
  defaultSystemPrompt: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  baseUrl,
  onBaseUrlChange,
  systemPrompt,
  onSystemPromptChange,
  defaultSystemPrompt,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dark Mode
            </span>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Base URL
            </label>
            <input
              type="url"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              placeholder="Enter your API base URL"
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                System Prompt
              </label>
              <button
                onClick={() => onSystemPromptChange(defaultSystemPrompt)}
                className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
            <textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange(e.target.value)}
              rows={6}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                       resize-vertical placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
                     transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;