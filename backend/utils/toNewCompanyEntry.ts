import { CompanyDocument } from '../types/company';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNewCompanyEntry(obj: any): CompanyDocument {
  const newCompany: CompanyDocument = {
    description: obj.description as string,
    user: '63db41b3369d4b132071d2b6',
    likes: obj.likes as number
  };

  return newCompany;
}

export default toNewCompanyEntry;
