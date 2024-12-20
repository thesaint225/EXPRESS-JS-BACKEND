import * as fs from "fs";
import mongoose, { Schema, Document, Model } from "mongoose";
import * as colors from "colors";
import { config } from "dotenv";
config();

console.log("Before dotenv config");

// Log the current directory to check where the script is being run
console.log("Current directory:", __dirname);
console.log("Before dotenv config");

// load env vars
console.log("after dotenv config");

console.log(process.env.MONGO_URI);

// Load models
import Bootcamp from "./models/Bootcamp";
import path from "path";

// connect to DB

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  });

//   Read JSON files

const bootcampsFilePath = path.join(__dirname, "_data", "bootcamps.json");
console.log("Resolved path to bootcamps.json:", bootcampsFilePath);

// Read JSON file
const bootcamps = JSON.parse(fs.readFileSync(bootcampsFilePath, "utf-8"));

// import into Data base

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
