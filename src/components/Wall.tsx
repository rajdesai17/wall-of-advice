'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Message } from '@/types';
import MessageComponent from './MessageComponent';
import MessageModal from './MessageModal';
import { memo } from 'react';

const Wall = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('wall-user-id') || crypto.randomUUID();
  });

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddMessage = useCallback(async (content: string, author?: string) => {
    const messageId = crypto.randomUUID();
    const newMessage = {
      id: messageId,
      content,
      author,
      position: {
        x: Math.random() * 80, // Random position within grid
        y: Math.random() * 80
      },
      ownerId: userId,
      color: `hsl(${Math.random() * 360}, 85%, 85%)`,
      createdAt: Date.now(),
      messageNumber: messages.length + 1
    };

    try {
      setMessages(prev => [...prev, newMessage]);
      setIsModalOpen(false);

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) throw new Error('Failed to save message');
      const savedMessage = await response.json();
      setMessages(prev => 
        prev.map(msg => msg.id === messageId ? savedMessage : msg)
      );
    } catch (error) {
      console.error('Error adding message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setError('Failed to add message. Please try again.');
    }
  }, [messages.length, userId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <div className="text-xl text-gray-600">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Wall of Advice
        </h1>
        <p className="text-gray-600 mb-6">Share your words of wisdom</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-md"
        >
          Add Your Message
        </button>
      </header>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            message={message}
            userId={userId}
          />
        ))}
      </div>

      {/* Add Message Modal */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMessage}
      />
    </div>
  );
};

export default memo(Wall);