import { useState, useCallback } from "react";
import Head from "next/head";
import axios from "axios";

const TextToImage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleGenerateImage = useCallback(async () => {
    try {
      const response = await axios.post("/api/text2image_api", { text });
      setImageUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  }, [text]);

  return (
    <>
      <Head>
        <title>Text to Image</title>
      </Head>
      <div>
        <h1>Text to Image</h1>
        <textarea value={text} onChange={handleTextChange} />
        <button onClick={handleGenerateImage}>Generate Image</button>
        {imageUrl && <img src={imageUrl} alt="Generated Image" />}
      </div>
    </>
  );
};

export default TextToImage;

