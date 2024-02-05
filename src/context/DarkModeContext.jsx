import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({});

function DarkModeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    "theme",
  );
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const element = document.documentElement;

    if (isDarkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
      if (element.classList.length === 0) {
        element.removeAttribute("class");
      }
    }
  }, [isDarkMode, theme]);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider ");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
