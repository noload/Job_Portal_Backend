import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/serverConfig.js";
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next("Auth Failed");
  }
  const token = authHeader;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

export default userAuth;
