import { kv } from '@vercel/kv';
import { Message } from '@/types';

export async function getMessages(): Promise<Message[]> {
  try {
    const messages = await kv.get<Message[]>('messages') || [];
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function saveMessage(message: Message): Promise<boolean> {
  try {
    const messages = await getMessages();
    messages.push(message);
    await kv.set('messages', messages);
    return true;
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
}

export async function updateMessagePosition(
  messageId: string, 
  position: { x: number; y: number }
): Promise<boolean> {
  try {
    const messages = await getMessages();
    const index = messages.findIndex(m => m.id === messageId);
    if (index !== -1) {
      messages[index].position = position;
      await kv.set('messages', messages);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating message position:', error);
    return false;
  }
} 