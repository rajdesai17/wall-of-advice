export interface Message {
  id: string;
  content: string;
  author?: string;
  position_x: number;
  position_y: number;
  created_at: string;
  color: string;
  owner_id: string;
  message_number: number;
}

export interface MessagePosition {
  x: number;
  y: number;
} 