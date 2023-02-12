import { CompanyDocument } from "../types/company";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing comment");
  }

  return description;
};

const toNewCompanyEntry = (obj: unknown): CompanyDocument => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in obj) {
    const newCompany: CompanyDocument = {
      description: parseDescription(obj.description),
      likes: 0,
    };

    return newCompany;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewCompanyEntry;
