// components/ChatMessage.tsx

type ChatMessageProps = {
  message: string;
  sender: 'user' | 'bot';
};

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  return (
    <div className={`chat-message ${sender}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;

