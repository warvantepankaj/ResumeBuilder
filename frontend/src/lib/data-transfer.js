// Convert extracted data from scorer to resume builder format
export function convertExtractedDataToResumeData(extractedData) {
  // Parse name into first and last name
  const nameParts = extractedData.personalInfo.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Parse location into city and state
  const locationParts = extractedData.personalInfo.location.split(", ");
  const city = locationParts[0] || "";
  const state = locationParts[1] || "";

  // Convert personal info
  const personalInfo = {
    firstName,
    lastName,
    email: extractedData.personalInfo.email,
    phone: extractedData.personalInfo.phone,
    address: "",
    city,
    state,
    zipCode: "",
    linkedin: "",
    website: "",
  };

  // Convert work experience
  const workExperience = extractedData.experience.map((exp, index) => ({
    id: `extracted-${index}`,
    company: exp.company,
    position: exp.position,
    startDate: parseDurationToDate(exp.duration, "start"),
    endDate: parseDurationToDate(exp.duration, "end"),
    current: exp.duration.toLowerCase().includes("present"),
    description: exp.description,
    achievements: exp.description ? [exp.description] : [],
  }));

  // Convert education
  const education = extractedData.education.map((edu, index) => ({
    id: `extracted-edu-${index}`,
    institution: edu.institution,
    degree: edu.degree,
    field: "", // Not available in extracted data
    startDate: "",
    endDate: edu.year ? `${edu.year}-12` : "",
    gpa: "",
    honors: "",
  }));

  // Convert skills - assume all extracted skills are technical
  const skills = {
    technical: extractedData.skills,
    soft: [],
  };

  return {
    personalInfo,
    professionalSummary: extractedData.summary,
    workExperience,
    education,
    skills,
    projects: [], // No projects in extracted data
    selectedTemplate: "modern",
  };
}

// Parse duration string to extract dates
function parseDurationToDate(duration, type) {
  const parts = duration.split(" - ");

  if (type === "start" && parts[0]) {
    const year = parts[0].trim();
    if (year.match(/^\d{4}$/)) {
      return `${year}-01`; // Default to January
    }
  }

  if (type === "end" && parts[1]) {
    const endPart = parts[1].trim();
    if (endPart.toLowerCase() === "present") {
      return ""; // Current job
    }
    if (endPart.match(/^\d{4}$/)) {
      return `${endPart}-12`; // Default to December
    }
  }

  return "";
}

// Store data in localStorage for transfer between pages
export function storeExtractedData(data) {
  const transferId = `transfer_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const convertedData = convertExtractedDataToResumeData(data);

  localStorage.setItem(transferId, JSON.stringify(convertedData));

  // Clean up old transfer data (keep only last 5)
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("transfer_"));
  if (keys.length > 5) {
    keys
      .sort()
      .slice(0, -5)
      .forEach((key) => localStorage.removeItem(key));
  }

  return transferId;
}

// Retrieve data from localStorage
export function retrieveExtractedData(transferId) {
  try {
    const data = localStorage.getItem(transferId);
    if (data) {
      // Clean up after retrieval
      localStorage.removeItem(transferId);
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to retrieve extracted data:", error);
  }
  return null;
}

// Merge extracted data with existing resume data
export function mergeResumeData(existing, extracted) {
  return {
    personalInfo: { ...existing.personalInfo, ...extracted.personalInfo },
    professionalSummary: extracted.professionalSummary || existing.professionalSummary,
    workExperience: extracted.workExperience || existing.workExperience,
    education: extracted.education || existing.education,
    skills: extracted.skills || existing.skills,
    projects: extracted.projects || existing.projects,
    selectedTemplate: extracted.selectedTemplate || existing.selectedTemplate,
  };
}
