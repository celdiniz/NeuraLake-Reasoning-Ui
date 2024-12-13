import React from 'react';
import { Download } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatHeaderProps {
  messages: Message[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ messages }) => {
  const downloadConversation = () => {
    const conversation = messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n---\n\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        NeuraLake: Open Reasoning UI
      </h1>
      <button
        onClick={downloadConversation}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>
    </div>
  );
};

export default ChatHeader;