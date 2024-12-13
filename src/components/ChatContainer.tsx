import React from 'react';
import { Message } from '../types/chat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { detectContentType } from '../utils/contentDetector';
import CodePanel from './CodePanel';
import { parseResponse } from '../utils/responseParser';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  onPauseGeneration: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onPauseGeneration
}) => {
  const bottomRef = useScrollToBottom([messages]);
  const lastMessage = messages[messages.length - 1];
  const { code } = lastMessage && !lastMessage.role.includes('user') 
    ? parseResponse(lastMessage.content)
    : { code: null };
  
  const showCodePanel = code && detectContentType(code);

  return (
    <div className="flex h-screen">
      <div className={`flex flex-col ${showCodePanel ? 'w-1/2' : 'w-full'}`}>
        <ChatHeader messages={messages} />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={`${message.id}-${index}`} 
              message={message} 
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <ChatInput 
            onSendMessage={onSendMessage} 
            isLoading={isLoading} 
            onPauseGeneration={onPauseGeneration}
          />
        </div>
      </div>

      {showCodePanel && code && (
        <div className="w-1/2 border-l border-gray-200 dark:border-gray-700">
          <CodePanel 
            content={code} 
            type={detectContentType(code)} 
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;