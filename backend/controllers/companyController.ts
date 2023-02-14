import { Request, Response } from "express";
import Company from "../models/company";
import { CompanyDocument } from "../types/company";
import getTokenFrom from "../utils/getTokenFrom";
import getUserByToken from "../utils/getUserByToken";
import toNewCompanyEntry from "../utils/toNewCompanyEntry";

const getCompany = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  const company = await Company.findById(id);

  res.json(company);
};

const getCompanies = async (_req: Request, res: Response): Promise<void> => {
  const companies = await Company.find({}).populate({
    path: "chats",
    select: "content createdAt",
    populate: {
      path: "user",
      select: "username name",
    },
  });

  res.json(companies);
};

const addCompany = async (req: Request, res: Response): Promise<void> => {
  const newCompanyEntry: CompanyDocument = toNewCompanyEntry(req.body);
  const token: string = getTokenFrom(req);
  const user = await getUserByToken(token);
  const company = new Company({
    user: user._id,
    description: newCompanyEntry.description,
    likes: newCompanyEntry.likes,
  });
  const savedCompany = await company.save();

  res.status(201).json(savedCompany);
};

const editCompany = async (req: Request, res: Response): Promise<void> => {
  const newCompanyEntry: CompanyDocument = toNewCompanyEntry(req.body);
  const token: string = getTokenFrom(req);
  const user = await getUserByToken(token);
  const company = {
    description: newCompanyEntry.description,
    user: user._id,
    likes: newCompanyEntry.likes,
  };
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    company,
    { new: true }
  );

  res.json(updatedCompany);
};

const removeCompany = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  await Company.findByIdAndRemove(id);

  res.status(204).end();
};

export default {
  getCompany,
  getCompanies,
  addCompany,
  editCompany,
  removeCompany,
};
