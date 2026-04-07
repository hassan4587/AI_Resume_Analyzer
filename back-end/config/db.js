import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    process.env.MONGO_URI || "mongodb://localhost:27017/resume_analyzer";

  try {
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
