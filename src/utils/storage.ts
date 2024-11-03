import { Message } from '@/types';

export const saveMessages = (messages: Message[]) => {
  localStorage.setItem('wall-messages', JSON.stringify(messages));
};

export const loadMessages = (): Message[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('wall-messages');
  return stored ? JSON.parse(stored) : [];
}; 