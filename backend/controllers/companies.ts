import express from "express";
import Company from "../models/company";
import { CompanyDocument } from "../types/company";
import getTokenFrom from "../utils/getTokenFrom";
import getUserByToken from "../utils/getUserByToken";
import toNewCompanyEntry from "../utils/toNewCompanyEntry";

const companiesRouter = express.Router();

companiesRouter.get("/", async (_req, res) => {
  const companies = await Company.find({}).populate({
    path: "chats",
    select: "content createdAt",
    populate: {
      path: "user",
      select: "username name",
    },
  });

  res.json(companies);
});

companiesRouter.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);

  res.json(company);
});

companiesRouter.post("/", async (req, res) => {
  const newCompanyEntry: CompanyDocument = toNewCompanyEntry(req.body);
  const token: string = getTokenFrom(req);
  const user = await getUserByToken(token);
  const company = new Company({
    user: user._id,
    description: newCompanyEntry.description,
    likes: newCompanyEntry.likes,
  });
  const savedCompany = await company.save();

  return res.status(201).json(savedCompany);
});

companiesRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const company = {
    description: body.description,
    user: body.user,
    likes: body.likes,
  };
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    company,
    { new: true }
  );

  res.json(updatedCompany);
});

companiesRouter.delete("/:id", async (req, res) => {
  await Company.findByIdAndRemove(req.params.id);

  res.status(204).end();
});

export default companiesRouter;
