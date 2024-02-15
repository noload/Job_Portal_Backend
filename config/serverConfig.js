import envObj from "dotenv";
envObj.config();

export const { PORT, DB_URL, JWT_SECRET } = process.env;
