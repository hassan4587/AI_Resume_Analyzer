import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middlewares/auth.js";
const connectDB = require("./config/db");

connectDB();
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRoutes);

app.use(protect); // protect all routes below
app.use("/api", resumeRoutes);
app.use("/api", pdfRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});
