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
  onPauseGeneration,
}) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handlePause = () => {
    if (isLoading) {
      onPauseGeneration();
    }
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-grow">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you ?"
          className={`flex-grow p-4 rounded-lg border shadow-sm h-24 resize-none 
                   text-gray-900 bg-white dark:text-white dark:bg-gray-800 
                   dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 
                   focus:border-transparent ${isLoading ? 'bg-opacity-50' : ''}`}
          disabled={isLoading}
        />
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-r-lg">
          {isLoading && (
            <button
              type="button"
              onClick={handlePause}
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 
                       transition-colors"
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
    </div>
  );
};
export default ChatInput;