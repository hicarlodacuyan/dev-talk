import Company from '../models/company';
import { CompanyDocument } from '../types/company';

async function getCompanies() {
  const companies = await Company.find({});

  return companies;
}

async function getCompany(id: string) {
  const company = await Company.findById(id);

  return company;
}

async function addCompany({ description, user, likes }: CompanyDocument) {
  const company = await Company.create({
    description,
    user,
    likes
  });

  return company;
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
