import express from "express";
import multer from "multer";
import resumeAnalyzerController from "../controllers/resumeAnalyzerController.js";

const router = express.Router();
const upload = multer();

router.post("/analyze", upload.single("resume"), resumeAnalyzerController);

export default router;
