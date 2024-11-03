export interface Message {
  id: string;
  content: string;
  author?: string;
  position: {
    x: number;
    y: number;
  };
  ownerId: string;
  color: string;
  createdAt: number;
  messageNumber: number;
} 