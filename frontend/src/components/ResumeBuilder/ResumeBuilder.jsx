import ResumeBuilderPage from "@/app/ResumeBuilder/ResumeBuilderPage.jsx"
import { ThemeProvider } from "../theme-provider.jsx"

const ResumeBuilder = () => {
  return (
      <ThemeProvider> 
        <ResumeBuilderPage/>
      </ThemeProvider>
  )
}

export default ResumeBuilder
