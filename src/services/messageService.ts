import { kv } from '@vercel/kv';
import type { Message } from '@/types';

// Get all messages
export const getMessages = async (): Promise<Message[]> => {
  try {
    return await kv.get('wall-messages') ?? [];
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return [];
  }
};

// Add a new message
export const addMessage = async (message: Omit<Message, 'id' | 'messageNumber'>): Promise<string> => {
  try {
    const messages: Message[] = await kv.get('wall-messages') ?? [];
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      messageNumber: messages.length + 1,
      createdAt: Date.now()
    };

    await kv.set('wall-messages', [...messages, newMessage]);
    return newMessage.id;
  } catch (error) {
    console.error('Failed to add message:', error);
    throw error;
  }
};

// Update a message
export const updateMessage = async (
  messageId: string, 
  userId: string, 
  updates: Partial<Message>
): Promise<void> => {
  try {
    const messages: Message[] = await kv.get('wall-messages') ?? [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      throw new Error('Message not found');
    }

    if (messages[messageIndex].ownerId !== userId) {
      throw new Error('Unauthorized');
    }

    messages[messageIndex] = { ...messages[messageIndex], ...updates };
    await kv.set('wall-messages', messages);
  } catch (error) {
    console.error('Failed to update message:', error);
    throw error;
  }
};

// Delete a message
export const deleteMessage = async (messageId: string, userId: string): Promise<void> => {
  try {
    const messages: Message[] = await kv.get('wall-messages') ?? [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      throw new Error('Message not found');
    }

    if (messages[messageIndex].ownerId !== userId) {
      throw new Error('Unauthorized');
    }

    messages.splice(messageIndex, 1);
    await kv.set('wall-messages', messages);
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw error;
  }
};

// Local storage utilities for message ownership
export const storeMessageOwnership = (messageId: string): void => {
  const ownedMessages = JSON.parse(localStorage.getItem('ownedMessages') || '[]');
  localStorage.setItem('ownedMessages', JSON.stringify([...ownedMessages, messageId]));
};

export const isMessageOwner = (messageId: string): boolean => {
  const ownedMessages = JSON.parse(localStorage.getItem('ownedMessages') || '[]');
  return ownedMessages.includes(messageId);
}; 