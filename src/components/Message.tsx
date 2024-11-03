'use client';

import React from 'react';
import type { Message as MessageType } from '@/types';

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  const handleDragEnd = async (event: any, info: any) => {
    const newPosition = {
      x: message.position.x + info.offset.x,
      y: message.position.y + info.offset.y,
    };

    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messageId: message.id,
        userId: localStorage.getItem('wall-user-id'),
        updates: { position: newPosition }
      }),
    });
  };

  return (
    <div
      className="absolute max-w-xs p-4 rounded-lg shadow-lg cursor-move bg-white/90 backdrop-blur-sm"
      style={{
        left: message.position.x,
        top: message.position.y,
        transform: 'translate(-50%, -50%)',
        backgroundColor: message.color
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