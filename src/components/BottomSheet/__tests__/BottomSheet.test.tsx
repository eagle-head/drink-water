import "react-native";
import React from "react";

import { View, Text } from "react-native";

import { BottomSheet } from "../BottomSheet";

import { render, screen } from "@/tests/test-utils";

describe("BottomSheet", () => {
  test("should render correctly", () => {
    render(
      <BottomSheet>
        <View style={{ flex: 1, backgroundColor: "orange" }}>
          <Text accessibilityRole="text">Hello from BottomSheet</Text>
        </View>
      </BottomSheet>
    );

    const bottomSheet = screen.getByTestId("bottom-sheet");
    const bottomSheetLine = screen.getByTestId("bottom-sheet-line");
    const text = screen.getByRole("text", { name: /hello from bottomsheet/i });

    expect(bottomSheet).toBeDefined();
    expect(bottomSheetLine).toBeDefined();
    expect(text).toBeDefined();
  });
});
