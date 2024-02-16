import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (error) {
    next("Auth Failed");
  }
};

export default userAuth;
