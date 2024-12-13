import React from 'react';
import { MessageSquare } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface ResponseSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ title, icon, content }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 p-4 border-b border-gray-200 dark:border-gray-700">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
};

export default ResponseSection;