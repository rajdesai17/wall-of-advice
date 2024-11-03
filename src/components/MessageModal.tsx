'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, author?: string) => void;
  position: { x: number; y: number };
}

export default function MessageModal({ isOpen, onClose, onSubmit, position }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matches = content.match(/(.*?)(?:#(\w+))?$/);
    const messageContent = matches?.[1]?.trim() || content;
    const author = matches?.[2];
    
    if (messageContent.trim()) {
      onSubmit(messageContent, author);
      setContent('');
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div 
          className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          style={{
            position: 'relative',
            top: position.y > window.innerHeight / 2 ? '-100px' : '100px'
          }}
        >
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Add your message
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-4">
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
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Add Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
} 