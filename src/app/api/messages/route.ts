import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { Message } from '@/types';

export async function GET() {
  try {
    const messages: Message[] = await kv.get('wall-messages') || [];
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const message = await request.json() as Message;
    const messages: Message[] = await kv.get('wall-messages') || [];
    const updatedMessages = [...messages, message];
    await kv.set('wall-messages', updatedMessages);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { messageId, userId, updates } = await request.json();
    const messages: Message[] = await kv.get('wall-messages') || [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Check ownership
    if (messages[messageIndex].ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    messages[messageIndex] = { ...messages[messageIndex], ...updates };
    await kv.set('wall-messages', messages);
    return NextResponse.json(messages[messageIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { messageId, userId } = await request.json();
    const messages: Message[] = await kv.get('wall-messages') || [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Check ownership
    if (messages[messageIndex].ownerId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    messages.splice(messageIndex, 1);
    await kv.set('wall-messages', messages);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
} 