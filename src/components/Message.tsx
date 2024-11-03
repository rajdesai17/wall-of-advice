'use client';

import React from 'react';
import type { Message as MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
  userId: string;
  onPositionUpdate: (messageId: string, position: { x: number; y: number }) => void;
}

const Message: React.FC<MessageProps> = ({ message, userId, onPositionUpdate }) => {
  return (
    <div
      className="absolute p-4 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm"
      style={{
        left: `${message.position.x}px`,
        top: `${message.position.y}px`,
        transform: 'translate(-50%, -50%)',
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
};

export default Message; 