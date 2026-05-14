import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URL || "";

export const connectDB = async () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL or MONGODB_URL is required");
  }

  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to DB !");
  } catch (err) {
    console.error("DB connection error:", err);
    throw err;
  }
};
