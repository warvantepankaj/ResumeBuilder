"use client";


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";
import { Progress } from "@/components/ui/Progress.jsx";
import { useToast } from "@/hooks/use-toast.jsx";
import { ArrowLeft, Eye, Download, CheckCircle } from "lucide-react";

import { PersonalInfoForm } from "@/components/ResumeBuilder/PersonalInfoForm.jsx";
import { ProfessionalSummaryForm } from "@/components/ResumeBuilder/ProfessionalSummaryForm.jsx";
import { WorkExperienceForm } from "@/components/ResumeBuilder/WorkExperienceForm.jsx";
import { EducationForm } from "@/components/ResumeBuilder/EducationForm.jsx";
import { SkillsForm } from "@/components/ResumeBuilder/SkillsForm.jsx";
import { ProjectsForm } from "@/components/ResumeBuilder/ProjectsForm.jsx";
import { TemplateSelector } from "@/components/ResumeBuilder/TemplateSelector.jsx";
import { PurpleResume } from "@/components/ResumeBuilder/PurpleResume.jsx";
import { retrieveExtractedData, mergeResumeData } from "@/lib/data-transfer";
import { ThemeToggle } from "@/components/theme-toggle.jsx";

const FORM_STEPS = [
  { id: "personal", title: "Personal Info", description: "Basic contact information" },
  { id: "summary", title: "Professional Summary", description: "Brief overview of your career" },
  { id: "experience", title: "Work Experience", description: "Your professional background" },
  { id: "education", title: "Education", description: "Academic qualifications" },
  { id: "skills", title: "Skills", description: "Technical and soft skills" },
  { id: "projects", title: "Projects", description: "Notable projects (optional)" },
  { id: "template", title: "Choose Template", description: "Select your preferred design" },
  { id: "preview", title: "Preview & Download", description: "Final review and export" },
];

export default function ResumeBuilderPage() {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [dataTransferred, setDataTransferred] = useState(false);

  // Initialize resumeData from localStorage if available
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData
      ? JSON.parse(savedData)
      : {
          personalInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            linkedin: "",
            website: "",
          },
          professionalSummary: "",
          workExperience: [],
          education: [],
          skills: {
            technical: [],
            soft: [],
          },
          projects: [],
          selectedTemplate: "modern",
        };
  });

  // Initialize currentStep from localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? Number(savedStep) : 0;
  });

  // Save resumeData whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Save currentStep whenever it changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  // Load extracted data if transfer param exists
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const transferId = searchParams.get("transfer");

    if (transferId && !dataTransferred) {
      const extractedData = retrieveExtractedData(transferId);
      if (extractedData) {
        setResumeData((prevData) => mergeResumeData(prevData, extractedData));
        setDataTransferred(true);

        toast({
          title: "Data Loaded Successfully",
          description: "Your resume information has been pre-filled from the scorer analysis.",
        });
      } else {
        toast({
          title: "Transfer Failed",
          description: "Could not load the extracted data. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [dataTransferred, toast]);

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const completeResume = () => {
    toast({
      title: "Resume Completed",
      description: "You have successfully completed all steps. You can now download your resume.",
    });
  };

  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

  const renderCurrentForm = () => {
    switch (FORM_STEPS[currentStep].id) {
      case "personal":
        return <PersonalInfoForm data={resumeData.personalInfo} onUpdate={(data) => updateResumeData("personalInfo", data)} />;
      case "summary":
        return <ProfessionalSummaryForm data={resumeData.professionalSummary} onUpdate={(data) => updateResumeData("professionalSummary", data)} />;
      case "experience":
        return <WorkExperienceForm data={resumeData.workExperience} onUpdate={(data) => updateResumeData("workExperience", data)} />;
      case "education":
        return <EducationForm data={resumeData.education} onUpdate={(data) => updateResumeData("education", data)} />;
      case "skills":
        return <SkillsForm data={resumeData.skills} onUpdate={(data) => updateResumeData("skills", data)} />;
      case "projects":
        return <ProjectsForm data={resumeData.projects} onUpdate={(data) => updateResumeData("projects", data)} />;
      case "template":
        return <TemplateSelector selectedTemplate={resumeData.selectedTemplate} onSelect={(template) => updateResumeData("selectedTemplate", template)} resumeData={resumeData} />;
      case "preview":
        return <PurpleResume resumeData={resumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </a>
              <div className="flex items-center space-x-2">
                {dataTransferred && (
                  <Badge variant="default" className="ml-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Data Loaded
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 ">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="bg-transparent ">
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              {currentStep === FORM_STEPS.length - 1 && (
                <Button size="sm" className={'text-white dark;text-white bg-purple-600 dark:bg-purple-700 hover:bg-purple-500 hover:dark:bg-purple-600'}>
                  <Download className="h-4 w-4 mr-2 text-white dark;text-white" />
                  Download Resume
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {FORM_STEPS.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 [&>div]:bg-purple-600"/>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {dataTransferred && currentStep === 0 && (
          <Card className="bg-purple-50 dark:bg-purple-900/20 max-w-4xl mx-auto mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-primary">Data Successfully Loaded</h3>
                  <p className="text-sm text-muted-foreground">
                    Your resume information has been pre-filled from the ATS analysis. Review and edit as needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : "max-w-4xl mx-auto"}`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Step Header */}
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-2 bg-purple-600 dark:bg-purple-800 text-white">
                {FORM_STEPS[currentStep].id}
              </Badge>
              <h2 className="text-2xl font-bold mb-2 text-purple-700">{FORM_STEPS[currentStep].title}</h2>
              <p className="text-muted-foreground">{FORM_STEPS[currentStep].description}</p>
            </div>

            {/* Form Content */}
            <Card>
              <CardContent className="p-6">{renderCurrentForm()}</CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="bg-transparent hover:bg-purple-600 hover:text-white dark:dark:text-white dark:hover:bg-purple-800 "
              >
                Previous
              </Button>

              {currentStep === FORM_STEPS.length - 1 ? (
                <Button onClick={completeResume} className={'bg-purple-600 text-white hover:bg-purple-500 '} >Complete</Button>
              ) : (
                <Button onClick={nextStep} className={'bg-purple-600 text-white hover:bg-purple-500 dark:bg-purple-800 '}>Next Step</Button>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <CardDescription>See how your resume looks in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <PurpleResume resumeData={resumeData} compact />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}














// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/Button.jsx";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card.jsx";
// import { Badge } from "@/components/ui/Badge.jsx";
// import { Progress } from "@/components/ui/Progress.jsx";
// import { useToast } from "@/hooks/use-toast.jsx";
// import { ArrowLeft, Eye, Download, CheckCircle } from "lucide-react";

// import { PersonalInfoForm } from "@/components/ResumeBuilder/PersonalInfoForm.jsx";
// import { ProfessionalSummaryForm } from "@/components/ResumeBuilder/ProfessionalSummaryForm.jsx";
// import { WorkExperienceForm } from "@/components/ResumeBuilder/WorkExperienceForm.jsx";
// import { EducationForm } from "@/components/ResumeBuilder/EducationForm.jsx";
// import { SkillsForm } from "@/components/ResumeBuilder/SkillsForm.jsx";
// import { ProjectsForm } from "@/components/ResumeBuilder/ProjectsForm.jsx";
// import { TemplateSelector } from "@/components/ResumeBuilder/TemplateSelector.jsx";
// import { PurpleResume } from "@/components/ResumeBuilder/PurpleResume.jsx";
// import { retrieveExtractedData, mergeResumeData } from "@/lib/data-transfer";
// import { ThemeToggle } from "@/components/theme-toggle.jsx";

// const FORM_STEPS = [
//   { id: "personal", title: "Personal Info", description: "Basic contact information" },
//   { id: "summary", title: "Professional Summary", description: "Brief overview of your career" },
//   { id: "experience", title: "Work Experience", description: "Your professional background" },
//   { id: "education", title: "Education", description: "Academic qualifications" },
//   { id: "skills", title: "Skills", description: "Technical and soft skills" },
//   { id: "projects", title: "Projects", description: "Notable projects (optional)" },
//   { id: "template", title: "Choose Template", description: "Select your preferred design" },
//   { id: "preview", title: "Preview & Download", description: "Final review and export" },
// ];

// export default function ResumeBuilderPage() {
//   const { toast } = useToast();
//   const [showPreview, setShowPreview] = useState(false);
//   const [dataTransferred, setDataTransferred] = useState(false);

//   // 👇 Add: get logged-in user's email (replace this with your actual auth source)
//   const userEmail = localStorage.getItem("userEmail"); // or from context/auth

//   // ✅ Create unique keys for each user
//   const RESUME_KEY = `resumeData_${userEmail || "guest"}`;
//   const STEP_KEY = `currentStep_${userEmail || "guest"}`;

//   // ✅ Initialize resumeData for each user separately
//   const [resumeData, setResumeData] = useState(() => {
//     const savedData = localStorage.getItem(RESUME_KEY);
//     return savedData
//       ? JSON.parse(savedData)
//       : {
//           personalInfo: {
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             address: "",
//             city: "",
//             state: "",
//             zipCode: "",
//             linkedin: "",
//             website: "",
//           },
//           professionalSummary: "",
//           workExperience: [],
//           education: [],
//           skills: {
//             technical: [],
//             soft: [],
//           },
//           projects: [],
//           selectedTemplate: "modern",
//         };
//   });

//   // ✅ Initialize currentStep per user
//   const [currentStep, setCurrentStep] = useState(() => {
//     const savedStep = localStorage.getItem(STEP_KEY);
//     return savedStep ? Number(savedStep) : 0;
//   });

//   // ✅ Save resumeData whenever it changes (per user)
//   useEffect(() => {
//     if (userEmail) {
//       localStorage.setItem(RESUME_KEY, JSON.stringify(resumeData));
//     }
//   }, [resumeData, userEmail]);

//   // ✅ Save currentStep whenever it changes (per user)
//   useEffect(() => {
//     if (userEmail) {
//       localStorage.setItem(STEP_KEY, currentStep.toString());
//     }
//   }, [currentStep, userEmail]);

//   // Load extracted data if transfer param exists
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const transferId = searchParams.get("transfer");

//     if (transferId && !dataTransferred) {
//       const extractedData = retrieveExtractedData(transferId);
//       if (extractedData) {
//         setResumeData((prevData) => mergeResumeData(prevData, extractedData));
//         setDataTransferred(true);

//         toast({
//           title: "Data Loaded Successfully",
//           description: "Your resume information has been pre-filled from the scorer analysis.",
//         });
//       } else {
//         toast({
//           title: "Transfer Failed",
//           description: "Could not load the extracted data. Please try again.",
//           variant: "destructive",
//         });
//       }
//     }
//   }, [dataTransferred, toast]);

//   const updateResumeData = (section, data) => {
//     setResumeData((prev) => ({
//       ...prev,
//       [section]: data,
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < FORM_STEPS.length - 1) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   const completeResume = async () => {
//   try {
//     // Send resume data to backend
//     const response = await api.post("/resume", resumeData);
    
//     toast({
//       title: "Resume Saved ✅",
//       description: "Your resume has been successfully saved to the backend.",
//     });

//     console.log("Server response:", response.data);
//   } catch (error) {
//     console.error("Error saving resume:", error);
//     toast({
//       title: "Save Failed ❌",
//       description: "There was a problem saving your resume. Please try again.",
//       variant: "destructive",
//     });
//   }
// };


//   const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

//   const renderCurrentForm = () => {
//     switch (FORM_STEPS[currentStep].id) {
//       case "personal":
//         return <PersonalInfoForm data={resumeData.personalInfo} onUpdate={(data) => updateResumeData("personalInfo", data)} />;
//       case "summary":
//         return <ProfessionalSummaryForm data={resumeData.professionalSummary} onUpdate={(data) => updateResumeData("professionalSummary", data)} />;
//       case "experience":
//         return <WorkExperienceForm data={resumeData.workExperience} onUpdate={(data) => updateResumeData("workExperience", data)} />;
//       case "education":
//         return <EducationForm data={resumeData.education} onUpdate={(data) => updateResumeData("education", data)} />;
//       case "skills":
//         return <SkillsForm data={resumeData.skills} onUpdate={(data) => updateResumeData("skills", data)} />;
//       case "projects":
//         return <ProjectsForm data={resumeData.projects} onUpdate={(data) => updateResumeData("projects", data)} />;
//       case "template":
//         return <TemplateSelector selectedTemplate={resumeData.selectedTemplate} onSelect={(template) => updateResumeData("selectedTemplate", template)} resumeData={resumeData} />;
//       case "preview":
//         return <PurpleResume resumeData={resumeData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* ... (UI code stays the same) */}
//     </div>
//   );
// }

