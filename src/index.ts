import express, { Express } from "express";
import bootcampRoutes from "./routes/bootcampRoutes";
import * as dotenv from "dotenv";

// Load the custom config file (config.env)
const result = dotenv.config({ path: "./config/config.env" });
if (result.error) {
  console.log("Error loading .env file", result.error);
}

// Create an instance of an Express application
const app: Express = express();

// Use the imported routes
app.use("/api/v1/bootcamps", bootcampRoutes); // <-- Fix route prefix

// Middleware to parse JSON request body
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
