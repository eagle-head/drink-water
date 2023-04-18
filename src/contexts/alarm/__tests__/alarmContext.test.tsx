import React from "react";
import type { PropsWithChildren } from "react";

import { renderHook, act } from "@testing-library/react-hooks";
import { addMinutes } from "date-fns";

import { AlarmProvider, useAlarm } from "../alarmContext";

import { clearAlarmStorage } from "@/storage";
import { waitFor } from "@/tests/test-utils";

const wrapper = ({ children }: PropsWithChildren) => <AlarmProvider>{children}</AlarmProvider>;

describe("AlarmContext", () => {
  beforeEach(() => {
    clearAlarmStorage();
  });

  it("should initialize the context with the initial state", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const expectedInitialState: AlarmState = {
      startTime: expect.any(Date),
      endTime: expect.any(Date),
      interval: 15,
      power: "OFF",
    };

    expect(result.current.state).toMatchObject(expectedInitialState);
  });

  it("should toggle power when dispatching ALARM/TOGGLED", async () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    await act(async () => {
      result.current.dispatch({ type: "ALARM/TOGGLED" });
    });

    expect(result.current.state.power).toBe("ON");

    await act(async () => {
      result.current.dispatch({ type: "ALARM/TOGGLED" });
    });

    expect(result.current.state.power).toBe("OFF");
  });

  it("should update startTime when dispatching ALARM/START", async () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const newStartTime = new Date();

    await act(async () => {
      result.current.dispatch({ type: "ALARM/START", payload: newStartTime });
    });

    expect(result.current.state.startTime).toEqual(newStartTime);
  });

  it("should update endTime when dispatching ALARM/END", async () => {
    // This mock date must always be in the future of the current day it is being tested.
    const newEndTime = new Date("2024-03-18T18:00:00.000Z");

    const { result } = renderHook(() => useAlarm(), { wrapper });

    await act(async () => {
      result.current.dispatch({ type: "ALARM/END", payload: newEndTime });
    });

    await waitFor(() => expect(result.current.state.endTime).toEqual(newEndTime));
  });

  it("should update interval when dispatching ALARM/INTERVAL", async () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const newInterval = 15;

    await act(async () => {
      result.current.dispatch({ type: "ALARM/INTERVAL", payload: newInterval });
    });

    expect(result.current.state.interval).toBe(newInterval);
  });

  it("should update endTime if startTime is greater than or equal to endTime", async () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const startTime = new Date("2023-03-18T18:00:00.000Z");
    const endTime = new Date("2023-03-18T09:00:00.000Z");

    await act(async () => {
      result.current.dispatch({ type: "ALARM/START", payload: startTime });
      result.current.dispatch({ type: "ALARM/END", payload: endTime });
    });

    expect(result.current.state.startTime).toEqual(startTime);
    expect(result.current.state.endTime).toEqual(addMinutes(startTime, 15));
  });
});
