import { useState, useEffect } from "react";

const Typewriter = ({ text }: { text: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < text.length) {
        setCount(count + 1);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [count, text.length]);

  return <div>{text.substring(0, count)}</div>;
};

export default Typewriter;
