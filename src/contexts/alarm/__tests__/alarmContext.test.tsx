import React from "react";
import type { PropsWithChildren } from "react";

import { renderHook, act } from "@testing-library/react-hooks";
import { addMinutes } from "date-fns";

import { AlarmProvider, useAlarm } from "../alarmContext";

import { clearAlarmStorage } from "@/storage";

const wrapper = ({ children }: PropsWithChildren) => <AlarmProvider>{children}</AlarmProvider>;

describe("AlarmContext", () => {
  beforeEach(() => {
    clearAlarmStorage();
  });

  it("should initialize the context with the initial state", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const expectedInitialState = {
      startTime: expect.any(Date),
      endTime: expect.any(Date),
      interval: 60,
      isItOn: false,
    };

    expect(result.current.state).toMatchObject(expectedInitialState);
  });

  it("should toggle isItOn when dispatching ALARM/TOOGLED", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    act(() => {
      result.current.dispatch({ type: "ALARM/TOOGLED" });
    });

    expect(result.current.state.isItOn).toBe(true);

    act(() => {
      result.current.dispatch({ type: "ALARM/TOOGLED" });
    });

    expect(result.current.state.isItOn).toBe(false);
  });

  it("should update startTime when dispatching ALARM/START", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const newStartTime = new Date("2023-03-18T09:00:00.000Z");

    act(() => {
      result.current.dispatch({ type: "ALARM/START", payload: newStartTime });
    });

    expect(result.current.state.startTime).toEqual(newStartTime);
  });

  it("should update endTime when dispatching ALARM/END", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const newEndTime = new Date("2023-03-18T18:00:00.000Z");

    act(() => {
      result.current.dispatch({ type: "ALARM/END", payload: newEndTime });
    });

    expect(result.current.state.endTime).toEqual(newEndTime);
  });

  it("should update interval when dispatching ALARM/INTERVAL", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const newInterval = 30;

    act(() => {
      result.current.dispatch({ type: "ALARM/INTERVAL", payload: newInterval });
    });

    expect(result.current.state.interval).toBe(newInterval);
  });

  it("should update endTime if startTime is greater than or equal to endTime", () => {
    const { result } = renderHook(() => useAlarm(), { wrapper });

    const startTime = new Date("2023-03-18T18:00:00.000Z");
    const endTime = new Date("2023-03-18T09:00:00.000Z");

    act(() => {
      result.current.dispatch({ type: "ALARM/START", payload: startTime });
      result.current.dispatch({ type: "ALARM/END", payload: endTime });
    });

    expect(result.current.state.startTime).toEqual(startTime);
    expect(result.current.state.endTime).toEqual(addMinutes(startTime, 15));
  });
});