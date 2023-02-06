export interface CompanyDocument {
  description: string;
  user: string;
  likes: number;
}

export interface TransformedCompanyDocument extends CompanyDocument {
  id: string;
}
