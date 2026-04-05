function generateHTML(data) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            margin-bottom: 5px;
          }
          h2 {
            margin-top: 20px;
            border-bottom: 1px solid #ccc;
          }
          ul {
            margin: 5px 0 10px 20px;
          }
        </style>
      </head>

      <body>
        <h1>${data.name}</h1>
        <p>${data.title}</p>
        <p>${data.summary}</p>

        <h2>Skills</h2>
        <p>${data.skills?.join(", ") || ""}</p>

        <h2>Experience</h2>
        ${data.experience
          ?.map(
            (exp) => `
              <div>
                <strong>${exp.role} — ${exp.company}</strong><br/>
                <small>${exp.duration}</small>
                <ul>
                  ${exp.bullets?.map((b) => `<li>${b}</li>`).join("")}
                </ul>
              </div>
            `,
          )
          .join("")}

        <h2>Projects</h2>
        ${data.projects
          ?.map(
            (proj) => `
              <div>
                <strong>${proj.name}</strong>
                <p>${proj.description}</p>
                <ul>
                  ${proj.bullets?.map((b) => `<li>${b}</li>`).join("")}
                </ul>
              </div>
            `,
          )
          .join("")}

        <h2>Education</h2>
        ${data.education
          ?.map(
            (edu) => `
              <div>
                <strong>${edu.degree}</strong>
                <p>${edu.institution} (${edu.year})</p>
              </div>
            `,
          )
          .join("")}
      </body>
    </html>
  `;
}

export default generateHTML;
