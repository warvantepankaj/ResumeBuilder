import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/Home.jsx";
// import ResumeBuilderPage from "./app/ResumeBuilder/ResumeBuilderPage.jsx";
import ResumeScorer from "./components/ResumeScore/ResumeScorerPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/resume-builder",  
        element: <ResumeBuilder/>
      },
      {
        path: "/resume-scorer",  
        element: <ResumeScorer/>
      }
    ]  
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);