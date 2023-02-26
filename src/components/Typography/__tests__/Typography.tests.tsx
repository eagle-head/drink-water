import "react-native";
import React from "react";

import { Typography } from "../Typography";

import { render, screen } from "@/tests/test-utils";

const TITLE = "Title";
const SUBTITLE = "Subtitle";
const TEXT = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

describe("Typography", () => {
  test("should render with the title variant. ", () => {
    render(<Typography variant="title">{TITLE}</Typography>);

    const title = screen.getByRole("text", { name: /title/i });
    expect(title.props.variant).toBe("title");
  });

  test("should render with the subtitle variant. ", () => {
    render(<Typography variant="subtitle">{SUBTITLE}</Typography>);

    const subtitle = screen.getByRole("text", { name: /subtitle/i });
    expect(subtitle.props.variant).toBe("subtitle");
  });

  test("should render with the paragraph variant. ", () => {
    render(<Typography variant="paragraph">{TEXT}</Typography>);

    const paragraph = screen.getByRole("text", { name: /lorem ipsum dolor sit amet consectetur adipisicing elit./i });
    expect(paragraph.props.variant).toBe("paragraph");
  });
});
