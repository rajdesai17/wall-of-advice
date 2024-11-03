import { Message } from '@/types';

export const saveToLocal = (messages: Message[]) => {
  localStorage.setItem('wall-messages', JSON.stringify(messages));
};

export const loadFromLocal = (): Message[] => {
  const stored = localStorage.getItem('wall-messages');
  return stored ? JSON.parse(stored) : [];
}; 