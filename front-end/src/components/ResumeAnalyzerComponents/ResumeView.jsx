import React, { useRef, useState } from "react";
import { API_URL } from "../../config/api";
function ResumeView({ generatedResumeData: data, setView }) {
  // ----------------------------------------------------------
  // REF: resumeRef
  // Attached to the rendered HTML resume container so that
  // html2canvas can target the exact DOM node when the user
  // clicks "Download PDF". Without this ref, the PDF
  // generator has no element to rasterize.
  // ----------------------------------------------------------
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
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

  // const downloadResumePDF = async () => {
  //   if (!resumeRef.current) {
  //     return;
  //   }

  //   try {
  //     const element = resumeRef.current;
  //     const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pageWidth;
  //     const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

  //     let heightLeft = pdfHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //     heightLeft -= pageHeight;

  //     // Pagination loop — adds a new page for every overflow chunk
  //     while (heightLeft > 0) {
  //       position = heightLeft - pdfHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("resume.pdf");
  //   } catch (error) {
  //     console.error("Download PDF failed", error);
  //     alert("Failed to generate PDF. Please try again.");
  //   }
  // };

  const downloadPDF = async () => {
    if (downloading) return;

    try {
      setDownloading(true);

      const res = await fetch(`${API_URL}/api/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData: data }), // ✅ FIXED
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();

      window.URL.revokeObjectURL(url); //cleanup
    } catch (err) {
      console.error(err);
      alert("PDF generation failed");
    } finally {
      setDownloading(false);
    }
  };

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
          onClick={downloadPDF}
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
