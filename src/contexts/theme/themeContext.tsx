import React from "react";
import type { PropsWithChildren } from "react";

import { DefaultTheme, ThemeProvider as StyledProvider } from "styled-components/native";

import { darkTheme, lightTheme } from "@/themes";

type ThemeContextType =
  | {
      theme: DefaultTheme;
      toggleTheme: () => void;
    }
  | undefined;

const ThemeContext = React.createContext<ThemeContextType>(undefined);

export const ThemeProvider: RNElement<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = React.useCallback(() => {
    setIsDarkMode(prevState => !prevState);
  }, []);

  const theme: DefaultTheme = React.useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
