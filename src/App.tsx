import React, { useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import ChatContainer from './components/ChatContainer';
import SearchPage from './components/SearchPage';
import SettingsModal from './components/SettingsModal';
import ErrorMessage from './components/ErrorMessage';
import { Message } from './types/chat';
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
  const [baseUrl, setBaseUrl] = useState('http://100.64.0.51:48010');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !baseUrl || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setShowChat(true);

    let assistantMessage = '';
    abortControllerRef.current = new AbortController();
    
    try {
      await streamCompletion({
        baseUrl,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content }
        ],
        onChunk: (chunk) => {
          assistantMessage += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage?.role === 'assistant') {
              lastMessage.content = assistantMessage;
              return [...newMessages];
            }
            return [...newMessages, {
              id: 'temp-' + Date.now(),
              role: 'assistant',
              content: assistantMessage,
              timestamp: Date.now(),
            }];
          });
        },
        signal: abortControllerRef.current.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Handle abort gracefully
        return;
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to the server';
      setError(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handlePauseGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-4 right-4 z-10">
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

      <div className={`transition-all duration-500 ${showChat ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SearchPage 
          onSubmit={handleSendMessage}
          query={query}
          setQuery={setQuery}
        />
      </div>

      <div className={`transition-all duration-500 ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ChatContainer
          messages={messages}
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