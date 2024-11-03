'use client';

import React, { useState, useEffect } from 'react';
import type { Message as MessageType } from '@/types';
import Message from './Message';
import NewMessageButton from './NewMessageButton';
import MessageModal from './MessageModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Wall = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [userId] = useState(() => {
    if (typeof window === 'undefined') return '';
    const stored = localStorage.getItem('wall-user-id');
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem('wall-user-id', newId);
    return newId;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages');
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWallClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsModalOpen(true);
    }
  };

  const handleAddMessage = async (content: string, author?: string) => {
    try {
      const newMessage = {
        content,
        author,
        position: clickPosition,
        createdAt: Date.now(),
        color: `hsl(${Math.random() * 360}, 70%, 80%)`,
        ownerId: userId
      };

      console.log('Sending message:', newMessage);

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        await fetchMessages();
        setIsModalOpen(false);
      } else {
        const error = await response.json();
        console.error('Error response:', error);
      }
    } catch (error) {
      console.error('Failed to add message:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors"
                onClick={() => setShowInfo(true)}
              >
                What is Wall of Advice?
              </button>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
              Words of Advice
            </h1>

            <div className="flex items-center gap-4">
              <button 
                className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors"
                onClick={() => setShowHowTo(true)}
              >
                How to Use?
              </button>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full shadow-md opacity-60">
              made with ❤️
            </span>
          </div>
        </div>
      </div>

      <div className="pt-32 h-full">
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
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            >
              {messages.map((message) => (
                <Message key={message.id} message={message} userId={userId} />
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMessage}
      />
    </div>
  );
};

export default Wall;