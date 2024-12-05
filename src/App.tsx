import React, { useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import SettingsModal from './components/SettingsModal';
import ErrorMessage from './components/ErrorMessage';
import { Chat, Message } from './types/chat';
import { streamCompletion } from './utils/streamCompletion';
const DEFAULT_SYSTEM_PROMPT = `Always structure your response with reasoning inside <Reasoning> tags, followed by a clear final answer. Example:
<Reasoning>
First, I analyze the problem...
Then, I consider the implications...
Finally, I conclude...
</Reasoning>
Here is the answer...`;
function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [baseUrl, setBaseUrl] = useState('localhost:48010');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  // Implementação da função handleSendMessage
  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      // Aqui você pode adicionar a lógica para enviar a mensagem para o backend ou API
      // Por exemplo, usando fetch ou uma biblioteca como axios
      // const response = await fetch(baseUrl, { ...configurações da requisição });
      // const data = await response.json();
      // setChats(prevChats => [...prevChats, { id: 'novo_id', messages: [{ text: message }] }]);
      setQuery(''); // Limpar a caixa de entrada após o envio
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };
  // Implementação da função createNewChat
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      messages: [],
    };
    setChats(prevChats => [...prevChats, newChat]);
    setActiveChat(newChat.id);
    setShowChat(true);
  };
  // Implementação da função handleDeleteChat
  const handleDeleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
      setShowChat(false);
    }
  };
  // Implementação da função handlePauseGeneration
  const handlePauseGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md 
                   hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)} 
          />
        </div>
      )}
      <div 
        className={`fixed inset-0 transition-transform duration-500 ease-in-out
                   ${showChat ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <SearchPage 
          onSubmit={handleSendMessage}
          query={query}
          setQuery={setQuery}
        />
      </div>
      <div 
        className={`fixed inset-0 transition-transform duration-500 ease-in-out
                   ${showChat ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <ChatPage
          chats={chats}
          activeChat={activeChat}
          onNewChat={createNewChat}
          onSelectChat={setActiveChat}
          onDeleteChat={handleDeleteChat}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onPauseGeneration={handlePauseGeneration}
        />
      </div>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        systemPrompt={systemPrompt}
        onSystemPromptChange={setSystemPrompt}
        defaultSystemPrompt={DEFAULT_SYSTEM_PROMPT}
      />
    </div>
  );
}
export default App;