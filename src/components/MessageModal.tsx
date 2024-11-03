'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, author?: string) => void;
}

export default function MessageModal({ isOpen, onClose, onSubmit }: Props) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim(), author.trim() || undefined);
      setContent('');
      setAuthor('');
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
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title className="text-lg font-medium text-gray-900 font-happy-monkey">
            Add your message
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-md font-happy-monkey"
              placeholder="Write your message..."
              rows={4}
              autoFocus
            />
            
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md font-happy-monkey"
              placeholder="Your name (optional)"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-happy-monkey"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 font-happy-monkey"
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