import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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
  const [generatedResumeHtml, setGeneratedResumeHtml] = useState(null);
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
      console.log(data.improved_resume);

      setAnalysis(data.analysis || data);
      setGeneratedResumeHtml(data.improved_resume || "");
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
      <Navbar setView={setView} />

      {/* shows form for uploading the resume */}
      {view === "landing" && (
        <UploadResume
          handleSubmit={handleSubmit}
          setResumeFile={setResumeFile}
          loading={loading}
        />
      )}

      {/* Switches to dashboard after a successful API call */}
      {view === "dashboard" && analysis && (
        <Dashboard analysis={analysis} setView={setView} />
      )}

      {/* Shows ready to download resume  */}
      {view === "resume" && (
        <ResumeView
          generatedResumeHtml={generatedResumeHtml}
          resumeRef={resumeRef}
          setView={setView}
          downloadResumePDF={downloadResumePDF}
        />
      )}
    </div>
  );
}
