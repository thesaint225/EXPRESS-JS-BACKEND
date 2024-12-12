import express, { Express } from "express";
import bootcampRoutes from "./routes/bootcampRoutes";
import * as dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../config/db";
import color from "colors";

// Load the custom config file (config.env)
const result = dotenv.config({ path: "./config/config.env" });
if (result.error) {
  console.log("Error loading .env file", result.error);
}

console.log(result);

console.log("Mongo URI", process.env.MONGO_URI);
connectDB();

// Create an instance of an Express application
const app: Express = express();

// Body parser

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Use the imported routes
app.use("/api/v1/bootcamps", bootcampRoutes); // <-- Fix route prefix

// Middleware to parse JSON request body
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    color.yellow.bold(`Server is running on http://localhost:${PORT}`)
  );
});
