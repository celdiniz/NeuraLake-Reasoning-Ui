import React from 'react';
import { Message } from '../types/chat';
import ChatContainer from '../components/ChatContainer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ChatPageProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onPauseGeneration: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onPauseGeneration
}) => {
  const navigate = useNavigate();

  if (messages.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="relative h-screen">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 
                 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      
      <ChatContainer
        messages={messages}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        onPauseGeneration={onPauseGeneration}
      />
    </div>
  );
};

export default ChatPage;