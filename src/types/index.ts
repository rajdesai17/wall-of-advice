export interface Message {
  id: number;
  content: string;
  author?: string;
  createdAt: number;
  position: {
    x: number;
    y: number;
  };
  color: string;
  messageNumber: number;
} 