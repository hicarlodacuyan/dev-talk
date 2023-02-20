import { CompanyDocument } from "../types/company";
import parseString from "./parseString";

const toNewCompanyEntry = (obj: unknown): CompanyDocument => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in obj) {
    const newCompany: CompanyDocument = {
      description: parseString(obj.description),
      likes: 0,
    };

    return newCompany;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewCompanyEntry;
