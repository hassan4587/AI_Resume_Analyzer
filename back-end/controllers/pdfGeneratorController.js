import pdfGeneratorService from "../services/pdfService.js";

const pdfGeneratorController = async (req, res) => {
  console.log("request for pdf generation received");

  try {
    const { resumeData } = req.body;

    if (!resumeData || typeof resumeData !== "object") {
      return res.status(400).json({ error: "Invalid resume data" });
    }
    const pdfBuffer = await pdfGeneratorService(resumeData);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF generation failed" });
  }
};

export default pdfGeneratorController;
