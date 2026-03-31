import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
  // CONFIGURATION
  // Base URL for the backend API, injected via Vite's env
  // system. Falls back to localhost for local development.
  // ----------------------------------------------------------
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // ----------------------------------------------------------
  // REF: resumeRef
  // Attached to the rendered HTML resume container so that
  // html2canvas can target the exact DOM node when the user
  // clicks "Download PDF". Without this ref, the PDF
  // generator has no element to rasterize.
  // ----------------------------------------------------------
  const resumeRef = useRef(null);

  // ----------------------------------------------------------
  // STATE VARIABLES
  //
  // resumeFile       — holds the File object selected by the
  //                    user via the <input type="file">.
  //
  // loading          — boolean flag; true while the API call
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
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [generatedResumeHtml, setGeneratedResumeHtml] = useState("");
  const [view, setView] = useState("landing");

  // ----------------------------------------------------------
  // HANDLER: handleSubmit
  // Triggered when the upload form is submitted on the
  // Landing view. Responsibilities:
  //  1. Guards against submission without a file.
  //  2. Wraps the file in FormData for multipart upload.
  //  3. POSTs to /api/analyze on the backend.
  //  4. Stores analysis + generated HTML in state.
  //  5. Switches the view to "dashboard" on success.
  // Error is currently only logged — no UI error state shown.
  // ----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Upload a resume first");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnalysis(data.analysis || data);
      setGeneratedResumeHtml(data.resume || "");
      setView("dashboard");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ----------------------------------------------------------
  // HANDLER: downloadResumePDF
  // Converts the rendered resume DOM node into a downloadable
  // multi-page PDF. Steps:
  //  1. Guards against a missing ref (resume not yet rendered).
  //  2. Uses html2canvas to rasterize the resume div at 2×
  //     scale for retina-quality output.
  //  3. Uses jsPDF to create an A4 document.
  //  4. Tiles the canvas image across multiple pages if the
  //     resume is taller than one A4 page.
  //  5. Triggers a browser download as "resume.pdf".
  // ----------------------------------------------------------
  const downloadResumePDF = async () => {
    if (!resumeRef.current) {
      return;
    }

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Pagination loop — adds a new page for every overflow chunk
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Download PDF failed", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======================================================
          UI COMPONENT: Navbar
          ------------------------------------------------------
          Persistent top bar rendered across ALL views.
          Contains the app brand name and a "Home" button that
          resets the view back to "landing". Does NOT reset
          any state — previously loaded analysis is preserved
          in memory if the user navigates back.
      ====================================================== */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">ResumeAI</h1>
        <button
          onClick={() => setView("landing")}
          className="text-sm text-gray-600"
        >
          Home
        </button>
      </nav>

      {/* ======================================================
          VIEW COMPONENT: Landing Page  (view === "landing")
          ------------------------------------------------------
          The entry point of the app. Responsibilities:
           - Presents the app value proposition to the user.
           - Renders a file input restricted to .pdf files.
           - On submit, calls handleSubmit which uploads the
             file and transitions to the Dashboard view.
           - Disables the submit button and shows "Analyzing..."
             while the API request is pending (loading === true).
      ====================================================== */}
      {view === "landing" && (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">
          <h2 className="text-4xl font-bold mb-4">
            Optimize Your Resume with AI
          </h2>
          <p className="text-gray-600 max-w-xl mb-6">
            Get instant feedback, improve your resume, and generate a
            professional version tailored for jobs.
          </p>

          {/* File Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="border p-2 rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-md"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>
        </div>
      )}

      {/* ======================================================
          VIEW COMPONENT: Dashboard  (view === "dashboard")
          ------------------------------------------------------
          Shown after a successful API response. Requires
          `analysis` to be non-null before rendering.
          Sub-sections inside this view:

          [1] Tab Bar — two tabs ("Feedback" / "Resume") that
              switch between the Dashboard and Resume views.

          [2] Score Card — displays the numeric score (0–100)
              returned by the AI, styled prominently.

          [3] Feedback Panel — renders the AI's plain-text
              narrative feedback about the resume.

          [4] Strengths Panel — green card listing positive
              aspects identified by the AI (array of strings).

          [5] Weaknesses Panel — red card listing areas that
              need improvement (array of strings).

          [6] CTA Button — "Generate Optimized Resume" button
              that switches to the Resume view.
      ====================================================== */}
      {view === "dashboard" && analysis && (
        <div className="max-w-4xl mx-auto p-6">
          {/* [1] Tab Bar */}
          <div className="flex gap-4 mb-6 border-b pb-2">
            <button
              onClick={() => setView("dashboard")}
              className="font-medium"
            >
              Feedback
            </button>
            <button onClick={() => setView("resume")} className="text-gray-500">
              Resume
            </button>
          </div>

          {/* [2] Score Card */}
          <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">
            <p className="text-gray-500">Resume Score</p>
            <h2 className="text-5xl font-bold text-indigo-600">
              {analysis.score}/100
            </h2>
          </div>

          {/* [3] Feedback Panel */}
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-semibold mb-2">AI Feedback</h3>
            <p className="text-gray-700">{analysis.feedback}</p>
          </div>

          {/* [4] Strengths Panel & [5] Weaknesses Panel */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-semibold text-green-700">Strengths</h4>
              <ul className="list-disc ml-5 mt-2 text-sm">
                {analysis.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <h4 className="font-semibold text-red-700">Weaknesses</h4>
              <ul className="list-disc ml-5 mt-2 text-sm">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* [6] CTA Button */}
          <button
            onClick={() => setView("resume")}
            className="mt-6 w-full bg-black text-white py-3 rounded-xl"
          >
            Generate Optimized Resume
          </button>
        </div>
      )}

      {/* ======================================================
          VIEW COMPONENT: Resume View  (view === "resume")
          ------------------------------------------------------
          Displays the AI-generated resume HTML and allows the
          user to download it as a PDF. Sub-sections:

          [1] Back Button — returns the user to the Dashboard
              without clearing any state.

          [2] Download Button — triggers downloadResumePDF(),
              which rasterizes the resume div and exports it
              as a multi-page A4 PDF file.

          [3] Resume Container — a white card with `resumeRef`
              attached. Injects `generatedResumeHtml` (raw HTML
              string from the API) via dangerouslySetInnerHTML.
              Falls back to a placeholder message if the HTML
              string is empty or not yet available.

          ⚠️  Security Note: dangerouslySetInnerHTML is used
          here, which means any HTML/JS returned by the backend
          is rendered directly. Ensure the backend sanitizes
          the generated HTML to prevent XSS attacks.
      ====================================================== */}
      {view === "resume" && (
        <div className="max-w-3xl mx-auto p-6">
          {/* [1] Back Button & [2] Download Button */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setView("dashboard")}
              className="text-sm text-gray-500"
            >
              ← Back
            </button>

            <button
              onClick={downloadResumePDF}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Download
            </button>
          </div>

          {/* [3] Resume Container — PDF capture target */}
          <div
            ref={resumeRef}
            className="bg-white p-8 shadow rounded-xl text-sm leading-relaxed"
          >
            {generatedResumeHtml ? (
              <div dangerouslySetInnerHTML={{ __html: generatedResumeHtml }} />
            ) : (
              <div className="text-center text-gray-500">
                No generated resume available yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
