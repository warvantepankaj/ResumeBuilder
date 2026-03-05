// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generatePDF } from "./controllers/GeneratePDF.js";
// import { generateWord } from "./controllers/GenerateWord.js"; 

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// INCREASE LIMIT: HTML strings can be large
app.use(bodyParser.json({ limit: "50mb" })); 

app.post("/export", async (req, res) => {
  // Extract htmlContent for PDF, resumeData for Word
  const { htmlContent, resumeData, format } = req.body;

  try {
    if (!format) return res.status(400).json({ error: "Missing format" });

    // ======== PDF EXPORT ========
    if (format === "pdf") {
      if (!htmlContent) return res.status(400).json({ error: "Missing HTML content" });
      
      console.log("Generating PDF...");
      // Pass the HTML string to the controller
      const pdfBuffer = await generatePDF(htmlContent);

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      });
      return res.send(pdfBuffer);
    }

    // ======== WORD EXPORT ========
    if (format === "word") {
      // Word usually needs raw JSON to build nodes, or a different HTML converter
      // const wordBuffer = await generateWord(resumeData); 
      // ... existing word logic ...
    }

    return res.status(400).json({ error: "Invalid format" });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: "Failed to generate file" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));