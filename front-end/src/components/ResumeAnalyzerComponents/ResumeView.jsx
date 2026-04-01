import React from "react";

function ResumeView({
  generatedResumeHtml: data,
  setView,
  resumeRef,
  downloadResumePDF,
}) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Top Bar */}
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

      {/* Resume */}
      <div
        ref={resumeRef}
        className="bg-white p-10 shadow rounded-xl text-sm leading-relaxed text-gray-800"
      >
        {!data ? (
          <div className="text-center text-gray-500">
            No generated resume available yet.
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-gray-600">{data.title}</p>
              <p className="mt-2">{data.summary}</p>
            </div>

            {/* Skills */}
            <Section title="Skills">
              <p>{data.skills?.join(", ")}</p>
            </Section>

            {/* Experience */}
            <Section title="Experience">
              {data.experience?.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold">
                    {exp.role} — {exp.company}
                  </p>
                  <p className="text-gray-500 text-xs">{exp.duration}</p>
                  <ul className="list-disc ml-5 mt-1">
                    {exp.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* Projects */}
            <Section title="Projects">
              {data.projects?.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold">{proj.name}</p>
                  <p className="text-sm">{proj.description}</p>
                  <ul className="list-disc ml-5 mt-1">
                    {proj.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* Education */}
            <Section title="Education">
              {data.education?.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-sm">
                    {edu.institution} ({edu.year})
                  </p>
                </div>
              ))}
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-md font-bold border-b pb-1 mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default ResumeView;
