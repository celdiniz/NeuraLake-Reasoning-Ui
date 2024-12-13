import { useEffect, useRef } from 'react';

export const useScrollToBottom = (dependencies: any[] = []) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, dependencies);

  return bottomRef;
};