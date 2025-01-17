import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/Auth";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";
import { InpProvider } from "./context/InputContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LangProvider>
          <InpProvider>
            <App />
          </InpProvider>
        </LangProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
