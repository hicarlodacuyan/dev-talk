import isString from "./isString";

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing data");
  }

  return str;
};

export default parseString;
