'use client';

import { Dialog } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToModal({ isOpen, onClose }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title className="text-2xl font-medium text-gray-900 mb-4">
            How to Use 📝
          </Dialog.Title>
          <div className="mt-2 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">1.</span>
              <p className="text-gray-600">Click anywhere on the wall to add your message</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">2.</span>
              <p className="text-gray-600">Write your message - it can be advice, thoughts, or just kind words</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">3.</span>
              <p className="text-gray-600">Add #yourname at the end if you want to sign it</p>
            </div>
            <p className="text-gray-500 italic mt-4">
              Press Enter to save your message, or click away to cancel
            </p>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={onClose}
            >
              Ready to Write!
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 