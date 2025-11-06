import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CityProvider } from "./context/CityContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CustomThemeProvider } from "./context/ThemeContext";
import "./utils/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <LanguageProvider>
        <CityProvider>
          <CssBaseline />
          <App />
        </CityProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
