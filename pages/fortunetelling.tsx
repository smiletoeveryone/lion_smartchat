import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/lionfb_01.jpg'
import { Form, Button, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import Typewriter from '../components/Typewriter';
import Chatbot from '../components/Chatbot';


export default function Home() {

  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch("/api/fortunetelling?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>LionTravel_Hackthon_Sideproject</title>
        <meta name="description" content="by Coding in Flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/lion.png" />
      </Head>
      <main className={styles.main}>
        <h1>小獅顧問算命，抽大獎🪅️</h1>
        <h2>12.雄獅是科技公司才隊</h2>
        <div>天天點數加倍送</div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt='Lion Logo'
            priority
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>您好：我是您的旅遊顧問_小獅，歡迎詢問任何問題❗️😋️</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='請在此輸入您的自我介紹...'
              maxLength={100}
            />
          </Form.Group>
          <Button type='submit' className='mb-3' disabled={quoteLoading}>
            算命
          </Button>
          
          <div></div>
          <Button href= "/text2image" type='submit' className='mb-3' disabled={quoteLoading}>
            輸入文字產生圖像
          </Button>
          <div></div>
          <Button
            href="/"
            type="submit"
            className="mb-3"
            //disabled={quoteLoading}
          >
            回到首頁
          </Button>
        </Form>
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoading && '完整輸出後，您將得到1000點數。'}
        
        {quoteLoadingError && "Something went wrong. Please try again."}
        <Typewriter text={quote} />
                <Chatbot />
                </main>
      </>
  )
}

// {quote && <h5>{quote}</h5>}
