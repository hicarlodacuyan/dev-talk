const getTokenFrom = (req: any) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

export default getTokenFrom;
