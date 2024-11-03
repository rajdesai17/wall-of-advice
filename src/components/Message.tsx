'use client';

import React from 'react';
import type { Message as MessageType } from '@/types';

interface Props {
  message: MessageType;
  userId: string;
}

const Message = ({ message, userId }: Props) => {
  return (
    <div
      className="absolute p-4 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-xl"
      style={{
        left: `${message.position.x}px`,
        top: `${message.position.y}px`,
        transform: 'translate(-50%, -50%)',
        maxWidth: '300px',
        backgroundColor: message.color,
        cursor: message.ownerId === userId ? 'move' : 'default',
        zIndex: 10
      }}
    >
      <div className="absolute -top-3 left-4 bg-white/50 px-2 py-0.5 rounded-full text-xs text-gray-600">
        #{message.messageNumber}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap break-words">{message.content}</p>
      {message.author && (
        <p className="mt-2 text-sm text-gray-600 italic">
          ~ {message.author}
        </p>
      )}
    </div>
  );
};

export default Message; 