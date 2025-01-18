import mongoose from "mongoose";
import color from "colors";

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    // mongoose.set("strictPopulate", false);
    console.log(color.cyan.underline.bold("MongoDB Connected"));
    console.log(color.green(`MongoDB Host: ${connection.connection.host}`));
  } catch (error) {
    console.error(color.red(`Error: ${(error as Error).message}`));
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
