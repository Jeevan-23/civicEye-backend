import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.MONGODB_URI ||
  process.env.MONGODB_URL ||
  "";

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL, MONGODB_URI, or MONGODB_URL is required");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((connection) => {
      console.log("Connected to DB !");
      return connection;
    })
    .catch((err) => {
      connectionPromise = null;
      console.error("DB connection error:", err);
      throw err;
    });

  return connectionPromise;
};
