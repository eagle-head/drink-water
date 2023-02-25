import "react-native";
import React from "react";

import { Button } from "../Button";

import { render, screen } from "@/tests/test-utils";

const LABEL = "Button Label";

describe("Button", () => {
  test("with a label text passed as a prop.", () => {
    render(<Button variant="contained" size="small" label={LABEL} isPressed />);

    const ButtonComponent = screen.getByRole("button", { name: /button label/i });
    expect(ButtonComponent).toBeDefined();
  });

  test("with small size and contained style with opacity.", () => {
    render(<Button variant="contained" size="small" label={LABEL} isPressed />);

    const SmallButton = screen.getByRole("button", { name: /button label/i });
    expect(SmallButton.props.variant).toBe("contained");
    expect(SmallButton.props.size).toBe("small");
    expect(SmallButton.props.style[1].opacity).toBe(0.75);
  });

  test("with medium size and outlined style.", () => {
    render(<Button variant="outlined" size="medium" label={LABEL} />);

    const MediumButton = screen.getByRole("button", { name: /button label/i });
    expect(MediumButton.props.variant).toBe("outlined");
    expect(MediumButton.props.size).toBe("medium");
  });

  test("with large size.", () => {
    render(<Button variant="contained" size="large" label={LABEL} />);

    const LargeButton = screen.getByRole("button", { name: /button label/i });
    expect(LargeButton.props.variant).toBe("contained");
    expect(LargeButton.props.size).toBe("large");
  });

  test("in the Disabled state.", () => {
    render(<Button variant="contained" size="large" label={LABEL} isDisabled />);

    const DisabledButton = screen.getByRole("button", { name: /button label/i });
    expect(DisabledButton).toBeDisabled();
  });

  test("in the Loading state and leave the button in the disabled state while loading is in progress.", () => {
    render(<Button variant="outlined" size="small" label={LABEL} isLoading />);

    const ActivityIndicatorIcon = screen.getByTestId("button-activity-indicator");
    const ActivityIndicatorButton = screen.getByRole("button");

    expect(ActivityIndicatorIcon).toBeDefined();
    expect(ActivityIndicatorButton).toBeDisabled();
  });
});
