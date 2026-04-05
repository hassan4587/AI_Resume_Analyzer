import React, { useState } from "react";
import Navbar from "../components/UniversalComponents/Navbar";
import UploadResume from "../components/ResumeAnalyzerComponents/UploadResume";
import Dashboard from "../components/ResumeAnalyzerComponents/Dashboard";
import ResumeView from "../components/ResumeAnalyzerComponents/ResumeView";

// ============================================================
// ROOT COMPONENT: ResumeAnalyzerApp
// ------------------------------------------------------------
// The single top-level component that owns all application
// state and conditionally renders child views (Landing,
// Dashboard, Resume). Acts as both the state manager and
// the router — no external routing library is used; instead
// a `view` string drives which UI panel is shown.
// ============================================================
export default function ResumeAnalyzerApp() {
  // ----------------------------------------------------------
  // STATE VARIABLES
  //
  // resumeFile (Resides inside UploadResume.jsx)
  //                    — holds the File object selected by the
  //                    user via the <input type="file">.
  //
  // loading (Resides inside UploadResume.jsx)
  //                    — boolean flag; true while the API call
  //                    is in-flight. Disables the submit
  //                    button and changes its label.
  //
  // analysis         — object returned by the backend after
  //                    parsing the resume. Shape:
  //                    { score, feedback, strengths[], weaknesses[] }
  //
  // generatedResumeHtml — raw HTML string of the AI-optimized
  //                    resume, injected with dangerouslySetInnerHTML
  //                    into the Resume view.
  //
  // view             — controls which panel is rendered.
  //                    Possible values: "landing" | "dashboard" | "resume"
  // ----------------------------------------------------------

  const [analysis, setAnalysis] = useState(null);
  const [generatedResumeData, setGeneratedResumeData] = useState(null);
  const [view, setView] = useState("landing");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setView={setView} />

      {/* shows form for uploading the resume */}
      {view === "landing" && (
        <UploadResume
          setAnalysis={setAnalysis}
          setGeneratedResumeData={setGeneratedResumeData}
          setView={setView}
        />
      )}

      {/* Switches to dashboard after a successful API call */}
      {view === "dashboard" && analysis && (
        <Dashboard analysis={analysis} setView={setView} />
      )}

      {/* Shows ready to download resume  */}
      {view === "resume" && (
        <ResumeView
          generatedResumeData={generatedResumeData}
          setView={setView}
        />
      )}
    </div>
  );
}
