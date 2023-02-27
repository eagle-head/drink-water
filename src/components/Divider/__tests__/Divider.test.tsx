import "react-native";
import React from "react";

import { Divider } from "../Divider";

import { render, screen } from "@/tests/test-utils";

describe("Divider", () => {
  test("should render correctly", () => {
    render(<Divider />);

    const divider = screen.getByTestId("divider");
    expect(divider).toBeDefined();
  });
});
