import puppeteer from "puppeteer";
import generateHTML from "../templates/htmlGenerater1.js";

const pdfGeneratorService = async (resumeData) => {
  let browser;

  try {
    const html = generateHTML(resumeData);

    browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
    });

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    return pdfBuffer;
  } catch (err) {
    console.error("PDF generation error:", err);
    throw err;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default pdfGeneratorService;
