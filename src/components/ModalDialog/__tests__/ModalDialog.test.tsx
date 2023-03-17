import React from "react";

import { ModalDialog } from "../ModalDialog";

import { DrinkingContext } from "@/contexts"; // Import DrinkingContext
import { render, fireEvent, screen } from "@/tests/test-utils"; // Import custom render from your test-utils

describe("ModalDialog", () => {
  const onVisibleMock = jest.fn();
  const createdAt = new Date("2023-03-17T13:39:06.605Z");
  const dispatchMock = jest.fn();

  // Define a mock state with the required properties
  const mockState: DrinkingState = {
    goal: 2000,
    unit: "mL",
    listItems: [],
  };

  beforeEach(() => {
    render(
      <DrinkingContext.Provider value={{ state: mockState, dispatch: dispatchMock }}>
        <ModalDialog
          title="Test Title"
          paragraphy="Test Paragraph"
          animationType="fade"
          createdAt={createdAt}
          visible
          onVisible={onVisibleMock}
        />
      </DrinkingContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title and paragraphy correctly", () => {
    const title = screen.getByRole("text", { name: /test title/i });
    const paragraph = screen.getByRole("text", { name: /test paragraph/i });
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(title).toBeDefined();
    expect(paragraph).toBeDefined();
    expect(confirmButton).toBeDefined();
    expect(cancelButton).toBeDefined();
  });

  it("calls onVisible when the Cancel button is pressed", () => {
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.press(cancelButton);

    expect(onVisibleMock).toHaveBeenCalledTimes(1);
    expect(onVisibleMock).toHaveBeenCalledWith(false);
  });

  it("calls dispatch with the correct action and payload when the Confirm button is pressed", () => {
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    fireEvent.press(confirmButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "DRINKING/DELETED",
      payload: createdAt,
    });
  });
});
