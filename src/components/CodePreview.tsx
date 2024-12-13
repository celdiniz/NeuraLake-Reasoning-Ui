import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { extractCodeContent } from '../utils/codeExtractor';

interface CodePreviewProps {
  content: string;
  type: 'html' | 'markdown' | null;
  showPreview: boolean;
  previewKey: number;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  content,
  type,
  showPreview,
  previewKey,
}) => {
  const codeContent = extractCodeContent(content, type);

  if (!codeContent) return null;

  if (showPreview) {
    if (type === 'html') {
      // Add required meta tags and ensure proper HTML structure
      const htmlContent = codeContent.includes('<!DOCTYPE html>')
        ? codeContent
        : `<!DOCTYPE html>${codeContent}`;

      return (
        <iframe
          key={previewKey}
          srcDoc={htmlContent}
          className="w-full h-full border-0 bg-white"
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      );
    }
    return (
      <div className="p-4 bg-white dark:bg-gray-800 h-full overflow-auto">
        <MarkdownRenderer content={codeContent} />
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <pre className="p-4 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap break-words">
        <code>{codeContent}</code>
      </pre>
    </div>
  );
};

export default CodePreview;