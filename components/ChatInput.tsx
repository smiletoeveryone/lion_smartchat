// components/ChatInput.tsx

import { ChangeEvent, FormEvent, useState } from 'react';

type ChatInputProps = {
  onSubmit: (message: string) => void;
};

const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;

