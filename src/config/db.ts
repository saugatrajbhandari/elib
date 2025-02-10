import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async () => {
  try {
    // Set up event listeners before connection
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("error", (err) => console.log(err));

    const conn = await mongoose.connect(config.mongo_uri as string);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error, "connect error");
    process.exit(1);
  }
};

export default connectDb;
