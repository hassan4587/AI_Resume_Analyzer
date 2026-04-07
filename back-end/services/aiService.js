import { OpenAI } from "openai";

function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY || process.env.OPEN_AI_API_KEY;
  if (!key) {
    throw new Error(
      "Missing OpenAI API key. Set OPENAI_API_KEY in your .env file.",
    );
  }
  return new OpenAI({ apiKey: key });
}

export default async function analyzeResume(resumeText) {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional resume reviewer and resume writer.",
      },
      {
        role: "user",
        content: `
Analyze the following resume AND generate an improved, ATS-friendly version.

Return ONLY valid JSON in this format:

{
  "score": number,
  "feedback": string,
  "strengths": string[],
  "weaknesses": string[],
  "improved_resume": {
    "name": string,
    "title": string,
    "summary": string,
    "skills": string[],
    "experience": [
      {
        "role": string,
        "company": string,
        "duration": string,
        "bullets": string[]
      }
    ],
    "projects": [
      {
        "name": string,
        "description": string,
        "bullets": string[]
      }
    ],
    "education": [
      {
        "degree": string,
        "institution": string,
        "year": string
      }
    ]
  }
}

Instructions:
- Keep strengths from the original resume
- Fix all weaknesses
- Improve clarity, formatting, and wording
- Add quantifiable achievements where possible (e.g., %, numbers)
- Make it ATS-friendly
- Do NOT hallucinate unrealistic experience
- If some data is missing, infer reasonably but keep it generic
- Keep output clean and professional

Resume:
${resumeText}
    `,
      },
    ],
    temperature: 0.3,
  });
  const text = response.choices[0].message.content;

  // Try parsing JSON safely
  try {
    console.log("request ssuccessful");

    return JSON.parse(text);
  } catch (err) {
    // Handle specific OpenAI errors
    if (err.status === 401) {
      throw new Error("Invalid OpenAI API key");
    }

    if (err.status === 429) {
      throw new Error("API rate limit exceeded");
    }

    if (err.status === 500) {
      throw new Error("OpenAI server error");
    }

    // fallback
    throw new Error("AI service failed: " + err.message);
  }
}
