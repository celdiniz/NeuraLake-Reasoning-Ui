import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import { useMessages } from './hooks/useMessages';
import { Settings } from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import ErrorMessage from './components/ErrorMessage';


const DEFAULT_SYSTEM_PROMPT = import.meta.env.VITE_SYSTEM_PROMPT


function AppContent() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [baseUrl, setBaseUrl] = useState(import.meta.env.VITE_BASE_URL);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    pauseGeneration,
    setError
  } = useMessages(baseUrl, systemPrompt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setShowSettings(true)}
          className="rounded-full bg-white dark:bg-gray-800 shadow-md 
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

      <Routes>
        <Route 
          path="/" 
          element={
            <SearchPage 
              onSubmit={async (query) => {
                await sendMessage(query);
                navigate('/chat');
              }}
            />
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ChatPage
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
              onPauseGeneration={pauseGeneration}
            />
          } 
        />
      </Routes>

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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;