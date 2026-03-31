import React from "react";

function Dashboard({ analysis, setView }) {
  return (
    <>
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
      <div className="max-w-4xl mx-auto p-6">
        {/* [1] Tab Bar */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          <button onClick={() => setView("dashboard")} className="font-medium">
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
    </>
  );
}

export default Dashboard;
