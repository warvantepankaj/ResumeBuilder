export function getResumeHtml(resumeData) {
  const {
    personalInfo = {},
    professionalSummary = "",
    workExperience = [],
    education = [],
    skills = { technical: [], soft: [] },
    projects = [],
  } = resumeData;

  const fullName =
    `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() ||
    "Your Name";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { width: 210mm; min-height: 297mm; margin: 0; padding: 0; }
          .page { width: 210mm; min-height: 297mm; padding: 20mm; }
        </style>
      </head>
      <body class="bg-white">
        <div class="page">

          <div class="text-center border-b-2 pb-4">
            <h1 class="text-3xl font-bold text-purple-600">${fullName.toUpperCase()}</h1>
            <div class="text-gray-700 text-sm">
              ${[personalInfo.phone, personalInfo.email, personalInfo.linkedin]
                .filter(Boolean)
                .join(" | ")}
            </div>
          </div>

          ${
            professionalSummary
              ? `<div class="mt-4">
                   <h2 class="text-sm font-bold text-purple-600">SUMMARY</h2>
                   <p class="text-xs">${professionalSummary}</p>
                 </div>`
              : ""
          }

        </div>
      </body>
    </html>
  `;
}
