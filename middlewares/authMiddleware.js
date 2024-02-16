import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    next("Auth Failed");
  }
  const token = authHeader;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("payload", payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Auth Failed");
    console.log(error);
  }
};

export default userAuth;
