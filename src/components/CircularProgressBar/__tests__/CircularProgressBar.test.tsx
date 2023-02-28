import React from "react";

import { CircularProgressBar } from "../CircularProgressBar";

import { render, screen } from "@/tests/test-utils";

describe("CircularProgressBar", () => {
  test("should renders the progress circle with the correct percentage", () => {
    render(<CircularProgressBar progress={0.5} size={200} strokeWidth={10} />);

    const text = screen.getByRole("search");
    expect(text.props.value).toBe("50%");
  });

  test("when it receives the value of 'progress' greater than 1 the text should show '100%'", () => {
    render(<CircularProgressBar progress={1.01} size={200} strokeWidth={10} />);

    const text = screen.getByRole("search");
    expect(text.props.value).toBe("100%");
  });

  test("when you receive the value of 'progress' less than 0 the text should show '0%'", () => {
    render(<CircularProgressBar progress={-0.01} size={200} strokeWidth={10} />);

    const text = screen.getByRole("search");
    expect(text.props.value).toBe("0%");
  });
});
