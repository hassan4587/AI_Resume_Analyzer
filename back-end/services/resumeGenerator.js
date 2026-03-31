export default function generateResumeHTML() {
  const data = {
    name: "John Doe",
    title: "Software Engineer",
    summary: "...",
    skills: ["React", "Node.js"],
    experience: [
      {
        role: "Frontend Developer",
        company: "XYZ",
        duration: "2023–Present",
        bullets: ["Improved performance by 30%"],
      },
    ],
  };
  return `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          line-height: 1.6;
        }
        h1 { margin-bottom: 5px; }
        h2 {
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-top: 20px;
        }
        .section { margin-bottom: 20px; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>

      <h1>${data.name}</h1>
      <p><strong>${data.title}</strong></p>

      <div class="section">
        <h2>Summary</h2>
        <p>${data.summary}</p>
      </div>

      <div class="section">
        <h2>Skills</h2>
        <ul>
          ${data.skills.map((skill) => `<li>${skill}</li>`).join("")}
        </ul>
      </div>

      <div class="section">
        <h2>Experience</h2>
        ${data.experience
          .map(
            (exp) => `
          <div>
            <strong>${exp.role} - ${exp.company}</strong>
            <p>${exp.duration}</p>
            <ul>
              ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>

    </body>
    </html>
  `;
}
