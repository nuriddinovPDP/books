import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode"))
      : true
  );
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(isDark));
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
export { ThemeProvider };
