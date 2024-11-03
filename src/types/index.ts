export interface Message {
  id: string;
  content: string;
  author?: string;
  createdAt: number;
  position: {
    x: number;
    y: number;
  };
  color: string;
  messageNumber: number;
  ownerId: string;
} 