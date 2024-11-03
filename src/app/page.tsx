'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Dialog } from '@headlessui/react';

interface Message {
  id: number;
  content: string;
  author?: string;
  createdAt: number;
  position: {
    x: number;
    y: number;
  };
  color: string;
  messageNumber: number;
  ownerId: string;
}

// Memoized Message component
const MessageItem = memo(({ message }: { message: Message }) => (
  <div 
    className="absolute p-4 bg-white rounded-lg shadow-lg max-w-sm message cursor-default hover:shadow-xl transition-shadow duration-200"
    style={{
      left: message.position.x,
      top: message.position.y,
      backgroundColor: message.color,
      transform: 'translate(-50%, -50%)',
      opacity: '0.9'
    }}
  >
    <div 
      className="absolute -top-3 left-4 text-gray-600"
      style={{ 
        fontSize: '50%',
        opacity: '0.6'
      }}
    >
      #{message.messageNumber}
    </div>

    <p className="text-gray-800 text-base">{message.content}</p>
    {message.author && (
      <p className="text-sm text-gray-600 mt-2 italic opacity-70" style={{ fontSize: '80%' }}>
        ~ {message.author} was here
      </p>
    )}
  </div>
));

MessageItem.displayName = 'MessageItem';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [wallSize, setWallSize] = useState({ width: 10000, height: 10000 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const [userId] = useState(() => {
    // Generate or retrieve user ID
    const stored = localStorage.getItem('wall-user-id');
    if (stored) return stored;
    const newId = Math.random().toString(36).substring(2);
    localStorage.setItem('wall-user-id', newId);
    return newId;
  });
  const [showInfo, setShowInfo] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);

  // Fetch messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
          adjustWallSizeForMessages(data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const adjustWallSizeForMessages = useCallback((msgs: Message[]) => {
    const padding = 2000;
    const maxX = Math.max(...msgs.map(m => m.position.x), 0);
    const maxY = Math.max(...msgs.map(m => m.position.y), 0);
    setWallSize(current => ({
      width: Math.max(current.width, maxX + padding),
      height: Math.max(current.height, maxY + padding)
    }));
  }, []);

  const expandWallIfNeeded = useCallback((x: number, y: number) => {
    const expandThreshold = 1000;
    const expandAmount = 2000;

    setWallSize(current => {
      const newWidth = x > current.width - expandThreshold 
        ? current.width + expandAmount 
        : current.width;
      const newHeight = y > current.height - expandThreshold 
        ? current.height + expandAmount 
        : current.height;

      return newWidth !== current.width || newHeight !== current.height
        ? { width: newWidth, height: newHeight }
        : current;
    });
  }, []);

  const handleWallClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.message')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPosition({ x, y });
    setIsWriting(true);
    expandWallIfNeeded(x, y);
  }, [expandWallIfNeeded]);

  const handleTextSubmit = useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = e.currentTarget.value.trim();
      
      if (text) {
        const matches = text.match(/(.*?)(?:#(\w+))?$/);
        const content = matches?.[1]?.trim() || text;
        const author = matches?.[2] || undefined;

        const newMessage: Message = {
          content,
          author,
          id: Date.now(),
          createdAt: Date.now(),
          position: currentPosition,
          color: `hsl(${Math.random() * 360}, 70%, 80%)`,
          messageNumber: messages.length + 1,
          ownerId: userId
        };

        try {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage),
          });

          if (response.ok) {
            setMessages(prev => [...prev, newMessage]);
            expandWallIfNeeded(currentPosition.x, currentPosition.y);
          }
        } catch (error) {
          console.error('Failed to save message:', error);
        }

        setIsWriting(false);
      }
    }
  }, [currentPosition, expandWallIfNeeded, messages.length, userId]);

  const handleTransform = useCallback(({ state }: any) => {
    if (!wallRef.current) return;

    const { positionX, positionY, scale } = state;
    const visibleRight = Math.abs(positionX / scale) + window.innerWidth / scale;
    const visibleBottom = Math.abs(positionY / scale) + window.innerHeight / scale;

    expandWallIfNeeded(visibleRight, visibleBottom);
  }, [expandWallIfNeeded]);

  return (
    <div className="fixed inset-0 bg-gray-50">
      {/* Floating Header Section */}
      <div className="fixed top-6 inset-x-0 z-50">
        {/* Main Title with Info Links */}
        <div className="container mx-auto px-4">
          <div className="relative flex justify-center">
            <div className="absolute left-4">
              <button 
                onClick={() => setShowInfo(true)}
                className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors"
              >
                What is Wall of Advice?
              </button>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-3xl font-semibold text-gray-800 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                Words of Advice
              </h1>
              
              {/* Centered Creator Credit */}
              <div 
                className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full shadow-md"
                style={{ opacity: '0.6' }}
              >
                made with ❤️
              </div>
            </div>

            <div className="absolute right-8">
              <button 
                onClick={() => setShowHowTo(true)}
                className="text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors"
              >
                How to Use?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <Dialog 
        open={showInfo} 
        onClose={() => setShowInfo(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
               style={{
                 background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
                 border: '1px solid rgba(255,255,255,0.5)'
               }}>
            <Dialog.Title className="text-2xl font-medium text-gray-900 mb-4">
              Welcome to Wall of Advice ✨
            </Dialog.Title>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                This is your cozy corner of the internet where strangers leave little nuggets of wisdom for each other. Like finding notes in your favorite book, or stumbling upon exactly the words you needed to hear.
              </p>
              
              <p>
                Click anywhere, share your thoughts, and maybe your words will be just what someone else needs today. No logins, no fuss - just humans being human.
              </p>
              
              <p className="italic">
                Leave a piece of your story, take a piece of inspiration. Welcome home! ✨
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setShowInfo(false)}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* How to Use Modal */}
      <Dialog 
        open={showHowTo} 
        onClose={() => setShowHowTo(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
               style={{
                 background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
                 border: '1px solid rgba(255,255,255,0.5)'
               }}>
            <Dialog.Title className="text-2xl font-medium text-gray-900 mb-4">
              How to Share Your Thoughts 📝
            </Dialog.Title>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">1.</span>
                <p>Click anywhere on the wall to add your message (yep, literally anywhere!)</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">2.</span>
                <p>Write whatever's on your mind - advice, thoughts, or maybe just a kind word</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">3.</span>
                <p>Want to sign it? Just add #yourname at the end of your message</p>
              </div>

              <p className="italic mt-4 text-sm text-gray-500">
                Press Enter to save your message, or click away to cancel ✨
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setShowHowTo(false)}
              >
                Ready to Write!
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={3}
        limitToBounds={false}
        wheel={{ 
          step: 0.02,
          disabled: false
        }}
        centerZoomedOut={false}
        centerOnInit={false}
        panning={{ velocityDisabled: true }}
        onTransformed={handleTransform}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
        >
          <div 
            ref={wallRef}
            className="relative cursor-default"
            onClick={handleWallClick}
            style={{
              width: `${wallSize.width}px`,
              height: `${wallSize.height}px`,
              background: `
                linear-gradient(to right, #f8fafc 1px, transparent 1px),
                linear-gradient(to bottom, #f8fafc 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundColor: '#ffffff',
              backgroundPosition: 'center center',
              boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.03)',
              transition: 'width 0.2s ease-out, height 0.2s ease-out'
            }}
          >
            {messages.map(msg => (
              <MessageItem key={msg.id} message={msg} />
            ))}

            {isWriting && (
              <textarea
                ref={textareaRef}
                autoFocus
                className="absolute p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg max-w-sm resize-none cursor-text"
                style={{
                  left: currentPosition.x,
                  top: currentPosition.y,
                  transform: 'translate(-50%, -50%)',
                  minWidth: '200px',
                  minHeight: '100px',
                  border: 'none',
                  outline: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                placeholder="Type your message here... (Add #yourname at the end)"
                onKeyDown={handleTextSubmit}
                onBlur={() => setIsWriting(false)}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
} 