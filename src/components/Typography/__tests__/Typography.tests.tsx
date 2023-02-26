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
    expect(title.props.style[0].color).toBe("#1a1a1a");
    expect(title.props.style[0].fontSize).toBe(24);
    expect(title.props.style[0].fontWeight).toBe("bold");
  });

  test("should render with the subtitle variant. ", () => {
    render(<Typography variant="subtitle">{SUBTITLE}</Typography>);

    const subtitle = screen.getByRole("text", { name: /subtitle/i });

    expect(subtitle.props.variant).toBe("subtitle");
    expect(subtitle.props.style[0].color).toBe("#6e6e6e");
    expect(subtitle.props.style[0].fontSize).toBe(20);
    expect(subtitle.props.style[0].fontWeight).toBe("bold");
  });

  test("should render with the paragraph variant. ", () => {
    render(<Typography variant="paragraph">{TEXT}</Typography>);

    const paragraph = screen.getByRole("text", { name: /lorem ipsum dolor sit amet consectetur adipisicing elit./i });

    expect(paragraph.props.variant).toBe("paragraph");
    expect(paragraph.props.style[0].color).toBe("#4a4a4a");
    expect(paragraph.props.style[0].fontSize).toBe(16);
    expect(paragraph.props.style[0].fontWeight).toBe("normal");
    expect(paragraph.props.style[0].textAlign).toBe("justify");
  });
});
