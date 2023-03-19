import React from "react";

import { ModalInput } from "../ModalInput";

import { DrinkingContext, AlarmContext } from "@/contexts";
import { render, fireEvent, screen, waitFor } from "@/tests/test-utils";

type TypeDispatch = "home" | "history" | "settings" | "interval";

describe("ModalInput", () => {
  const onVisibleMock = jest.fn();
  const drinkingDispatchMock = jest.fn();
  const alarmDispatchMock = jest.fn();

  const mockDrinkingState: DrinkingState = {
    goal: 2000,
    unit: "mL",
    listItems: [],
  };

  const mockAlarmState: AlarmState = {
    startTime: new Date("2023-03-17T08:00:00.000Z"),
    endTime: new Date("2023-03-17T22:00:00.000Z"),
    interval: 60,
    power: "ON",
  };

  function renderModalInput(typeDispatch: TypeDispatch, testDrinkingItem?: DrinkingItem) {
    return render(
      <DrinkingContext.Provider value={{ state: mockDrinkingState, dispatch: drinkingDispatchMock }}>
        <AlarmContext.Provider value={{ state: mockAlarmState, dispatch: alarmDispatchMock }}>
          <ModalInput
            typeDispatch={typeDispatch}
            max={2500}
            min={100}
            title="Test Title"
            paragraphy="Test Paragraph"
            onVisible={onVisibleMock}
            drinkingItem={testDrinkingItem}
            visible
          />
        </AlarmContext.Provider>
      </DrinkingContext.Provider>
    );
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches DRINKING/ADDED when typeDispatch is 'home'", async () => {
    renderModalInput("home");
    const input = screen.getByRole("search");
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    fireEvent.changeText(input, "500");
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(drinkingDispatchMock).toHaveBeenCalledWith({
        type: "DRINKING/ADDED",
        payload: { volume: 500, unit: "mL" },
      });
    });
  });

  it("dispatches DRINKING/GOAL_CHANGED when typeDispatch is 'settings'", async () => {
    renderModalInput("settings");
    const input = screen.getByRole("search");
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    fireEvent.changeText(input, "2500");
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(drinkingDispatchMock).toHaveBeenCalledWith({
        type: "DRINKING/GOAL_CHANGED",
        payload: 2500,
      });
    });
  });

  it("dispatches DRINKING/UPDATED when typeDispatch is 'history' and drinkingItem is provided", async () => {
    const testDrinkingItem: DrinkingItem = {
      volume: 300,
      unit: "mL",
      createdAt: new Date("2023-03-17T10:00:00.000Z"),
    };

    renderModalInput("history", testDrinkingItem);
    const input = screen.getByRole("search");
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    fireEvent.changeText(input, "400");
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(drinkingDispatchMock).toHaveBeenCalledWith({
        type: "DRINKING/UPDATED",
        payload: { ...testDrinkingItem, volume: 400 },
      });
    });
  });

  it("dispatches ALARM/INTERVAL when typeDispatch is 'interval'", async () => {
    renderModalInput("interval");
    const input = screen.getByRole("search");
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    fireEvent.changeText(input, "120");
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(alarmDispatchMock).toHaveBeenCalledWith({
        type: "ALARM/INTERVAL",
        payload: 120,
      });
    });
  });
});
