import { Request } from "express";

const getTokenFrom = (req: Request): string => {
  const tokenWithBearer = req.get("authorization");

  if (tokenWithBearer !== undefined) {
    if (tokenWithBearer.startsWith("Bearer ")) {
      return tokenWithBearer.replace("Bearer ", "");
    }

    return tokenWithBearer;
  }

  throw new Error("Incorrect data: authorization token is missing");
};

export default getTokenFrom;
