import "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome5";

import { IconButton } from "../IconButton";

import { render, screen } from "@/tests/test-utils";

describe("IconButton", () => {
  test("should render correctly", () => {
    render(
      <IconButton>
        <Icon name="glass-whiskey" size={60} color="#44a9f0" />
      </IconButton>
    );

    const iconButton = screen.getByRole("button");
    expect(iconButton).toBeDefined();
  });
});
