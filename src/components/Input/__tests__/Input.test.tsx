import "react-native";
import React from "react";

import { Keyboard } from "react-native";

import { InputTestComponent } from "../InputTestComponent";

import { fireEvent, render, screen, waitFor } from "@/tests/test-utils";

describe("Input", () => {
  test("should render correctly;", () => {
    render(<InputTestComponent />);

    const input = screen.getByRole("search");
    expect(input).toBeDefined();
  });

  test("should show an error text component when simulating an input below 50 and above 500;", async () => {
    render(<InputTestComponent />);
    const input = screen.getByRole("search");

    // simulating an input below 50
    fireEvent.changeText(input, "49");

    const button = screen.getByRole("button", { name: /confirm/i });
    fireEvent.press(button);

    const errorMinimumText = await screen.findByRole("text", { name: /minimum volume allowed is 50./i });
    expect(errorMinimumText).toBeDefined();

    // simulating an input above 500
    fireEvent.changeText(input, "501");
    fireEvent.press(button);

    const errorMaximumText = await screen.findByRole("text", { name: /maximum volume allowed is 500./i });
    expect(errorMaximumText).toBeDefined();
  });

  test("should only accept numbers;", async () => {
    render(<InputTestComponent />);

    const input = screen.getByRole("search");
    fireEvent.changeText(input, "ab123c");

    const button = screen.getByRole("button", { name: /confirm/i });
    fireEvent.press(button);

    const errorText = await screen.findByRole("text", { name: /only number are allowed./i });
    expect(errorText).toBeDefined();
  });

  test("should show an error message when losing focus and not entering a valid number;", async () => {
    render(<InputTestComponent />);

    const button = screen.getByRole("button", { name: /confirm/i });
    fireEvent.press(button);

    const errorText = await screen.findByRole("text", { name: /this is required./i });
    expect(errorText).toBeDefined();
  });

  test("should clear the errors, reset the input and retract the keyboard when pressing cancel.", async () => {
    // Mock the Keyboard.dismiss() method
    jest.spyOn(Keyboard, "dismiss");
    render(<InputTestComponent />);

    const button = screen.getByRole("button", { name: /cancel/i });
    fireEvent.press(button);
    await waitFor(() => expect(Keyboard.dismiss).toHaveBeenCalled());
  });
});
