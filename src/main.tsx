import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./context/ThemeContext";
import "./utils/i18n";
import { LanguageProvider } from "./context/LanguageContext";
import { CityProvider } from "./context/CityContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <CustomThemeProvider>
        <CityProvider>
          <CssBaseline />
          <App />
        </CityProvider>
      </CustomThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
