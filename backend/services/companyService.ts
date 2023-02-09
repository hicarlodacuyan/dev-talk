import Company from '../models/company';
import { CompanyDocument } from '../types/company';

async function getCompanies() {
  const companies = await Company.find({}).populate('chats', { content: 1, user: 1 });

  return companies;
}

async function getCompany(id: string) {
  const company = await Company.findById(id);

  return company;
}

async function addCompany({ description, user, likes }: CompanyDocument) {
  const company = new Company({
    description,
    user,
    likes
  });

  const savedCompany = await company.save();

  return savedCompany;
}

async function deleteCompany(id: string) {
  const company = await Company.findByIdAndRemove(id);

  return company;
}

async function updateCompany(id: string, updatedCompany: CompanyDocument) {
  const company = await Company.findByIdAndUpdate(id, updatedCompany, {
    new: true
  });

  return company;
}

export default {
  getCompanies,
  getCompany,
  addCompany,
  deleteCompany,
  updateCompany
};
