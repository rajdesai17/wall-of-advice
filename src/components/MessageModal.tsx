'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, author?: string) => void;
}

export default function MessageModal({ isOpen, onClose, onSubmit }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
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
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl modal-enter">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Share Your Message
          </Dialog.Title>

          <div className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your message here... (Add #yourname at the end to sign)"
              rows={4}
              autoFocus
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              Share Message
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 