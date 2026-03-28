import express from "express";
import multer from "multer";
import parseResume from "../utils/parseResume.cjs";
import analyzeResume from "../services/aiService.js";

const router = express.Router();
const upload = multer();

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("request received");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1. Extract text
    const resumeText = await parseResume(req.file.buffer);

    // 2. AI Analysis
    const analysis = await analyzeResume(resumeText);

    res.json(analysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
