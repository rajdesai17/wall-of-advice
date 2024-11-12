'use client';

import React from 'react';
import type { Message } from '@/types';

interface MessageComponentProps {
  message: Message;
  userId: string;
}

const MessageComponent = ({ message, userId }: MessageComponentProps) => {
  const isOwner = message.ownerId === userId;

  return (
    <div
      className="group relative p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: message.color,
      }}
    >
      <p className="text-gray-800 text-lg mb-4 whitespace-pre-wrap">
        {message.content}
      </p>
      {message.author && (
        <p className="text-gray-600 text-sm italic">
          - {message.author}
        </p>
      )}
      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
        #{message.messageNumber}
      </div>
    </div>
  );
};

export default React.memo(MessageComponent); 