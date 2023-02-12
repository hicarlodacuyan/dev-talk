import { CompanyDocument } from "../types/company";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNewCompanyEntry(obj: any): CompanyDocument {
  const newCompany: CompanyDocument = {
    description: obj.description as string,
    user: obj.user as string,
    likes: obj.likes as number,
  };

  return newCompany;
}

export default toNewCompanyEntry;
