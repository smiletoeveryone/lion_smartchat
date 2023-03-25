import { useState, useCallback } from "react";
import Head from "next/head";
import axios from "axios";
import { Form, Button, Spinner } from 'react-bootstrap'

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
        <div></div>
        <button onClick={handleGenerateImage} type="submit" className="mb-3">輸出圖像</button>
        
        {imageUrl && <img src={imageUrl} alt="Generated Image" />}
        <div></div>
        <Button
            href="/"
            type="submit"
            className="mb-3"
            //disabled={quoteLoading}
          >
            回到首頁
          </Button>
          
        
        
      </div>
    </>
  );
};

export default TextToImage;

