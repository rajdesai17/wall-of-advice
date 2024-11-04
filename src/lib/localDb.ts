import { Message } from '@/types';
import { supabase } from './supabase';

export const getLocalMessages = async (): Promise<Message[]> => {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    author: msg.author,
    position: {
      x: msg.position_x,
      y: msg.position_y
    },
    createdAt: new Date(msg.created_at).getTime(),
    color: msg.color,
    ownerId: msg.owner_id,
    messageNumber: msg.message_number
  }));
};

export const saveLocalMessage = async (message: Message): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .insert([{
      id: message.id,
      content: message.content,
      author: message.author,
      position_x: message.position.x,
      position_y: message.position.y,
      created_at: new Date(message.createdAt).toISOString(),
      color: message.color,
      owner_id: message.ownerId,
      message_number: message.messageNumber
    }]);

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

export const updateLocalMessagePosition = async (
  messageId: string,
  position: { x: number; y: number }
): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({
      position_x: position.x,
      position_y: position.y
    })
    .eq('id', messageId);

  if (error) {
    console.error('Error updating message position:', error);
    throw error;
  }
}; 