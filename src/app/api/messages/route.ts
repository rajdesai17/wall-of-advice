import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { headers } from 'next/headers';

async function getMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data?.map(message => ({
    id: message.id,
    content: message.content,
    author: message.author,
    position: {
      x: message.position_x,
      y: message.position_y
    },
    createdAt: new Date(message.created_at).getTime(),
    color: message.color,
    ownerId: message.owner_id,
    messageNumber: message.message_number
  })) ?? [];
}

export async function GET() {
  const headersList = headers();
  const referer = headersList.get('referer');

  const response = NextResponse.json(await getMessages());
  response.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate');
  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newMessage = {
      id: body.id || crypto.randomUUID(),
      content: body.content,
      author: body.author || null,
      position_x: Math.round(body.position.x),
      position_y: Math.round(body.position.y),
      created_at: new Date().toISOString(),
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
      id: data.id,
      content: data.content,
      author: data.author,
      position: {
        x: data.position_x,
        y: data.position_y
      },
      createdAt: new Date(data.created_at).getTime(),
      color: data.color,
      ownerId: data.owner_id,
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