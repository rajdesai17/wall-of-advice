import type { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
let messages: Message[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const newMessage: Message = {
      id: uuidv4(),
      ...req.body,
    };
    
    messages.push(newMessage);
    return res.status(201).json(newMessage);
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const messageIndex = messages.findIndex(m => m.id === id);
    
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    messages[messageIndex] = {
      ...messages[messageIndex],
      ...req.body,
    };

    return res.status(200).json(messages[messageIndex]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 