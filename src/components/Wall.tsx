'use client';

import React, { useState, useEffect } from 'react';
import type { Message } from '@/types';
import Message from './Message';
import NewMessageButton from './NewMessageButton';
import MessageModal from './MessageModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Wall = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
  };

  const handleWallClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setClickPosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsModalOpen(true);
    }
  };

  const handleAddMessage = async (content: string, author?: string) => {
    const newMessage = {
      content,
      author,
      position: clickPosition,
      createdAt: Date.now(),
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    };

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      fetchMessages();
      setIsModalOpen(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <TransformWrapper
        limitToBounds={false}
        minScale={0.1}
        maxScale={2}
        initialScale={1}
      >
        <TransformComponent>
          <div
            className="w-[5000px] h-[5000px] bg-gray-50"
            onClick={handleWallClick}
          >
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <NewMessageButton onClick={() => setIsModalOpen(true)} />
      
      {mounted && (
        <MessageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddMessage}
        />
      )}
    </div>
  );
};

export default Wall; 