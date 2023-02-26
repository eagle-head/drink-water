import React from "react";

import { Button, Typography } from "@/components";
import { useTheme } from "@/contexts";
import { render, fireEvent, screen } from "@/tests/test-utils";
import { darkTheme, lightTheme } from "@/themes";

const TestComponent: RNElement = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Typography variant="paragraph">{theme.colors.primary}</Typography>
      <Button size="small" variant="contained" onPress={toggleTheme} label="Toggle Theme" />
    </>
  );
};

describe("ThemeProvider", () => {
  test("renders children with the light theme by default", () => {
    render(<TestComponent />);

    const typography = screen.getByRole("text", { name: lightTheme.colors.primary });
    expect(typography).toBeDefined();
  });

  test("renders children with the dark theme when the theme is toggled", () => {
    render(<TestComponent />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.press(button);
    const typography = screen.getByRole("text", { name: darkTheme.colors.primary });
    expect(typography).toBeDefined();
  });

  it("should throw an error when used outside of a ThemeProvider", () => {
    expect(() => {
      useTheme();
    }).toThrow();
  });
});
