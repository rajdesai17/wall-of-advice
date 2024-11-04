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
  ownerId: string;
  messageNumber: number;
}

export interface MessagePosition {
  x: number;
  y: number;
} 