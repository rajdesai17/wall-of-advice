import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    const transformedMessages = messages.map(msg => ({
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
    
    return NextResponse.json(transformedMessages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newMessage = {
      id: uuidv4(),
      content: body.content,
      author: body.author,
      position_x: Math.round(body.position.x),
      position_y: Math.round(body.position.y),
      created_at: new Date(body.createdAt).toISOString(),
      color: body.color || `hsl(${Math.random() * 360}, 70%, 80%)`,
      owner_id: body.ownerId,
      message_number: body.messageNumber
    };

    const { data, error } = await supabase
      .from('messages')
      .insert([newMessage])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    const transformedData = {
      ...data,
      position: {
        x: data.position_x,
        y: data.position_y
      },
      ownerId: data.owner_id,
      createdAt: new Date(data.created_at).getTime(),
      messageNumber: data.message_number
    };

    return NextResponse.json(transformedData);
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

    const { data: message, error: fetchError } = await supabase
      .from('messages')
      .select()
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;
    if (message.owner_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('messages')
      .update(updates)
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { messageId, userId } = await request.json();

    const { data: message, error: fetchError } = await supabase
      .from('messages')
      .select()
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;
    if (message.owner_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
} 