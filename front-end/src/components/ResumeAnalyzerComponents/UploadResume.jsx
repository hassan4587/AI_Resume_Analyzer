import React from "react";

function UploadResume({ handleSubmit, setResumeFile, loading }) {
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
