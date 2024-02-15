import envObj from "dotenv";
envObj.config();

export const { PORT, DB_URL } = process.env;
