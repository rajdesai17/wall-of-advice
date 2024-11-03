'use client';

import { Dialog } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: Props) {
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
            Welcome to Wall of Advice ✨
          </Dialog.Title>
          <div className="mt-2 space-y-4">
            <p className="text-gray-600">
              This is your cozy corner of the internet where strangers leave little nuggets of wisdom for each other.
            </p>
            <p className="text-gray-600">
              Like finding notes in your favorite book, or stumbling upon exactly the words you needed to hear.
            </p>
            <p className="text-gray-600 italic">
              Leave a piece of your story, take a piece of inspiration. Welcome home! ✨
            </p>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={onClose}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 