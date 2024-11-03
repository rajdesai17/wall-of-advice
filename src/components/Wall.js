import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import Message from './Message';
import NewMessageButton from './NewMessageButton';
import MessageModal from './MessageModal';

const Wall = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const q = query(collection(db, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData = [];
      snapshot.forEach((doc) => {
        messageData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, []);

  const handleWallClick = (e) => {
    if (e.target === e.currentTarget) {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div 
      className="wall"
      onClick={handleWallClick}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <NewMessageButton onClick={() => setIsModalOpen(true)} />
      <MessageModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={position}
      />
    </div>
  );
};

export default Wall; 