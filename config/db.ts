import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
