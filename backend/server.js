// server.js (ESM)
// package.json must have: { "type": "module" }

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { setGlobalDispatcher, Agent } from "undici";

import { GoogleGenAI, createUserContent, ThinkingLevel } from "@google/genai";

dotenv.config();

// Increase network timeouts for all fetches used by @google/genai (Undici)
setGlobalDispatcher(
  new Agent({
    connectTimeout: 30000, // 30s
    headersTimeout: 60000,
    bodyTimeout: 60000,
  })
);

const app = express();
const PORT = Number(process.env.PORT || 8080);

// CORS for Vite
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/health", (_req, res) => res.json({ ok: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

function buildPrompt() {
  return `
You are an ATS resume analyzer.

TASK:
1) Score the resume for ATS compatibility (0-100) and provide a breakdown.
2) Extract structured info (personal info, summary, work experience, education, skills).
3) Provide keywords analysis (found vs missing).
4) Provide improvement recommendations (with priority and estimated score increase).

RULES:
- Output MUST be valid JSON ONLY (no markdown, no backticks, no explanations).
- If a field is missing, use null or empty array.
- Keep text concise.

OUTPUT JSON SCHEMA (must match):
{
  "atsScore": {
    "overall": number,
    "breakdown": {
      "formatting": { "score": number, "summary": string },
      "keywords": { "score": number, "summary": string },
      "experience": { "score": number, "summary": string },
      "education": { "score": number, "summary": string },
      "skills": { "score": number, "summary": string }
    }
  },
  "reasoningSummary": string,
  "extractedInformation": {
    "personalInformation": {
      "fullName": string|null,
      "email": string|null,
      "phone": string|null,
      "location": string|null,
      "links": string[]
    },
    "professionalSummary": string|null,
    "workExperience": [
      {
        "title": string|null,
        "company": string|null,
        "location": string|null,
        "dateRange": string|null,
        "bullets": string[]
      }
    ],
    "education": [
      {
        "degree": string|null,
        "field": string|null,
        "school": string|null,
        "date": string|null
      }
    ],
    "skills": {
      "hardSkills": string[],
      "toolsAndTech": string[],
      "softSkills": string[]
    }
  },
  "keywordsAnalysis": {
    "foundKeywords": string[],
    "missingKeywords": string[]
  },
  "improvementRecommendations": [
    {
      "category": "Keywords"|"Skills"|"Formatting"|"Experience"|"Education"|"Other",
      "priority": "high"|"medium"|"low",
      "issue": string,
      "suggestion": string,
      "estimatedScoreIncrease": string
    }
  ]
}
`.trim();
}

function extractJsonFromModelText(text) {
  try {
    return JSON.parse(text);
  } catch {
    const s = text.indexOf("{");
    const e = text.lastIndexOf("}");
    if (s >= 0 && e > s) return JSON.parse(text.slice(s, e + 1));
    throw new Error("Model did not return valid JSON.");
  }
}

// ✅ Route: matches frontend fetch("http://localhost:8080/api/resume/analyze")
app.post("/api/resume/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing file field 'resume'." });
    if (req.file.mimetype !== "application/pdf") return res.status(400).json({ error: "Only PDF is supported." });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY missing in .env" });

    const model = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

    const ai = new GoogleGenAI({ apiKey });

    // ✅ Inline PDF bytes (removes files.upload network call)
    const base64Pdf = req.file.buffer.toString("base64");
    const prompt = buildPrompt();

    const response = await ai.models.generateContent({
      model,
      contents: [
        createUserContent([
          prompt,
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64Pdf,
            },
          },
        ]),
      ],
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "";
    const json = extractJsonFromModelText(text);
    return res.json(json);
  } catch (err) {
    // network timeout
    if (err?.cause?.code === "UND_ERR_CONNECT_TIMEOUT") {
      return res.status(503).json({
        error: "Gemini connection timeout (undici).",
        suggestion: "Retry. If frequent, try hotspot / disable VPN / increase timeouts.",
        details: err?.message || String(err),
      });
    }

    // quota/rate limit
    if (err?.status === 429) {
      return res.status(429).json({
        error: "Gemini quota/rate limit exceeded.",
        details: err?.message || String(err),
      });
    }

    console.error("❌ /api/resume/analyze error:", err);
    return res.status(500).json({
      error: "Resume analysis failed.",
      details: err?.message || String(err),
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ POST http://localhost:${PORT}/api/resume/analyze`);
});