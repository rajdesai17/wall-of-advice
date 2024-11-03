export interface Message {
  id: string;
  content: string;
  author?: string;
  position: {
    x: number;
    y: number;
  };
  createdAt: number;
  color: string;
  messageNumber: number;
  ownerId: string;
} 