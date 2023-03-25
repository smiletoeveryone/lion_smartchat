// components/AutoReplyBot.ts

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

