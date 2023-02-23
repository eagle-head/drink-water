import "react-native";
import React from "react";

import { render, screen } from "@testing-library/react-native";

import { Button } from "../Button";

import { Colors } from "@/assets";

const LABEL = "button label";

describe("Button", () => {
  test("Render the button component with a label text passed as a prop.", () => {
    render(<Button variant="contained" size="small" label={LABEL} isPressed />);

    const ButtonComponent = screen.getByRole("button", { name: /button label/i });
    expect(ButtonComponent).toBeDefined();
  });

  test("Render the button component with small size and contained style.", () => {
    render(<Button variant="contained" size="small" label={LABEL} />);

    const SmallButtonLabel = screen.getByTestId("button-label");
    const SmallButton = screen.getByRole("button", { name: /button label/i });

    expect(SmallButton).toHaveStyle([
      {
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
      },
      {
        height: 40,
        width: "35%",
      },
      {
        backgroundColor: Colors.Primary,
      },
    ]);

    expect(SmallButtonLabel).toHaveStyle([
      {
        fontWeight: "normal",
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      {
        fontSize: 18,
      },
      {
        color: Colors.White,
      },
    ]);
  });

  test("Render the button component with medium size and outlined style.", () => {
    render(<Button variant="outlined" size="medium" label={LABEL} />);

    const MediumButtonLabel = screen.getByTestId("button-label");
    const MediumButton = screen.getByRole("button", { name: /button label/i });
    expect(MediumButton).toHaveStyle([
      {
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
      },
      {
        height: 50,
        width: "50%",
      },
      {
        backgroundColor: "transparent",
        borderColor: Colors.Primary,
        borderWidth: 2.5,
      },
    ]);

    expect(MediumButtonLabel).toHaveStyle([
      {
        fontWeight: "normal",
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      {
        fontSize: 22,
      },
      {
        color: Colors.Primary,
        letterSpacing: 0.5,
      },
    ]);
  });

  test("Render the button component with large size.", () => {
    render(<Button variant="contained" size="large" label={LABEL} />);

    const LargeButtonLabel = screen.getByTestId("button-label");
    const LargeButton = screen.getByRole("button", { name: /button label/i });
    expect(LargeButton).toHaveStyle([
      {
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
      },
      {
        height: 60,
        width: "100%",
      },
      {
        backgroundColor: Colors.Primary,
      },
    ]);

    expect(LargeButtonLabel).toHaveStyle([
      {
        fontWeight: "normal",
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      {
        fontSize: 26,
        letterSpacing: 1.5,
      },
      {
        color: Colors.White,
      },
    ]);
  });

  test("Render the button component in the Disabled state.", () => {
    render(<Button variant="contained" size="large" label={LABEL} isDisabled />);

    const DisabledButton = screen.getByRole("button", { name: /button label/i });
    const DisabledButtonLabel = screen.getByTestId("button-label");
    expect(DisabledButton).toHaveStyle([
      {
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
      },
      {
        height: 60,
        width: "100%",
      },
      {
        backgroundColor: Colors.Primary,
      },
      {
        backgroundColor: Colors.Disabled,
      },
    ]);

    expect(DisabledButtonLabel).toHaveStyle([
      {
        fontWeight: "normal",
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      {
        fontSize: 26,
        letterSpacing: 1.5,
      },
      {
        color: Colors.White,
      },
    ]);

    expect(DisabledButton).toBeDisabled();
  });

  test("Render the button component in the Loading state and leave the button in the disabled state while loading is in progress.", () => {
    render(<Button variant="outlined" size="small" label={LABEL} isLoading />);

    const ActivityIndicatorIcon = screen.getByTestId("button-activity-indicator");
    const ActivityIndicatorButton = screen.getByRole("button");
    expect(ActivityIndicatorButton).toHaveStyle([
      {
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
      },
      {
        height: 40,
        width: "35%",
      },
      {
        backgroundColor: "transparent",
        borderColor: "#44a9f0",
        borderWidth: 2.5,
      },
      {
        borderColor: "#b8b8b8",
      },
    ]);

    expect(ActivityIndicatorIcon).toBeDefined();
    expect(ActivityIndicatorButton).toBeDisabled();
  });
});
