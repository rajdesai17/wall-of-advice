import { Message } from '@/types';

export const getLocalMessages = (): Message[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('wall-messages');
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalMessage = (message: Message): void => {
  const messages = getLocalMessages();
  messages.push(message);
  localStorage.setItem('wall-messages', JSON.stringify(messages));
};

export const updateLocalMessagePosition = (
  messageId: string,
  position: { x: number; y: number }
): void => {
  const messages = getLocalMessages();
  const index = messages.findIndex(m => m.id === messageId);
  if (index !== -1) {
    messages[index].position = position;
    localStorage.setItem('wall-messages', JSON.stringify(messages));
  }
}; 