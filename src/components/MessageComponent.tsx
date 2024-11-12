'use client';

import React, { memo } from 'react';
import type { Message as MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
  userId: string;
  onPositionUpdate: (id: string, pos: { x: number; y: number }) => void;
}

const MessageComponent = memo(({ message, userId, onPositionUpdate }: MessageProps) => {
  return (
    <div
      className="message absolute p-4 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 transition-shadow hover:shadow-xl"
      style={{
        left: message.position.x,
        top: message.position.y,
        maxWidth: '300px',
        minWidth: '200px',
        backgroundColor: message.color,
        zIndex: 10
      }}
    >
      <div className="absolute -top-3 left-4 bg-white/50 px-2 py-0.5 rounded-full text-xs text-gray-600">
        #{message.messageNumber}
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-800 whitespace-pre-wrap break-words">
          {message.content}
        </p>
        
        {message.author && (
          <p className="text-sm text-gray-600 italic">
            ~ {message.author}
          </p>
        )}
      </div>
    </div>
  );
});

MessageComponent.displayName = 'MessageComponent';

export default MessageComponent; 