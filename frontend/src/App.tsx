import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import './App.css';

interface Message {
  message: string;
}

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function getInitialMessage(): Promise<string> {
      const response: AxiosResponse<Message> = await axios.get(
        'http://localhost:3001/'
      );
      const messageText: string = response.data.message;

      return messageText;
    }

    async function fetchMessage() {
      const data = await getInitialMessage();
      setMessage(data);
    }

    void fetchMessage();
  }, []);

  return <div>{message}</div>;
}

export default App;
