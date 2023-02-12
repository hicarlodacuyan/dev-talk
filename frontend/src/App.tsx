import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Company {
  id: string;
  user: string;
  description: string;
  likes: number;
  chats: Array<any>;
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompany, setNewCompany] = useState('');

  useEffect(() => {
    void getInitialCompanies();
  }, []);

  async function getInitialCompanies() {
    const response: AxiosResponse<Company[]> = await axios.get(
      'http://localhost:3001/api/companies'
    );
    const companies: Company[] = response.data.map(
      ({ id, user, description, likes, chats }) => ({
        id,
        user,
        description,
        likes,
        chats
      })
    );

    setCompanies(companies);
  }

  async function addNewCompany(company: string) {
    const config = {
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhpY2FybG9kYWN1eWFuIiwiaWQiOiI2M2U0OTdkODRkY2NjOTdhZGUwMWJiMzUiLCJpYXQiOjE2NzYxNjUyNjR9.c4Ugp3BSzESZfL4kSUrn7gDuq2Z2uBASVJqbO4C4LJM` }
    };
    await axios.post('http://localhost:3001/api/companies', { description: company }, config);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await addNewCompany(newCompany);
    void getInitialCompanies();
    setNewCompany('');
  }

  async function handleDelete(id: string) {
    await axios.delete(`http://localhost:3001/api/companies/${id}`);
    void getInitialCompanies();
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="text-3xl font-bold">Companies List</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} type='text' className='border-solid border-2 border-slate-500 rounded' />
        <input type='submit' className='bg-green-500 p-1 rounded text-white text-xs hover:cursor-pointer' />
      </form>
      <ul>
        {companies.map((company) => (
          <li key={company.id} className="flex flex-col gap-2 text-2xl font-normal">
            <div>• {company.description} 
              <button onClick={() => handleDelete(company.id)} className='bg-red-500 p-1 rounded text-white text-xs'>Delete</button>
            </div>
            {company.chats.map(chat => <p key={chat.id} className="text-sm">{chat.user.username}: {chat.content}</p>)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
