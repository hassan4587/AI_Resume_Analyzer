import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze.js";
import { requestLogger } from "./middlewares/requestLogger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api", analyzeRoute);

app.listen(port, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
