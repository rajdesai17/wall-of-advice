'use client';

import React, { useState, useEffect } from 'react';
import type { Message as MessageType } from '@/types';
import Message from './Message';
import NewMessageButton from './NewMessageButton';
import MessageModal from './MessageModal';
import { 
  TransformWrapper, 
  TransformComponent,
  ReactZoomPanPinchRef,
  ReactZoomPanPinchContentRef
} from 'react-zoom-pan-pinch';
import { Dialog } from '@headlessui/react';
import InfoModal from './InfoModal';
import HowToModal from './HowToModal';

interface TransformWrapperRenderProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

const Wall = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    modal: { x: number; y: number };
    message: { x: number; y: number };
  }>({
    modal: { x: 0, y: 0 },
    message: { x: 0, y: 0 }
  });
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
  const [showInfo, setShowInfo] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleWallClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.message')) {
      return;
    }

    const transformWrapper = e.currentTarget.closest('.react-transform-wrapper') as HTMLElement;
    const transformComponent = e.currentTarget.closest('.react-transform-component') as HTMLElement;
    
    if (!transformWrapper || !transformComponent) return;

    const transform = window.getComputedStyle(transformWrapper).transform;
    const matrix = new DOMMatrix(transform);
    const scale = matrix.a;
    
    const rect = transformComponent.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    setClickPosition({
      modal: {
        x: e.clientX,
        y: e.clientY
      },
      message: {
        x: x,
        y: y
      }
    });
    
    setIsModalOpen(true);
  };

  const handleAddMessage = async (content: string, author?: string) => {
    const newMessage: MessageType = {
      id: crypto.randomUUID(),
      content,
      author,
      position: clickPosition.message,
      ownerId: userId,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
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

      if (!response.ok) {
        throw new Error('Failed to add message');
      }
    } catch (error) {
      console.error('Error adding message:', error);
      setError('Failed to add message. Please try again.');
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => fetchMessages()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8 max-w-4xl mx-auto">
            <button 
              className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors pointer-events-auto"
              onClick={() => setShowInfo(true)}
            >
              What is Wall of Advice?
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-800">
                Words of Advice
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                made with ❤️
              </div>
            </div>

            <button 
              className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors pointer-events-auto"
              onClick={() => setShowHowTo(true)}
            >
              How to Use?
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 h-full">
        <TransformWrapper
          limitToBounds={false}
          minScale={0.5}
          maxScale={2}
          initialScale={1}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          doubleClick={{ disabled: true }}
        >
          {(props: ReactZoomPanPinchContentRef) => (
            <>
              {/* Zoom Controls */}
              <div className="fixed bottom-6 left-6 z-50 flex gap-2">
                <button
                  onClick={() => props.zoomIn()}
                  className="w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center text-xl"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={() => props.zoomOut()}
                  className="w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center text-xl"
                  aria-label="Zoom out"
                >
                  -
                </button>
                <button
                  onClick={() => props.resetTransform()}
                  className="w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center text-xl"
                  aria-label="Reset view"
                >
                  ↺
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "calc(100vh - 6rem)"
                }}
              >
                <div
                  className="relative bg-gray-50"
                  style={{
                    width: '100%',
                    height: '100%',
                    minWidth: '3000px',
                    minHeight: '3000px',
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    transformOrigin: 'center center'
                  }}
                  onClick={handleWallClick}
                >
                  {messages.map((message) => (
                    <Message 
                      key={message.id} 
                      message={message} 
                      userId={userId}
                      onPositionUpdate={(id, pos) => {
                        setMessages(prev => 
                          prev.map(msg => 
                            msg.id === id 
                              ? { ...msg, position: pos }
                              : msg
                          )
                        );
                      }}
                    />
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </main>

      {/* Modals */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(content, author) => handleAddMessage(content, author)}
        position={clickPosition}
      />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
      />
      <HowToModal
        isOpen={showHowTo}
        onClose={() => setShowHowTo(false)}
      />
    </div>
  );
};

export default Wall;