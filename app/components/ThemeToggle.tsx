"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative flex items-center h-8 w-20 rounded-full 
        bg-gray-200 dark:bg-gray-800 transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        shadow-inner 
      "
      aria-label="Toggle theme"
    >
      {/* Le "curseur" de bascule (rond noir/blanc) */}
      <span
        className={`
          absolute left-0 top-0 h-full w-1/2 rounded-full 
          flex items-center justify-center 
          bg-gray-700 dark:bg-gray-300 
          transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-full" : "translate-x-0"}
          shadow-md
        `}
      >
        {isDark ? (
          <LuMoon className="text-gray-800 text-lg" />
        ) : (
          <LuSun className="text-white text-lg" />
        )}
      </span>

      <span className="absolute left-1 flex items-center justify-center h-full w-1/2">
        <LuSun
          className={`text-gray-500 text-lg transition-opacity duration-300 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
      </span>

      <span className="absolute right-1 flex items-center justify-center h-full w-1/2">
        <LuMoon
          className={`text-gray-500 text-lg transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
