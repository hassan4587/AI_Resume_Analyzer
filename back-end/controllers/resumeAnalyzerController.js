import parseResume from "../utils/parseResume.cjs";
import analyzeResume from "../services/aiService.js";
import generateResumeHTML from "../services/resumeGenerator.js";

const resumeAnalyzerController = async (req, res) => {
  try {
    console.log("request received");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1. Extract text
    const resumeText = await parseResume(req.file.buffer);

    // 2. AI Analysis
    const analysis = await analyzeResume(resumeText);
    const generatedResumeHtml = generateResumeHTML();
    res.json({ analysis, resume: generatedResumeHtml });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default resumeAnalyzerController;
