'use client';

import React, { useState, useEffect } from 'react';
import type { Message } from '@/types';
import MessageComponent from './MessageComponent';
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
  const [messages, setMessages] = useState<Message[]>([]);
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

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
        return;
      }
      console.error('Runtime error:', error);
      setError(error.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
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

    const transformWrapper = e.currentTarget.closest('.react-transform-wrapper');
    const transformComponent = e.currentTarget.closest('.react-transform-component');
    
    if (!transformWrapper || !transformComponent) return;

    // Get the transform matrix
    const transform = window.getComputedStyle(transformWrapper).transform;
    const matrix = new DOMMatrix(transform);
    const scale = matrix.a;

    // Get click coordinates relative to the transform component
    const rect = transformComponent.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Calculate the actual position on the canvas, accounting for the -5000px offset
    const x = (offsetX / scale) + 5000;
    const y = (offsetY / scale) + 5000;

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
    const messageId = crypto.randomUUID();
    const newMessage = {
      id: messageId,
      content,
      author,
      position: {
        x: Math.round(clickPosition.message.x),
        y: Math.round(clickPosition.message.y)
      },
      ownerId: userId,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
      createdAt: Date.now(),
      messageNumber: messages.length + 1
    };

    try {
      setMessages(prev => [...prev, newMessage]);
      setIsModalOpen(false);

      console.log('Sending message:', newMessage);

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.details || 'Failed to add message');
      }

      console.log('Message saved successfully:', data);

      setMessages(prev => 
        prev.map(msg => msg.id === messageId ? data : msg)
      );
    } catch (error) {
      console.error('Error adding message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setError('Failed to add message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <div className="text-xl text-gray-600">Revealing the Wall...</div>
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
      <header className="header-container">
        <div className="header-gradient" />
        <div className="header-content">
          <div className="header-layout">
            <button 
              className="header-button text-sm bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/95 transition-colors"
              onClick={() => setShowInfo(true)}
            >
              What is Wall of Advice?
            </button>

            <div className="title-container bg-white/90 backdrop-blur-sm px-6 py-2 rounded-2xl shadow-md">
              <h1 className="text-3xl font-semibold text-gray-800">
                Words of Advice
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                made with ❤️
              </div>
            </div>

            <button 
              className="header-button text-sm bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/95 transition-colors"
              onClick={() => setShowHowTo(true)}
            >
              How to Use?
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <TransformWrapper
          limitToBounds={false}
          minScale={0.1}
          maxScale={3}
          initialScale={0.8}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          doubleClick={{ disabled: true }}
          smooth={true}
          alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
          velocityAnimation={{ sensitivity: 1 }}
          initialPositionX={0}
          initialPositionY={0}
        >
          {(props: ReactZoomPanPinchContentRef) => (
            <>
              {/* Zoom Controls - Updated z-index */}
              <div className="fixed bottom-6 left-6 z-[9998] flex gap-2">
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
                  height: "100vh"
                }}
              >
                <div
                  className="relative bg-gray-50"
                  style={{
                    width: '100%',
                    height: '100%',
                    minWidth: '10000px',
                    minHeight: '10000px',
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    transformOrigin: 'center center',
                    position: 'absolute',
                    left: '-5000px',
                    top: '-5000px'
                  }}
                  onClick={handleWallClick}
                >
                  {messages.map((message) => (
                    <MessageComponent 
                      key={message.id} 
                      message={message} 
                      userId={userId}
                      onPositionUpdate={(id: string, pos: { x: number; y: number }) => {
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