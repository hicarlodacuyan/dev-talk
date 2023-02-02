import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Chat {
  id: string;
  user: string;
  content: string;
  likes: number;
}

function App() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function getInitialChats() {
      const response: AxiosResponse<Chat[]> = await axios.get(
        'http://localhost:3001/api/chats'
      );
      const chats: Chat[] = response.data.map(
        ({ id, user, content, likes }) => ({
          id,
          user,
          content,
          likes
        })
      );

      setChats(chats);
    }

    void getInitialChats();
  }, []);

  return (
    <ul>
      {chats.map((chat) => (
        <li key={chat.id} className="text-3xl font-bold">
          {chat.content}
        </li>
      ))}
    </ul>
  );
}

export default App;
