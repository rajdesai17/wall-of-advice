import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, onSnapshot, where } from 'firebase/firestore';
import { Message } from '@/types';

export const messageCollection = collection(db, 'messages');

export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
  const q = query(messageCollection);
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
};

export const addMessage = async (message: Omit<Message, 'id'>) => {
  const docRef = await addDoc(messageCollection, {
    ...message,
    createdAt: Date.now()
  });
  return docRef.id;
};

export const updateMessage = async (id: string, updates: Partial<Message>) => {
  const messageRef = doc(db, 'messages', id);
  await updateDoc(messageRef, updates);
};

export const deleteMessage = async (id: string) => {
  const messageRef = doc(db, 'messages', id);
  await deleteDoc(messageRef);
};

// Local storage for message ownership
export const storeMessageOwnership = (messageId: string) => {
  const ownedMessages = JSON.parse(localStorage.getItem('ownedMessages') || '[]');
  localStorage.setItem('ownedMessages', JSON.stringify([...ownedMessages, messageId]));
};

export const isMessageOwner = (messageId: string) => {
  const ownedMessages = JSON.parse(localStorage.getItem('ownedMessages') || '[]');
  return ownedMessages.includes(messageId);
}; 