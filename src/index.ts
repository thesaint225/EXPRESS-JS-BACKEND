import express, { Express } from "express";
import bootcampRoutes from "./routes/bootcampRoutes";
import coursesRoutes from "./routes/courseRouter";
import fileupload from "express-fileupload";
import * as dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../config/db";
import color from "colors";
import errorHandler from "./middleware/error";
import Bootcamp from "./models/Bootcamp";

// Load the custom config file (config.env)
const result = dotenv.config();
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

// File upload
app.use(fileupload());
// Mount router
app.use("/api/v1/bootcamps", bootcampRoutes); // <-- Fix route prefix
app.use("/api/v1/courses", coursesRoutes); // <-- Fix route prefix

app.use(errorHandler);

// Middleware to parse JSON request body
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const bootcamps = await Bootcamp.find().populate("courses");

  res.json({
    bootcamps,
  });
});

app.listen(PORT, () => {
  console.log(
    color.yellow.bold(`Server is running on http://localhost:${PORT}`)
  );
});
