import React from "react";
import type { PropsWithChildren } from "react";

import { useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === "dark");

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
    throw new Error("useTheme must be called from within a ThemeProvider");
  }

  return context;
}
