import React, { useState } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  onPauseGeneration: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading,
  onPauseGeneration 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-4 pr-24 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm 
                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-24"
        disabled={isLoading}
      />
      <div className="absolute right-2 bottom-2 flex space-x-2">
        {isLoading && (
          <button
            type="button"
            onClick={onPauseGeneration}
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 
                     transition-colors flex items-center space-x-1"
          >
            <Square className="w-5 h-5" />
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;