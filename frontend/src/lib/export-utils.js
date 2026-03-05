
export async function generatePDF(resumeData, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filename =
        options.filename || `${(resumeData.personalInfo.firstName || "First")}_${(resumeData.personalInfo.lastName || "Last")}_Resume.pdf`

      const mockPdfContent = createMockPDFContent(resumeData)
      const blob = new Blob([mockPdfContent], { type: "application/pdf" })
      const downloadUrl = URL.createObjectURL(blob)

      resolve({ success: true, downloadUrl, filename })
    }, 2000)
  })
}

// Simulate Word generation
export async function generateWord(resumeData, options) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filename =
        options.filename || `${(resumeData.personalInfo.firstName || "First")}_${(resumeData.personalInfo.lastName || "Last")}_Resume.docx`

      const mockWordContent = createMockWordContent(resumeData)
      const blob = new Blob([mockWordContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
      const downloadUrl = URL.createObjectURL(blob)

      resolve({ success: true, downloadUrl, filename })
    }, 1800)
  })
}

// Mock PDF content
function createMockPDFContent(resumeData) {
  const personalInfo = resumeData.personalInfo || {}
  const professionalSummary = resumeData.professionalSummary || ""
  const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim()

  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
...
BT
/F1 16 Tf
50 750 Td
(${fullName || "Resume"}) Tj
0 -20 Td
/F1 12 Tf
(${personalInfo.email || ""}) Tj
0 -15 Td
(${personalInfo.phone || ""}) Tj
0 -30 Td
/F1 14 Tf
(PROFESSIONAL SUMMARY) Tj
0 -20 Td
/F1 10 Tf
(${professionalSummary || "Not provided"}) Tj
ET
endstream
endobj
...`
}

// Mock Word content
function createMockWordContent(resumeData) {
  const personalInfo = resumeData.personalInfo || {}
  const professionalSummary = resumeData.professionalSummary || ""
  const workExperience = resumeData.workExperience || []
  const education = resumeData.education || []
  const skills = resumeData.skills || { technical: [], soft: [] }
  const projects = resumeData.projects || []

  const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim()

  return `
RESUME - ${fullName}

Contact Information:
Email: ${personalInfo.email || ""}
Phone: ${personalInfo.phone || ""}
Address: ${[personalInfo.address, personalInfo.city, personalInfo.state, personalInfo.zipCode].filter(Boolean).join(", ")}

Professional Summary:
${professionalSummary || "Not provided"}

Work Experience:
${workExperience.map(exp => `
${exp.position || ""} at ${exp.company || ""}
${exp.startDate || ""} - ${exp.current ? "Present" : exp.endDate || ""}
${exp.description || ""}
${(exp.achievements || []).filter(Boolean).map(a => `• ${a}`).join("\n")}
`).join("\n")}

Education:
${education.map(edu => `
${edu.degree || ""} in ${edu.field || ""}
${edu.institution || ""}
${edu.startDate || ""} - ${edu.endDate || ""}
${edu.gpa ? `GPA: ${edu.gpa}` : ""} ${edu.honors || ""}
`).join("\n")}

Skills:
Technical Skills: ${(skills.technical || []).join(", ")}
Soft Skills: ${(skills.soft || []).join(", ")}

Projects:
${projects.map(p => `
${p.name || ""}
${p.description || ""}
Technologies: ${(p.technologies || []).join(", ")}
${p.link ? `Link: ${p.link}` : ""}
`).join("\n")}
`
}

// Generate shareable link
export async function generateShareableLink(resumeData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockShareId = Math.random().toString(36).substring(2, 15)
      const shareUrl = `https://resumebuilder.pro/shared/${mockShareId}`
      resolve({ success: true, downloadUrl: shareUrl, filename: "Shareable Link" })
    }, 1000)
  })
}

// Trigger download
export function downloadFile(url, filename) {
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Copy to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
