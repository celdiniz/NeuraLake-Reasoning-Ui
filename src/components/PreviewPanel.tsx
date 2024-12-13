import React, { useState } from 'react';
import { Play, Copy, RefreshCw } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface PreviewPanelProps {
  content: string;
  type: 'html' | 'markdown' | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ content, type }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const extractCodeContent = (content: string): string => {
    if (type === 'markdown') {
      const match = content.match(/```(?:\w+)?\n([\s\S]*?)```/);
      return match ? match[1].trim() : content;
    }
    return content;
  };

  const renderPreview = () => {
    const codeContent = extractCodeContent(content);
    if (type === 'html') {
      return (
        <iframe
          key={previewKey}
          srcDoc={codeContent}
          className="w-full h-full min-h-[300px] border-0"
          title="HTML Preview"
        />
      );
    }
    return <MarkdownRenderer content={codeContent} />;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {type === 'html' ? 'HTML Preview' : 'Markdown Preview'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Copy code"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={refreshPreview}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 
                      ${showPreview ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
            title="Toggle preview"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {showPreview ? (
          renderPreview()
        ) : (
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            <code>{extractCodeContent(content)}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;