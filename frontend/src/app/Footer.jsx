import { FileText } from 'react-feather'

const Footer = () => {
  return (
    <>
     <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
          <span className="flex items-center text-2xl gap-2 text-purple-700 dark:text-white font-semibold">
            <FileText size={24} />
            ResumeAI
          </span>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Build professional resumes and get hired faster
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} ResumeBuilder Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
