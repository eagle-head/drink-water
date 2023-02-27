import { DefaultTheme } from "styled-components/native";

const colors = {
  light: {
    primary: "#44a9f0",
    primaryDark: "#0884db",
    secondary: "#ffffff",
    title: "#1a1a1a",
    subtitle: "#6e6e6e",
    paragraph: "#4a4a4a",
    success: "#38b000",
    warning: "#ffb800",
    error: "#d0421b",
    disabled: "#b8b8b8",
    divider: "#E0E0E0",
  },
  dark: {
    primary: "#44a9f0",
    primaryDark: "#0884db",
    secondary: "#1a1a1a",
    title: "#ffffff",
    subtitle: "#bdbdbd",
    paragraph: "#f2f2f2",
    success: "#60bf68",
    warning: "#ffb800",
    error: "#f66454",
    disabled: "#b8b8b8",
    divider: "#F5F5F5",
  },
};

const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
};

export const lightTheme: DefaultTheme = {
  colors: colors.light,
  spacing,
};

export const darkTheme: DefaultTheme = {
  colors: colors.dark,
  spacing,
};
