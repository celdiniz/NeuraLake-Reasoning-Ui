import React from 'react';
import { Message } from '../types/chat';
import { Brain, User, Bot } from 'lucide-react';
import AIResponse from './AIResponse';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div
      className={`flex items-start space-x-3 animate-slideIn ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
        {isSystem ? (
          <Brain className="w-8 h-8 text-purple-500" />
        ) : isUser ? (
          <User className="w-8 h-8 text-blue-500" />
        ) : (
          <Bot className="w-8 h-8 text-green-500" />
        )}
      </div>

      <div
        className={`flex-1 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-800'
        } rounded-lg p-4 shadow-sm max-w-3xl`}
      >
        {isUser ? (
          <p className="text-white">{message.content}</p>
        ) : (
          <AIResponse response={message.content} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;