const { PDFParse } = require("pdf-parse");

async function parseResume(buffer) {
  try {
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    return result.text;
  } catch (err) {
    console.error("PDF parsing error:", err);
    throw new Error("Failed to parse resume PDF");
  }
}

module.exports = parseResume;
