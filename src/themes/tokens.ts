import { DefaultTheme } from "styled-components/native";

const colors = {
  light: {
    primary: "#4AC4FF", // A slightly lighter and more vibrant primary color
    primaryDark: "#0892E1", // A slightly darker primary color to create contrast
    secondary: "#ffffff",
    title: "#1a1a1a",
    subtitle: "#6e6e6e",
    paragraph: "#4a4a4a",
    accent: "#A8E6CF", // Added an accent color related to water and freshness
    warning: "#FFCA28", // A more vibrant warning color
    disabled: "#b8b8b8",
    divider: "#E0E0E0",
    placeholder: "#7b8794",
    successText: "#009688", // A more consistent success text color
    modalBackground: "#f8f9fA",
    successBackground: "#E0F2F1",
    successBorder: "#009688", // A more consistent success border color
    errorText: "#F44336", // A more consistent error text color
    errorBackground: "#FFEBEE",
    errorBorder: "#F44336", // A more consistent error border color
  },
  dark: {
    primary: "#1E88E5", // A darker primary color for contrast in dark mode
    primaryDark: "#1565C0", // A deeper darker primary color for contrast
    secondary: "#424242", // A dark gray secondary color for backgrounds
    title: "#ffffff",
    subtitle: "#BDBDBD",
    paragraph: "#9E9E9E",
    accent: "#80DEEA", // A lighter version of the accent color for better visibility
    warning: "#FFC107", // A more visible warning color in dark mode
    disabled: "#757575",
    divider: "#616161",
    placeholder: "#9E9E9E",
    successText: "#4CAF50", // A lighter success text color for better visibility
    modalBackground: "#303030", // A dark gray background for modals
    successBackground: "#1B5E20", // A dark green background for success elements
    successBorder: "#4CAF50", // A lighter success border color for better visibility
    errorText: "#E53935", // A lighter error text color for better visibility
    errorBackground: "#B71C1C", // A dark red background for error elements
    errorBorder: "#E53935", // A lighter error border color for better visibility
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
