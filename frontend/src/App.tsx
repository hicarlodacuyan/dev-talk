import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Company {
  id: string;
  user: string;
  description: string;
  likes: number;
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    async function getInitialCompanies() {
      const response: AxiosResponse<Company[]> = await axios.get(
        'http://localhost:3001/api/companies'
      );
      const companies: Company[] = response.data.map(
        ({ id, user, description, likes }) => ({
          id,
          user,
          description,
          likes
        })
      );

      setCompanies(companies);
    }

    void getInitialCompanies();
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold">Companies List</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id} className="text-2xl font-normal">
            • {company.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
