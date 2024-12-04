import express, { Express } from "express";
import * as dotenv from "dotenv";

// Load the custom  config  file (config.env)
const result = dotenv.config({ path: "./config/config.env" });
if (result.error) {
  console.log(`error loading .env file`, result.error);
}

// Create an instance of an Express application
const app: Express = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
