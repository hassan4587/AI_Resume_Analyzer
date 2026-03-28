# AI Resume Analyzer & Optimizer

## Overview

The AI Resume Analyzer is a full-stack application that evaluates resumes and provides actionable feedback using AI. It helps users understand how well their resume performs and how it can be improved.

Building on this MVP, the system is being extended into a **Resume Optimizer**, which tailors resumes according to specific job descriptions to increase relevance and match rates.

---

## Features

### Current (MVP)

- Upload resume (PDF format)
- Extract and process resume content
- AI-based analysis of resume quality
- Feedback on structure, clarity, and improvements

### In Progress

- Job description input
- Resume-to-job matching analysis
- Keyword gap identification
- ATS (Applicant Tracking System) compatibility scoring

### Planned (Resume Optimizer)

- Automatic resume rewriting based on job description
- Section-wise optimization (skills, experience, summary)
- Keyword injection aligned with job requirements
- Multiple resume versions for different roles

---

## How It Works

1. User uploads a resume (PDF)
2. Backend extracts text from the document
3. AI processes the content and generates insights
4. (Upcoming) Job description is analyzed
5. Resume is compared against job requirements
6. Optimized suggestions or rewritten content is generated

---

## Architecture

- **Frontend:** React (file upload + result visualization)
- **Backend:** Node.js + Express
- **AI Service:** External AI API integration
- **File Processing:** PDF parsing module

---

## Environment Variables

The application uses environment variables for sensitive configurations:

```
PORT=5000
OPENAI_API_KEY=your_api_key_here
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Install dependencies

```
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` directory and add your API key.

### 4. Run the application

```
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

---

## Future Improvements

- Real-time resume scoring dashboard
- Role-based resume templates
- Cover letter generation
- Multi-language support
- User authentication & saved resumes

---

## Use Case

This tool is designed for:

- Students and fresh graduates
- Job seekers optimizing resumes for ATS
- Professionals applying to multiple roles

---

## Status

🚧 MVP Completed
In Progress - Resume Optimization Feature in Development

---
