import dotenv from "dotenv";

dotenv.config();

export const connectionUrl = process.env.CONNECTION_URL;
export const port = process.env.PORT || 5000;
