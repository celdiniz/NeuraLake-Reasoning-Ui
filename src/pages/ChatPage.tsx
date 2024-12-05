import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import Layout from '../components/Layout';
import { Chat, Message } from '../types/chat';

interface ChatPageProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  onPauseGeneration: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onSendMessage,
  isLoading,
  onPauseGeneration,
}) => {
  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  return (
    <Layout
      sidebar={
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          onNewChat={onNewChat}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
        />
      }
      content={
        <ChatContainer
          messages={messages}
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          onPauseGeneration={onPauseGeneration}
        />
      }
    />
  );
};

export default ChatPage;