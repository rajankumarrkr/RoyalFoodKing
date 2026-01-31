import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from .env file");
    }

    // Log URI with masked password for debugging
    const maskedUri = mongoUri.replace(/:([^@]+)@/, ":****@");
    console.log("Connecting to MongoDB:", maskedUri);

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("CRITICAL: MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
