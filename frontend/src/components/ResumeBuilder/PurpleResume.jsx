"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, Loader2 } from "lucide-react"
import axios from "axios"

export function PurpleResume({ resumeData = {}, compact = false }){
  const [isExporting, setIsExporting] = useState(null)
  const { toast } = useToast()

  const {
    personalInfo = {},
    professionalSummary = "",
    workExperience = [],
    education = [],
    skills = { technical: [], soft: [] },
    projects = [],
  } = resumeData

  const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim()

  // --- HELPER FUNCTIONS ---

  // 1. Ensure links have https:// and are absolute
  const getHref = (url) => {
    if (!url) return "#";
    const cleanUrl = url.replace(/^https?:\/\//, ""); // Remove existing protocol if present
    return `https://${cleanUrl}`;
  }

  // 2. Format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  // --- EXPORT LOGIC ---
  const handleExport = async (format) => {
    console.log("Export clicked:", format);
    setIsExporting(format);

    try {
      // 1. Select ONLY the resume content (ignoring the outer card and buttons)
      const resumeElement = document.getElementById("printable-resume-content");
      
      if (!resumeElement) {
        toast({
            title: "Error",
            description: "Could not find resume content.",
            variant: "destructive",
        });
        return;
      }

      // 2. Get the HTML string
      const htmlContent = resumeElement.innerHTML;

      // 3. Send to Backend
      const response = await axios.post(
        "http://localhost:8080/export",
        {
          htmlContent,
          format,
        },
        { responseType: "blob" } // Important for binary files
      );

      // 4. Create Download Link
      const blob = new Blob([response.data], {
        type:
          format === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume.${format === "word" ? "docx" : "pdf"}`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({ title: "Success", description: `Downloaded as ${format.toUpperCase()}` });

    } catch (error) {
      console.error("EXPORT ERROR:", error);
      toast({
        title: "Export Failed",
        description: "Something went wrong. Check the server console.",
        variant: "destructive",
      });
    } finally {
        setIsExporting(null);
    }
  };

  return (
    <div id="resume-preview" className="space-y-8 ">

      {/* --- CONTROL PANEL (Buttons) --- */}
      {!compact && (
        <Card className="bg-white dark:bg-gray-900 print:hidden flex">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">Export Your Resume</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Download in your preferred format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className={'bg-purple-600 text-white hover:bg-purple-500 dark:bg-purple-900'} onClick={() => handleExport("pdf")} disabled={isExporting}>
                {isExporting === "pdf" ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                {isExporting === "pdf" ? "Generating PDF..." : "Download as PDF"}
              </Button>
              <Button className={'bg-purple-600 text-white hover:bg-purple-500 hover:dark:bg-purple-900 dark:bg-purple-900'} onClick={() => handleExport("word")} variant="outline" disabled={isExporting}>
                {isExporting === "word" ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                {isExporting === "word" ? "Generating Word..." : "Download as Word"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* --- RESUME PREVIEW WRAPPER --- */}
      <Card  className="bg-white shadow-2xl border-purple-300 dark:bg-gray-900 w-[210mm] min-h-[297mm] ">
        <CardContent>
          
          {/* --- PRINTABLE CONTENT (This ID is crucial) --- */}
          <div 
            id="printable-resume-content" 
            className="bg-white dark:bg-gray-900 p-2 min-h-[800px] text-gray-900 dark:text-gray-100"
          >
            
            {/* 1. HEADER */}
            <div className="text-center border-gray-200 dark:border-gray-700 mb-3">
              <h1 className="text-4xl font-bold text-purple-600 mb-1">{fullName.toUpperCase() || "Your Name"}</h1>
              
              <div className="text-gray-600 dark:text-gray-300 flex flex-col items-center gap-1">
                {/* Location */}
                {(personalInfo.city || personalInfo.state) && (
                  <div className="text-xl my-1 font-semibold">
                    {[personalInfo.city, personalInfo.state].filter(Boolean).join(", ")}
                  </div>
                )}

                {/* Contacts Row */}
                <div className="flex flex-wrap justify-center items-center gap-2 text-md font-semibold">
                  
                  {/* Phone */}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}

                  {/* Email */}
                  {personalInfo.email && (
                    <>
                      {personalInfo.phone && <span className="text-gray-400">|</span>}
                      <a href={`mailto:${personalInfo.email}`} className="text-blue-400  cursor-pointer">
                        {personalInfo.email}
                      </a>
                    </>
                  )}

                  {/* LinkedIn */}
                  {personalInfo.linkedin && (
                    <>
                      {(personalInfo.phone || personalInfo.email) && <span className="text-gray-400">|</span>}
                      <a href={getHref(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-blue-400  cursor-pointer">
                        LinkedIn
                      </a>
                    </>
                  )}

                  {/* Portfolio */}
                  {personalInfo.website && (
                    <>
                      {((personalInfo.phone || personalInfo.email || personalInfo.linkedin) && <span className="text-gray-400">|</span>)}
                      <a href={getHref(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="text-blue-400  cursor-pointer">
                        Portfolio
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 2. SUMMARY */}
            {professionalSummary && (
              <div className="text-justify mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-purple-500 font-bold">SUMMARY</p>
                  <div className="flex-1 border-t mt-1 border-purple-500"></div>
                </div>
                <p className="text-sm leading-tight pl-6 pr-3 font-normal">
                  {professionalSummary}
                </p>
              </div>
            )}

            {/* 3. WORK EXPERIENCE */}
            {workExperience.length > 0 && (
              <div className="mb-1 pt-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-purple-500 font-bold mb-1">WORK EXPERIENCE</p>
                  <div className="flex-1 border-t-[0.1px] mt-1 border-purple-500"></div>
                </div>
                {workExperience.map((exp) => (
                  <div key={exp.id} className="mb-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-medium text-sm pl-4 text-gray-900 dark:text-gray-100"> <span className="font-semibold"> {exp.position}</span></h3>
                        <p className="text-sm pl-4 font-medium text-black dark:text-white"><span className="font-semibold">{exp.company} </span></p>
                      </div>
                      <div className="text-right pr-2">
                        <div className="text-[12px] font-medium text-black dark:text-white">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                        {exp.location && (
                          <div className="text-[12px] font-medium text-black dark:text-white">
                            {exp.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pl-4 text-justify leading-tight">
                      {exp.description && (
                        <p className="text-sm pl-4 leading-tight pr-2 font-normal text-black dark:text-white" style={{ textIndent: '-0.8em' }}>
                          • {exp.description}
                        </p>
                      )}
                      {exp.achievements?.filter(Boolean).length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                          {exp.achievements.filter(Boolean).map((ach, i) => <li key={i}>{ach}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. EDUCATION */}
            {education.length > 0 && (
              <div className="mt-2 pl-1 mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-purple-600 font-bold mb-1">EDUCATION</p>
                  <div className="flex-1 border-t-[0.1px] mt-1 border-purple-500"></div>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-1 pr-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="leading-[1.2]">
                          <p className="text-black pl-3 font-medium text-[14px] dark:text-white"><span className="font-semibold">{edu.institution} </span> </p>
                          <p className="font-normal pl-6 text-[13px] mt-1 text-black dark:text-white">
                            {edu.degree} {edu.field}, CGPA: <span className="font-semibold">{edu.gpa}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-[12px] font-medium text-black dark:text-white">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. SKILLS */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
              <div className="mb-2 pl-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-lg text-purple-600 font-bold">SKILLS</p>
                  <div className="flex-1 border-t-[0.5px] mt-1 border-purple-600"></div>
                </div>
                {skills.technical.length > 0 && (
                  <p className="text-[14px] pl-3">
                    <span className="font-semibold">Technical Skill : </span> {skills.technical.join(", ")}
                  </p>
                )}
                {skills.soft.length > 0 && (
                  <p className="text-[14px] pl-3">
                    <span className="font-semibold ">Soft Skill : </span> {skills.soft.join(", ")}
                  </p>
                )}
              </div>
            )}

            {/* 6. PROJECTS */}
            {projects.length > 0 && (
              <div className="mb-1 pl-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-purple-600 font-bold mb-1">PROJECT</p>
                  <div className="flex-1 border-t-[0.1px] mt-1 border-purple-600"></div>
                </div>
                {projects.map((p) => (
                  <div key={p.id} className="mb-2">
                    <div className="flex justify-between items-start -py-0.5 pr-2">
                      <div className="flex justify-between items-center gap-3">
                        <p className="font-medium text-[14px] pl-3 text-black dark:text-white"><span className="font-semibold">{p.name} | </span></p>
                        {p.link && (
                          <>
                            <span className="text-gray-400">|</span>
                            <a href={getHref(p.link)} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                              {p.link}
                            </a>
                          </>
                        )}
                        {p.technologies.length > 0 && <p className="text-[13px] text-black dark:text-white">{p.technologies.join(", ")}</p>}
                      </div>
                      <div className="text-right text-[12px] font-medium text-black dark:text-white">{formatDate(p.startDate)} - {formatDate(p.endDate)}</div>
                    </div>
                    <div className="text-black dark:text-white -mb-1 text-[12px] text-justify pl-4 pr-2">
                        {p.description && (
                        <ul className="list-disc list-outside space-y-0.05 text-[12.5px] text-black dark:text-white pl-5">
                          {p.description
                            .split(/(?<=\.)\s+(?=[A-Z])/g)
                            .filter(sentence => sentence.trim() !== "")
                            .map((sentence, index) => (
                              <li key={index} className="pl-1 text-left">{sentence.trim()}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div> 
          {/* End of printable-resume-content */}

        </CardContent>
      </Card>
    </div>
  )
}

