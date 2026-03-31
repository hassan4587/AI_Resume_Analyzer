import React from "react";

function ResumeView({
  generatedResumeHtml,
  setView,
  resumeRef,
  downloadResumePDF,
}) {
  return (
    <>
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
    </>
  );
}

export default ResumeView;
