import express from "express";
import companyController from "../controllers/companyController";

const companiesRouter = express.Router();

companiesRouter.get("/", companyController.getCompanies);
companiesRouter.get("/:id", companyController.getCompany);
companiesRouter.post("/", companyController.addCompany);
companiesRouter.put("/:id", companyController.editCompany);
companiesRouter.delete("/:id", companyController.removeCompany);

export default companiesRouter;
