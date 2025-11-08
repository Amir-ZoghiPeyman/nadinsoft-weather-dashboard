import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useContext, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: (newMode: ThemeMode) => void;
}
declare module "@mui/material/styles" {
  interface Palette {
    navbar: {
      main: string;
    };
  }
  interface PaletteOptions {
    navbar?: {
      main?: string;
    };
  }
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem("theme") as ThemeMode) || "light"
  );

  const toggleTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#EAF6FF" },
                primary: { main: "#2196F3" },
                secondary: { main: "#D3E1E7" },
                navbar: { main: "#F3FAFE" },
              }
            : {
                background: { default: "#151D32" },
                primary: { main: "#90caf9" },
                secondary: { main: "#404961" },
                navbar: { main: "#151D32" },
              }),
        },
        typography: {
          fontFamily: `'Vazir', 'Roboto', sans-serif`,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
