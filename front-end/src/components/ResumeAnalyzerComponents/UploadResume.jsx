import React, { useState } from "react";
import { API_URL } from "../../config/api";
function UploadResume({ setAnalysis, setGeneratedResumeData, setView }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------------
  // CONFIGURATION
  // Base URL for the backend API, injected via Vite's env
  // system. Falls back to localhost for local development.
  // ----------------------------------------------------------

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
      if (!res.ok) {
        throw new Error("API request failed");
      }
      const data = await res.json();
      console.log(data.improved_resume);

      setAnalysis(data.analysis || data);
      setGeneratedResumeData(data.improved_resume || "");
      setView("dashboard");

      // Reset form
      setResumeFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
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
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Optimize Your Resume with AI
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Get instant feedback, improve your resume, and generate a professional
          version tailored for jobs.
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
    </>
  );
}

export default UploadResume;
