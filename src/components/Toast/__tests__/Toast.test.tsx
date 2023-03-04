import "react-native";
import React from "react";

import { ToastTestComponent } from "../ToastTestComponent";

import { fireEvent, render, screen, waitFor } from "@/tests/test-utils";

describe("Toast", () => {
  test("should render correctly error message and after 5 seconds should disappear", async () => {
    render(<ToastTestComponent toastVariant="error" message="This is required." />);

    const button = screen.getByRole("button", { name: /show toast/i });
    fireEvent.press(button);

    const toastMessage = await screen.findByRole("text", { name: /this is required./i });
    expect(toastMessage).toBeDefined();

    const toastIcon = await screen.findByTestId("toast-error-icon");
    expect(toastIcon).toBeDefined();

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.queryByRole("text", { name: /this is required./i })).toBeNull();
      expect(screen.queryByTestId("toast-error-icon")).toBeNull();
    });
  });

  test("should render correctly success message and after 5 seconds should disappear", async () => {
    render(<ToastTestComponent toastVariant="success" message="Request completed successfully!" />);

    const button = screen.getByRole("button", { name: /show toast/i });
    fireEvent.press(button);

    const toastMessage = await screen.findByRole("text", { name: /request completed successfully!/i });
    expect(toastMessage).toBeDefined();

    const toastIcon = await screen.findByTestId("toast-success-icon");
    expect(toastIcon).toBeDefined();

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.queryByRole("text", { name: /request completed successfully!/i })).toBeNull();
      expect(screen.queryByTestId("toast-success-icon")).toBeNull();
    });
  });
});
