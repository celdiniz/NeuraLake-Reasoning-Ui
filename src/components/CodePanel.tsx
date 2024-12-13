import React, { useState } from 'react';
import { Play, Copy, RefreshCw, Code } from 'lucide-react';
import { extractCodeContent } from '../utils/codeExtractor';
import CodePreview from './CodePreview';

interface CodePanelProps {
  content: string;
  type: 'html' | 'markdown' | null;
}

const CodePanel: React.FC<CodePanelProps> = ({ content, type }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const handleCopy = () => {
    const codeContent = extractCodeContent(content, type);
    navigator.clipboard.writeText(codeContent);
  };

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  if (!type) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {type === 'html' ? 'HTML Preview' : 'Code Preview'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Copy code"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={refreshPreview}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 
                      ${showPreview ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
            title="Toggle preview"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <CodePreview
          content={content}
          type={type}
          showPreview={showPreview}
          previewKey={previewKey}
        />
      </div>
    </div>
  );
};

export default CodePanel;