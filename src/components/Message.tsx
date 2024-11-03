'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Message as MessageType } from '../types';

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  const handleDragEnd = async (event: any, info: any) => {
    const newPosition = {
      x: message.position.x + info.offset.x,
      y: message.position.y + info.offset.y,
    };

    await fetch(`/api/messages?id=${message.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position: newPosition }),
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ x: message.position.x, y: message.position.y }}
      className="absolute max-w-xs p-4 rounded-lg shadow-lg cursor-move bg-white/90 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="text-gray-800 font-happy-monkey">{message.content}</p>
      {message.author && (
        <p className="mt-2 text-sm text-gray-500 font-happy-monkey italic">
          - {message.author}
        </p>
      )}
    </motion.div>
  );
};

export default Message; 