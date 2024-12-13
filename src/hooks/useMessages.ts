import { useState, useRef } from 'react';
import { Message } from '../types/chat';
import { streamCompletion } from '../utils/streamCompletion';

export const useMessages = (baseUrl: string, systemPrompt: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async (content: string) => {
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

  const pauseGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    pauseGeneration,
    setError
  };
};