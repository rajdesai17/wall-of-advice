'use client';

import React from 'react';

const NewMessageButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 
                 text-white rounded-full shadow-lg flex items-center justify-center 
                 text-2xl font-bold transition-transform hover:scale-110 z-50"
      aria-label="Add new message"
    >
      <span>+</span>
    </button>
  );
};

export default NewMessageButton; 