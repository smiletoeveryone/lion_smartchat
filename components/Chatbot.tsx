// components/Chatbot.tsx

import { useState } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';


const responses = [
  "Hello! How can I help you?",
  "I'm not sure about that. Can you please clarify?",
  "Thanks for your message. I'll get back to you soon.",
  "I'm here to help. What do you need?",
  "Can you please provide more information?"
];

export const getAutoReply = (): string => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};


type Message = {
  content: string;
  sender: 'user' | 'bot';
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    setMessages([...messages, { content: message, sender: 'user' }]);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: message,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      const botResponse = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
    }
  };

  return (
    <div className="container">
      <h1>旅遊顧問_小獅 Chatbot</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            sender={message.sender}
          />
        ))}
      </div>
      <ChatInput onSubmit={handleSendMessage}/>
      
      
      
    </div>
  );
};

export default Chatbot;

