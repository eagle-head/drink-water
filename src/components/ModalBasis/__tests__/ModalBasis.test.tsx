import React from "react";

import { Text } from "react-native";

import { ModalBasis } from "../ModalBasis";

import { render, screen } from "@/tests/test-utils";

describe("ModalBasis", () => {
  it("renders correctly with the provided children and visible prop", () => {
    render(
      <ModalBasis visible>
        <Text accessibilityRole="text">Test Content</Text>
      </ModalBasis>
    );

    const text = screen.getByRole("text", { name: /test content/i });

    expect(text).toBeTruthy();
  });
});
