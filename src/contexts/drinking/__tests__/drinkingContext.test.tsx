import React from "react";

import { renderHook, act } from "@testing-library/react-hooks";

import { DrinkingProvider, useDrinking } from "../drinkingContext";

import { clearDrinkingStorage } from "@/storage";

// Helper function to wrap the hook with the provider
const wrapper = ({ children }: React.PropsWithChildren) => <DrinkingProvider>{children}</DrinkingProvider>;

describe("DrinkingContext", () => {
  beforeEach(() => {
    // Clear the storage before each test
    clearDrinkingStorage();
  });

  it("should initialize the context with the initial state", () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    const expectedInitialState: DrinkingState = {
      goal: 2000,
      unit: "mL",
      listItems: [],
    };

    expect(result.current.state).toEqual(expectedInitialState);
  });

  it("should toggle the unit when dispatching DRINKING/TOGGLED", () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    act(() => {
      result.current.dispatch({ type: "DRINKING/TOGGLED" });
    });

    expect(result.current.state.unit).toBe("fl oz");

    act(() => {
      result.current.dispatch({ type: "DRINKING/TOGGLED" });
    });

    expect(result.current.state.unit).toBe("mL");
  });

  it("should update the goal when dispatching DRINKING/GOAL_CHANGED", () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    const newGoal = 2500;

    act(() => {
      result.current.dispatch({ type: "DRINKING/GOAL_CHANGED", payload: newGoal });
    });

    expect(result.current.state.goal).toBe(newGoal);
  });

  it("should add a new drinking item when dispatching DRINKING/ADDED", () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    const initialListLength = result.current.state.listItems.length;

    const newDrinkItem = {
      volume: 500,
      unit: result.current.state.unit,
    };

    act(() => {
      result.current.dispatch({ type: "DRINKING/ADDED", payload: newDrinkItem });
    });

    const finalListLength = result.current.state.listItems.length;

    expect(finalListLength).toBe(initialListLength + 1);
    expect(result.current.state.listItems[finalListLength - 1]).toMatchObject(newDrinkItem);
  });

  it("should delete a drinking item when dispatching DRINKING/DELETED", async () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    // Add an initial item to the list
    const initialDrinkItem = {
      volume: 300,
      unit: result.current.state.unit,
    };

    act(() => {
      result.current.dispatch({ type: "DRINKING/ADDED", payload: initialDrinkItem });
    });

    const initialListLength = result.current.state.listItems.length;
    const updatedCreatedAt = result.current.state.listItems[0].createdAt;

    // Dispatch the DRINKING/DELETED action for the added item
    act(() => {
      result.current.dispatch({ type: "DRINKING/DELETED", payload: updatedCreatedAt });
    });

    const finalListLength = result.current.state.listItems.length;

    expect(finalListLength).toBe(initialListLength - 1);
    expect(result.current.state.listItems.find(item => item.createdAt === updatedCreatedAt)).toBeUndefined();
  });

  it("should update a drinking item when dispatching DRINKING/UPDATED", () => {
    const { result } = renderHook(() => useDrinking(), { wrapper });

    // Add an initial item to the list
    const initialDrinkItem = {
      volume: 300,
      unit: result.current.state.unit,
    };

    act(() => {
      result.current.dispatch({ type: "DRINKING/ADDED", payload: initialDrinkItem });
    });

    // Update the volume of the initial item and dispatch the DRINKING/UPDATED action
    const updatedCreatedAt = result.current.state.listItems[0].createdAt;
    const updatedDrinkItem = { ...initialDrinkItem, volume: 500, createdAt: updatedCreatedAt };

    act(() => {
      result.current.dispatch({ type: "DRINKING/UPDATED", payload: updatedDrinkItem });
    });

    const updatedItem = result.current.state.listItems.find(item => item.createdAt === updatedCreatedAt);

    expect(updatedItem?.volume).toBe(updatedDrinkItem.volume);
  });
});
