export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatBotProps {
  title?: string;
  placeholder?: string;
  className?: string;
  theme?: 'light' | 'dark';
  onMessageSent?: (message: string) => void;
  customBotLogic?: (message: string) => Promise<string>;
}

export interface BotResponse {
  text: string;
  delay?: number;
}