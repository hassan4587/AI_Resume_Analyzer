import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import { requestLogger } from "./middlewares/requestLogger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api", resumeRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});
