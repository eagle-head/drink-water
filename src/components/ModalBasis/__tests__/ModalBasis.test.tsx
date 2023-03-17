import React from "react";

import { View, Text, Dimensions } from "react-native";

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

  it("applies platform-specific styles", () => {
    render(
      <ModalBasis visible>
        <View />
      </ModalBasis>
    );

    const childElement = screen.getByTestId("modal-view-container");
    const appliedStyles = childElement.props.style[1].top;

    expect(appliedStyles).toBe(Dimensions.get("window").height / 3.5);
  });
});
