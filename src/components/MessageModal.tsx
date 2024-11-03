'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, author?: string) => void;
  position: {
    modal: { x: number; y: number };
    message: { x: number; y: number };
  };
}

export default function MessageModal({ isOpen, onClose, onSubmit, position }: Props) {
  const [content, setContent] = useState('');

  const getModalStyle = () => {
    const padding = 20;
    const modalWidth = 400;
    const modalHeight = 300;
    
    let x = position.modal.x;
    let y = position.modal.y;

    // Ensure modal stays within viewport
    if (x + modalWidth + padding > window.innerWidth) {
      x = window.innerWidth - modalWidth - padding;
    }
    if (x < padding) {
      x = padding;
    }
    if (y + modalHeight + padding > window.innerHeight) {
      y = window.innerHeight - modalHeight - padding;
    }
    if (y < padding) {
      y = padding;
    }

    return {
      position: 'fixed' as const,
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div 
          className="absolute w-full max-w-md bg-white rounded-xl shadow-lg"
          style={getModalStyle()}
        >
          <div className="p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Add your message
            </Dialog.Title>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your message here... (Add #yourname at the end to sign)"
              rows={4}
              autoFocus
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const matches = content.match(/(.*?)(?:#(\w+))?$/);
                  const messageContent = matches?.[1]?.trim() || content;
                  const author = matches?.[2];
                  if (messageContent.trim()) {
                    onSubmit(messageContent, author);
                    setContent('');
                  }
                }}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Add Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 