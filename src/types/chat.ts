export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

export interface Conversation {
  chats: Chat[];
  activeChat: string | null;
}