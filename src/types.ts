export interface Message {
  party: string;
  text: string;
}

export interface messagesProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
