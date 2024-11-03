'use client';

import React from 'react';
import type { Message as MessageType } from '@/types';

interface Props {
  message: MessageType;
  userId: string;
}

const Message = ({ message, userId }: Props) => {
  const handleDragEnd = async (event: any, info: any) => {
    if (message.ownerId !== userId) return;

    const newPosition = {
      x: message.position.x + info.offset.x,
      y: message.position.y + info.offset.y,
    };

    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: message.id,
          userId,
          updates: { position: newPosition }
        }),
      });
    } catch (error) {
      console.error('Failed to update message position:', error);
    }
  };

  return (
    <div
      className="absolute max-w-xs p-4 rounded-lg shadow-lg cursor-move bg-white/90 backdrop-blur-sm"
      style={{
        left: message.position.x,
        top: message.position.y,
        transform: 'translate(-50%, -50%)',
        backgroundColor: message.color,
        cursor: message.ownerId === userId ? 'move' : 'default'
      }}
    >
      <p className="text-gray-800">{message.content}</p>
      {message.author && (
        <p className="mt-2 text-sm text-gray-500 italic">
          - {message.author}
        </p>
      )}
    </div>
  );
};

export default Message; 