import React, { useState, useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";
// ─── Theme Context ────────────────────────────────────────────────────────────
const ThemeContext = React.createContext({ dark: true, toggle: () => {} });
const useTheme = () => React.useContext(ThemeContext);

// ─── Icons ────────────────────────────────────────────────────────────────────
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);
const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);
const BuilderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);
const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// ─── Utilities ────────────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(" ");

const getPriorityStyle = (priority, dark) => {
  if (priority === "high") return dark ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-red-50 text-red-600 border border-red-200";
  if (priority === "medium") return dark ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-amber-50 text-amber-600 border border-amber-200";
  return dark ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200";
};

const getScoreColor = (score) => {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-red-400";
};

const getBarColor = (score) => {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
};

const statusFromScore = (score) => {
  if (score >= 85) return "good";
  if (score >= 70) return "warn";
  return "info";
};

const safeStr = (v, fallback = "—") => (v && String(v).trim() ? String(v) : fallback);

const mapBackendToUi = (api) => {
  const b = api?.atsScore?.breakdown || {};
  const extracted = api?.extractedInformation || {};
  const personal = extracted?.personalInformation || {};

  const expUi = (extracted?.workExperience || []).map((e, idx) => ({
    title: e?.title ?? null,
    company: e?.company ?? null,
    period: e?.dateRange ?? null,
    desc: (e?.bullets || []).slice(0, 2).join(" • ") || null,
    _k: `${e?.title || "role"}-${e?.company || "company"}-${idx}`,
  }));

  const eduUi = (extracted?.education || []).map((e, idx) => ({
    degree: [e?.degree, e?.field].filter(Boolean).join(" in ") || e?.degree || e?.field || null,
    school: e?.school ?? null,
    year: e?.date ?? null,
    _k: `${e?.school || "school"}-${e?.degree || "degree"}-${idx}`,
  }));

  const overall = api?.atsScore?.overall ?? 0;

  return {
    score: overall,
    scoreLabel: api?.reasoningSummary || "Resume analyzed successfully.",
    breakdown: [
      { label: "Formatting", score: b?.formatting?.score ?? 0, status: statusFromScore(b?.formatting?.score ?? 0), note: b?.formatting?.summary ?? "" },
      { label: "Keywords", score: b?.keywords?.score ?? 0, status: statusFromScore(b?.keywords?.score ?? 0), note: b?.keywords?.summary ?? "" },
      { label: "Experience", score: b?.experience?.score ?? 0, status: statusFromScore(b?.experience?.score ?? 0), note: b?.experience?.summary ?? "" },
      { label: "Education", score: b?.education?.score ?? 0, status: statusFromScore(b?.education?.score ?? 0), note: b?.education?.summary ?? "" },
      { label: "Skills", score: b?.skills?.score ?? 0, status: statusFromScore(b?.skills?.score ?? 0), note: b?.skills?.summary ?? "" },
    ],
    extracted: {
      name: personal?.fullName ?? null,
      email: personal?.email ?? null,
      phone: personal?.phone ?? null,
      location: personal?.location ?? null,
      summary: extracted?.professionalSummary ?? null,
      experience: expUi,
      education: eduUi,
      skills: [
        ...(extracted?.skills?.hardSkills || []),
        ...(extracted?.skills?.toolsAndTech || []),
        ...(extracted?.skills?.softSkills || []),
      ].filter(Boolean),
    },
    keywords: {
      found: api?.keywordsAnalysis?.foundKeywords || [],
      missing: api?.keywordsAnalysis?.missingKeywords || [],
    },
    improvements: (api?.improvementRecommendations || []).map((r, idx) => ({
      category: r?.category || "Other",
      priority: r?.priority || "low",
      issue: r?.issue || "",
      suggestion: r?.suggestion || "",
      impact: r?.estimatedScoreIncrease || "",
      _k: `${r?.category || "Other"}-${idx}`,
    })),
  };
};

// ─── Components ───────────────────────────────────────────────────────────────

// Navbar
const Navbar = ({ onReset, hasResult, score }) => {
  const { dark, toggle } = useTheme();
  return (
    <nav className={cn("sticky top-0 z-50 border-b backdrop-blur-xl", dark ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {hasResult && (
            <button onClick={onReset} className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900")}>
              <ArrowLeftIcon /> Back to Home
            </button>
          )}
          <div className={cn("flex items-center gap-2.5", hasResult ? "ml-3" : "")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <TargetIcon />
            </div>
            <span className={cn("font-bold text-lg tracking-tight", dark ? "text-white" : "text-slate-900")}>Resume Scorer</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasResult && (
            <div className={cn("hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border", dark ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : "bg-blue-50 text-blue-700 border-blue-200")}>
              ATS Score: {typeof score === "number" ? `${score}/100` : "—"}
            </div>
          )}
          <button onClick={toggle} className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all border", dark ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400" : "bg-slate-100 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600")}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const ProgressBar = () => {
  const { dark } = useTheme();
  return (
    <div className={cn("border-b", dark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <span className={cn("text-xs font-medium", dark ? "text-slate-400" : "text-slate-500")}>Results & Recommendations</span>
        <span className="text-xs font-semibold text-blue-500">100% Complete</span>
      </div>
      <div className={cn("h-1", dark ? "bg-slate-800" : "bg-slate-200")}>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400 w-full" />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  const { dark } = useTheme();
  return (
    <div className={cn("rounded-2xl p-6 border transition-all hover:scale-[1.02]", dark ? "bg-slate-900 border-slate-800 hover:border-blue-500/40" : "bg-white border-slate-200 hover:border-blue-300 shadow-sm")}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", dark ? "bg-blue-500/15 text-blue-400" : "bg-blue-50 text-blue-600")}>{icon}</div>
      <h3 className={cn("font-semibold mb-2", dark ? "text-white" : "text-slate-900")}>{title}</h3>
      <p className={cn("text-sm leading-relaxed", dark ? "text-slate-400" : "text-slate-500")}>{desc}</p>
    </div>
  );
};

const DropZone = ({ onFileAccepted, disabled }) => {
  const { dark } = useTheme();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  const validateFile = (file) => {
    if (!file) return "No file selected.";
    const name = (file.name || "").toLowerCase();
    const isPdf = file.type === "application/pdf" || name.endsWith(".pdf");
    const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx");
    const isTxt = file.type === "text/plain" || name.endsWith(".txt");
    if (!(isPdf || isDocx || isTxt)) return "Only PDF, DOCX, or TXT files are accepted.";
    if (file.size > 10 * 1024 * 1024) return "File size must be under 10MB.";
    return null;
  };

  const handleFile = (file) => {
    const err = validateFile(file);
    if (err) {
      setError(err);
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (disabled) return;
      setDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [disabled]
  );

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onClick={() => !disabled && !selectedFile && inputRef.current?.click()}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-200",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          dragging
            ? dark
              ? "border-blue-400 bg-blue-500/10"
              : "border-blue-400 bg-blue-50"
            : selectedFile
            ? dark
              ? "border-blue-500/60 bg-blue-500/5 cursor-default"
              : "border-blue-400 bg-blue-50/50 cursor-default"
            : dark
            ? "border-slate-700 hover:border-blue-500/60 hover:bg-blue-500/5"
            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
        )}
      >
        <div className="p-10 flex flex-col items-center gap-4">
          {!selectedFile ? (
            <>
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", dark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")}>
                <UploadIcon />
              </div>
              <div className="text-center">
                <p className={cn("font-semibold text-lg", dark ? "text-white" : "text-slate-800")}>Drop your resume here</p>
                <p className={cn("text-sm mt-1", dark ? "text-slate-400" : "text-slate-500")}>or click to browse files</p>
              </div>
              <button
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) inputRef.current?.click();
                }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium text-sm transition-all shadow-lg",
                  disabled ? "bg-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25 hover:shadow-blue-500/40"
                )}
              >
                <FileIcon /> Choose File
              </button>
              <p className={cn("text-xs", dark ? "text-slate-500" : "text-slate-400")}>
                Supported formats: <span className="font-medium">PDF, DOCX, TXT</span> · Max size: <span className="font-medium">10MB</span>
              </p>
            </>
          ) : (
            <div className="w-full flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", dark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600")}>
                <FileIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("font-semibold truncate", dark ? "text-white" : "text-slate-800")}>{selectedFile.name}</p>
                <p className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) {
                    setSelectedFile(null);
                    setError("");
                    if (inputRef.current) inputRef.current.value = "";
                  }
                }}
                className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0", dark ? "bg-slate-800 text-slate-400 hover:text-red-400" : "bg-slate-100 text-slate-500 hover:text-red-500")}
              >
                <XIcon />
              </button>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      {error && (
        <div className={cn("flex items-center gap-2 px-4 py-3 rounded-xl text-sm", dark ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-50 text-red-600 border border-red-200")}>
          <AlertIcon /> {error}
        </div>
      )}

      {selectedFile && !error && (
        <button
          disabled={disabled}
          onClick={() => onFileAccepted(selectedFile)}
          className={cn(
            "w-full py-3.5 text-white rounded-xl font-semibold text-sm transition-all shadow-lg",
            disabled ? "bg-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.01] active:scale-[0.99]"
          )}
        >
          Analyze Resume →
        </button>
      )}
    </div>
  );
};

const ScoreRing = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const safeScore = typeof score === "number" ? score : 0;
  const progress = (safeScore / 100) * circumference;
  const color = safeScore >= 85 ? "#10b981" : safeScore >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" opacity="0.3" />
          <circle cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - progress} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color }}>
            {safeScore}
          </span>
          <span className="text-xs font-medium text-slate-400">/100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-400">Overall ATS Score</p>
    </div>
  );
};

const ScoreRow = ({ item }) => {
  const { dark } = useTheme();
  const StatusIcon = item.status === "good" ? CheckIcon : item.status === "warn" ? AlertIcon : InfoIcon;
  const iconColor = item.status === "good" ? "text-emerald-400" : item.status === "warn" ? "text-amber-400" : "text-blue-400";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={iconColor}>
            <StatusIcon />
          </span>
          <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-slate-800")}>{item.label}</span>
        </div>
        <span className={cn("text-sm font-bold tabular-nums", getScoreColor(item.score))}>{item.score}/100</span>
      </div>
      <div className={cn("h-2 rounded-full overflow-hidden", dark ? "bg-slate-800" : "bg-slate-200")}>
        <div className={cn("h-full rounded-full", getBarColor(item.score))} style={{ width: `${item.score}%` }} />
      </div>
      <p className={cn("text-xs", dark ? "text-slate-500" : "text-slate-400")}>{item.note}</p>
    </div>
  );
};

const Card = ({ children, className }) => {
  const { dark } = useTheme();
  return <div className={cn("rounded-2xl border p-6", dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm", className)}>{children}</div>;
};

const CardTitle = ({ children }) => {
  const { dark } = useTheme();
  return <h2 className={cn("text-lg font-bold mb-1", dark ? "text-white" : "text-slate-900")}>{children}</h2>;
};
const CardSubtitle = ({ children }) => <p className="text-sm text-slate-400 mb-5">{children}</p>;

const ScoreBreakdownCard = ({ data }) => (
  <Card>
    <CardTitle>ATS Score Breakdown</CardTitle>
    <CardSubtitle>Detailed analysis of your resume's ATS compatibility</CardSubtitle>
    <div className="flex justify-center mb-6">
      <ScoreRing score={data.score} />
    </div>
    <div className="space-y-4">{data.breakdown.map((item) => <ScoreRow key={item.label} item={item} />)}</div>
  </Card>
);

const ExtractedInfoCard = ({ data }) => {
  const { dark } = useTheme();
  const { extracted } = data;

  return (
    <Card>
      <CardTitle>Extracted Information</CardTitle>
      <CardSubtitle>Data parsed from your resume — ready to auto-fill our builder</CardSubtitle>

      <div className="space-y-5">
        <div>
          <div className={cn("flex items-center gap-2 mb-3 text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>
            <span className="text-blue-400">
              <UserIcon />
            </span>{" "}
            Personal Information
          </div>
          <div className="space-y-2 pl-6">
            <p className={cn("font-semibold", dark ? "text-white" : "text-slate-900")}>{safeStr(extracted.name)}</p>
            {[
              { icon: <MailIcon />, val: extracted.email },
              { icon: <PhoneIcon />, val: extracted.phone },
              { icon: <LocationIcon />, val: extracted.location },
            ].map(({ icon, val }, idx) => (
              <div key={`${idx}-${val || "x"}`} className={cn("flex items-center gap-2 text-sm", dark ? "text-slate-400" : "text-slate-500")}>
                {icon} {safeStr(val)}
              </div>
            ))}
          </div>
        </div>

        <div className={cn("h-px", dark ? "bg-slate-800" : "bg-slate-100")} />

        <div>
          <p className={cn("text-sm font-semibold mb-2", dark ? "text-white" : "text-slate-900")}>Professional Summary</p>
          <p className={cn("text-sm leading-relaxed", dark ? "text-slate-400" : "text-slate-500")}>{safeStr(extracted.summary)}</p>
        </div>

        <div className={cn("h-px", dark ? "bg-slate-800" : "bg-slate-100")} />

        <div>
          <div className={cn("flex items-center gap-2 mb-3 text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>
            <span className="text-blue-400">
              <BriefcaseIcon />
            </span>{" "}
            Work Experience
          </div>
          <div className="space-y-3 pl-6">
            {(extracted.experience || []).length === 0 ? (
              <p className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>—</p>
            ) : (
              extracted.experience.map((exp) => (
                <div key={exp._k}>
                  <p className={cn("font-semibold text-sm", dark ? "text-white" : "text-slate-900")}>{safeStr(exp.title)}</p>
                  <p className={cn("text-xs mb-1", dark ? "text-slate-500" : "text-slate-400")}>
                    {safeStr(exp.company)} · {safeStr(exp.period)}
                  </p>
                  <p className={cn("text-xs", dark ? "text-slate-400" : "text-slate-500")}>{safeStr(exp.desc)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={cn("h-px", dark ? "bg-slate-800" : "bg-slate-100")} />

        <div>
          <div className={cn("flex items-center gap-2 mb-3 text-sm font-semibold", dark ? "text-white" : "text-slate-900")}>
            <span className="text-blue-400">
              <GraduationIcon />
            </span>{" "}
            Education
          </div>
          <div className="pl-6">
            {(extracted.education || []).length === 0 ? (
              <p className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>—</p>
            ) : (
              extracted.education.map((ed) => (
                <div key={ed._k}>
                  <p className={cn("font-semibold text-sm", dark ? "text-white" : "text-slate-900")}>{safeStr(ed.degree)}</p>
                  <p className={cn("text-xs", dark ? "text-slate-500" : "text-slate-400")}>
                    {safeStr(ed.school)} · {safeStr(ed.year)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const KeywordsCard = ({ data }) => {
  const { dark } = useTheme();
  return (
    <Card>
      <CardTitle>Keywords Analysis</CardTitle>
      <CardSubtitle>Skills and technologies detected in your resume</CardSubtitle>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-emerald-400 mb-2">✓ Found Keywords</p>
          <div className="flex flex-wrap gap-2">
            {(data.keywords.found || []).map((kw) => (
              <span key={kw} className={cn("px-3 py-1 rounded-full text-xs font-medium border", dark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200")}>
                {kw}
              </span>
            ))}
            {(data.keywords.found || []).length === 0 && <span className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>—</span>}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-red-400 mb-2">✗ Missing Keywords</p>
          <div className="flex flex-wrap gap-2">
            {(data.keywords.missing || []).map((kw) => (
              <span key={kw} className={cn("px-3 py-1 rounded-full text-xs font-medium border", dark ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-red-50 text-red-600 border-red-200")}>
                {kw}
              </span>
            ))}
            {(data.keywords.missing || []).length === 0 && <span className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>—</span>}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ImprovementsCard = ({ data }) => {
  const { dark } = useTheme();
  const PriorityIcon = { high: AlertIcon, medium: InfoIcon, low: CheckIcon };
  return (
    <Card>
      <CardTitle>Improvement Recommendations</CardTitle>
      <CardSubtitle>Actionable steps to boost your ATS score</CardSubtitle>
      <div className="space-y-4">
        {(data.improvements || []).length === 0 ? (
          <p className={cn("text-sm", dark ? "text-slate-400" : "text-slate-500")}>—</p>
        ) : (
          data.improvements.map((item) => {
            const Icon = PriorityIcon[item.priority] || InfoIcon;
            return (
              <div key={item._k} className={cn("rounded-xl border p-4 space-y-3", dark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200")}>
                <div className="flex items-center justify-between">
                  <div className={cn("flex items-center gap-2 font-semibold text-sm", dark ? "text-white" : "text-slate-900")}>
                    <span className={item.priority === "high" ? "text-red-400" : item.priority === "medium" ? "text-amber-400" : "text-blue-400"}>
                      <Icon />
                    </span>
                    {item.category}
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", getPriorityStyle(item.priority, dark))}>{item.priority} priority</span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <span className={cn("text-xs font-medium uppercase tracking-wide", dark ? "text-slate-500" : "text-slate-400")}>Issue</span>
                    <p className={cn("text-sm mt-0.5", dark ? "text-slate-300" : "text-slate-700")}>{item.issue}</p>
                  </div>
                  <div>
                    <span className={cn("text-xs font-medium uppercase tracking-wide", dark ? "text-slate-500" : "text-slate-400")}>Suggestion</span>
                    <p className={cn("text-sm mt-0.5", dark ? "text-slate-300" : "text-slate-700")}>{item.suggestion}</p>
                  </div>
                </div>
                {item.impact ? (
                  <div className={cn("flex items-center gap-1.5 text-xs font-semibold text-blue-400")}>
                    <TrendIcon /> {item.impact}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

const NextStepsCard = ({ onReset }) => {
  const navigate = useNavigate();
  const { dark } = useTheme();
  return (
    <Card>
      <CardTitle>Next Steps</CardTitle>
      <CardSubtitle>Choose how you'd like to proceed</CardSubtitle>
      <div className="space-y-3">
        <button onClick={() => navigate("/resume-builder")} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35">
          Auto-Fill Resume Builder →
        </button>
        <p className={cn("text-xs text-center", dark ? "text-slate-500" : "text-slate-400")}>This will pre-populate the resume builder with your extracted information</p>
        <button onClick={onReset} className={cn("w-full py-3 rounded-xl border font-semibold text-sm transition-all", dark ? "border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400" : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600")}>
          Score Another Resume
        </button>
      </div>
    </Card>
  );
};

const LoadingScreen = () => {
  const { dark } = useTheme();
  const steps = ["Parsing resume content…", "Analyzing ATS compatibility…", "Checking keywords…", "Generating recommendations…"];
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
          <TargetIcon />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className={cn("text-xl font-bold", dark ? "text-white" : "text-slate-900")}>Analyzing Your Resume</h2>
        <p className="text-sm text-blue-400 font-medium min-h-[20px] transition-all">{steps[step]}</p>
      </div>
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i <= step ? "bg-blue-500 w-8" : dark ? "bg-slate-800 w-4" : "bg-slate-300 w-4")} />
        ))}
      </div>
    </div>
  );
};

const UploadPage = ({ onUpload, apiError, disabled }) => {
  const { dark } = useTheme();
  const features = [
    { icon: <TargetIcon />, title: "ATS Compatibility", desc: "Check how well your resume passes through Applicant Tracking Systems used by employers" },
    { icon: <TrendIcon />, title: "Improvement Tips", desc: "Get specific recommendations to improve your resume's performance and increase interview chances" },
    { icon: <BuilderIcon />, title: "Auto-Fill Builder", desc: "Automatically populate our resume builder with your existing information for easy editing" },
  ];

  return (
    <div className={cn("min-h-screen", dark ? "bg-slate-950" : "bg-slate-50")}>
      <Navbar hasResult={false} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border", dark ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-200")}>
            ATS Analysis
          </span>
          <h1 className={cn("text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight", dark ? "text-white" : "text-slate-900")}>
            Get Your Resume
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ATS Score</span>
          </h1>
          <p className={cn("text-lg max-w-xl mx-auto", dark ? "text-slate-400" : "text-slate-500")}>Upload your resume and get detailed feedback on how well it performs with Applicant Tracking Systems</p>
        </div>

        <div className={cn("rounded-2xl border p-6 sm:p-8 mb-8", dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm")}>
          <h2 className={cn("text-lg font-bold mb-1", dark ? "text-white" : "text-slate-900")}>Upload Your Resume</h2>
          <p className={cn("text-sm mb-6", dark ? "text-slate-400" : "text-slate-500")}>Upload your resume (PDF/DOCX/TXT) to get your ATS compatibility score</p>

          {apiError ? (
            <div className={cn("mb-5 flex items-center gap-2 px-4 py-3 rounded-xl text-sm", dark ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-50 text-red-600 border border-red-200")}>
              <AlertIcon /> {apiError}
            </div>
          ) : null}

          <DropZone onFileAccepted={onUpload} disabled={disabled} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </main>
    </div>
  );
};

const ResultsPage = ({ onReset, result }) => {
  const { dark } = useTheme();
  return (
    <div className={cn("min-h-screen", dark ? "bg-slate-950" : "bg-slate-50")}>
      <Navbar hasResult onReset={onReset} score={result?.score} />
      <ProgressBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <span className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border", dark ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-200")}>
            ATS Score: {typeof result?.score === "number" ? `${result.score}/100` : "—"}
          </span>
          <h1 className={cn("text-3xl sm:text-4xl font-black tracking-tight mb-2", dark ? "text-white" : "text-slate-900")}>Your Resume Analysis Results</h1>
          <p className={cn("text-base", dark ? "text-slate-400" : "text-slate-500")}>{result?.scoreLabel || "—"}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScoreBreakdownCard data={result} />
          <ExtractedInfoCard data={result} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <KeywordsCard data={result} />
            <ImprovementsCard data={result} />
          </div>
          <div>
            <NextStepsCard onReset={onReset} />
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Page Component Export ────────────────────────────────────────────────────
export default function ResumeScorer() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("upload"); // upload | loading | results
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");

  const toggle = () => setDark((d) => !d);

  const handleUpload = async (file) => {
    setApiError("");
    setPage("loading");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:8080/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setApiError(data?.error || `Upload failed with status ${res.status}`);
        setPage("upload");
        return;
      }

      setResult(mapBackendToUi(data));
      setPage("results");
    } catch (e) {
      console.error(e);
      setApiError("Upload failed. Check backend URL/CORS and try again.");
      setPage("upload");
    }
  };

  const handleReset = () => {
    setResult(null);
    setApiError("");
    setPage("upload");
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={dark ? "dark" : ""}>
        {page === "upload" && <UploadPage onUpload={handleUpload} apiError={apiError} disabled={page === "loading"} />}
        {page === "loading" && (
          <div className={cn("min-h-screen", dark ? "bg-slate-950" : "bg-slate-50")}>
            <Navbar hasResult={false} />
            <LoadingScreen />
          </div>
        )}
        {page === "results" && result && <ResultsPage onReset={handleReset} result={result} />}
      </div>
    </ThemeContext.Provider>
  );
}