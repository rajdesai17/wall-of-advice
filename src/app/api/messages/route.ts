import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import type { Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const messages: Message[] = await redis.get('wall-messages') ?? [];
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received message:', body);

    const messages: Message[] = await redis.get('wall-messages') ?? [];
    console.log('Current messages:', messages);
    
    const newMessage: Message = {
      id: uuidv4(),
      content: body.content,
      author: body.author,
      position: body.position,
      createdAt: Date.now(),
      color: body.color,
      messageNumber: messages.length + 1,
      ownerId: body.ownerId
    };

    console.log('New message:', newMessage);

    await redis.set('wall-messages', [...messages, newMessage]);
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ 
      error: 'Failed to save message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { messageId, userId, updates } = await request.json();
    const messages: Message[] = await redis.get('wall-messages') ?? [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    if (messages[messageIndex].ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    messages[messageIndex] = { ...messages[messageIndex], ...updates };
    await redis.set('wall-messages', messages);
    return NextResponse.json(messages[messageIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { messageId, userId } = await request.json();
    const data = await redis.get<Message[]>('wall-messages');
    const messages = data || [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    if (messages[messageIndex].ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    messages.splice(messageIndex, 1);
    await redis.set('wall-messages', messages);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
} 