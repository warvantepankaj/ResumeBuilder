import { FileText, ClipboardCheck } from "lucide-react";
// import useDarkMode from "../hooks/useDarkMode.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";  
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  // const [theme, setTheme] = useDarkMode();
  const {isSignedIn} = useUser();
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  
   const handleStartBuilding = () => {
    if (!isSignedIn) {
      openSignIn();
    } 
    else {
      navigate("/resume-builder");
    }
  };

   const handleScoreResume = () => {
    if (!isSignedIn) {
      openSignIn();
    } 
    else {
      navigate("/resume-scorer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />  

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 py-20 px-6 flex-grow  bg-white dark:bg-gray-900">
        <span className="bg-purple-600 text-white dark:bg-gray-800 text-sm font-medium px-3 py-1 rounded-full">
          Professional Resume Tools
        </span>
        <h2 className="mt-4 leading-tight text-6xl font-bold text-purple-600 dark:text-purple-500 ">
          Build Perfect Resumes & Get <br /> ATS Scores
        </h2>
        <p className="mt-4 font-normal text-gray-600 text-xl dark:text-gray-300 max-w-4xl">
          Create professional resumes with our intuitive builder and analyze your
          existing resume  with  our ATS scoring system.  Get hired faster with
          optimized resumes.
        </p>

        <div className="mt-8 flex flex-col font-semibold  sm:flex-row gap-4">
          <button  onClick={handleStartBuilding}  className="bg-purple-600  dark:bg-purple-500 dark: hover:bg-purple-400 text-lg text-white  dark:text-black px-6 py-3 rounded-lg flex items-center gap-2">
            <FileText size={18} /> Start Building Resume
          </button>
          <button onClick={handleScoreResume} className="border border-gray-300 hover:bg-purple-600 hover:text-white dark:border-gray-600 px-6 py-3 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ClipboardCheck size={18} /> Check ATS Score
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 w-full py-16 px-6">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Everything You Need to Land Your Dream Job
        </h3>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mt-2">
          Two powerful modules to create and optimize your resume
        </p>

        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Builder Card */}
          <div className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-purple-500" size={24} />
              <h4 className="font-semibold text-2xl text-gray-800 dark:text-gray-100">
                Resume Builder Module
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-3">
              Create professional resumes from scratch
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 text-sm space-y-1">
              <li>Interactive form with all necessary fields</li>
              <li>Pre-designed professional templates</li>
              <li>Download resumes in PDF format</li>
            </ul>
          </div>

          {/* Resume Scorer Card */}
          <div className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardCheck className="text-purple-500" size={24} />
              <h4 className="font-semibold text-2xl text-gray-800 dark:text-gray-100">
                Resume Scorer Module
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-3">
              Analyze and improve your existing resume
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 text-sm space-y-1">
              <li>Upload your existing resume</li>
              <li>Get ATS compatibility score instantly</li>
              <li>Suggestions to optimize your resume</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full py-16 px-6 bg-white dark:bg-gray-900">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Why Choose ResumeAI ?
        </h3>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mt-2">
          Build professional resumes in minutes with advanced AI features
        </p>

        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
              Fast & Easy
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
              Create professional resumes in <br /> minutes with our intuitive interface
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM12 14c-3.866 0-7 2.239-7 5v3h14v-3c0-2.761-3.134-5-7-5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
              ATS Optimized
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
              Get detailed scoring and recommendations to pass ATS systems
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12h16M4 8h16M4 4h16" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
              Multiple Formats
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
              Download your resume as PDF <br /> or Word document instantly
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

