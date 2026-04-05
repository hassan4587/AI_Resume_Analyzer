// routes/pdf.js (or inside your server file)

import express from "express";
import pdfGeneratorController from "../controllers/pdfGeneratorController.js";
const router = express.Router();

router.post("/generate-pdf", pdfGeneratorController);

export default router;
