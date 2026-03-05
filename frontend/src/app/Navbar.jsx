import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { Sun, Moon } from "lucide-react";

import useDarkMode from "../hooks/useDarkMode"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useDarkMode();

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full mb-3 flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/70 shadow-lg text-gray-700 dark:text-gray-200 backdrop-blur-xl py-3 md:py-4"
          : "bg-transparent py-4 md:py-6 shadow-lg"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        {/* <FileText className="text-purple-600" size={24} /> */}
         <img src="/logo.svg" alt="" className="h-7" />
        <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
          ResumeAI
        </h1>
      </Link>

      {/* Right Section */}
      <div className="flex items-center  gap-4">
        {/* 🌙 Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-purple-400 dark:hover:bg-gray-600 transition-all"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* 👤 User / Login */}
        {user ? (
          <UserButton/>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-purple-600 text-white px-6 py-2 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
