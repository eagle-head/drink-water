import React from "react";

import { addMinutes, differenceInMinutes } from "date-fns";
import { useImmerReducer } from "use-immer";

import { getObjectFromAlarmStorage, setObjectToAlarmStorage } from "@/storage";

// This export should be used strictly for unit testing.
export const AlarmContext = React.createContext<AlarmContextType>(undefined);

const initialState: AlarmState = (() => {
  const alarmStoraged = getObjectFromAlarmStorage<AlarmState>();

  if (alarmStoraged === undefined) {
    return {
      startTime: new Date(),
      endTime: addMinutes(new Date(), 15),
      interval: 15,
      power: "OFF",
    };
  }

  setObjectToAlarmStorage(alarmStoraged);
  return alarmStoraged;
})();

function alarmReducer(draft: AlarmState, action: AlarmAction): void {
  switch (action.type) {
    case "ALARM/TOOGLED":
      draft.power = draft.power === "ON" ? "OFF" : "ON";
      break;
    case "ALARM/START":
      draft.startTime = action.payload;
      break;
    case "ALARM/END":
      draft.endTime = action.payload;
      break;
    case "ALARM/INTERVAL":
      draft.interval = action.payload;
      break;
    default:
      throw new Error("Unhandled action!");
  }

  setObjectToAlarmStorage(draft);
}

function AlarmProvider({ children, callback }: AlarmProviderProps) {
  const [state, dispatch] = useImmerReducer(alarmReducer, initialState);

  React.useEffect(() => {
    if (
      state.startTime >= state.endTime ||
      differenceInMinutes(new Date(state.endTime), new Date(state.startTime)) < 15
    ) {
      const newEndTime = addMinutes(new Date(state.startTime), 15);
      dispatch({ type: "ALARM/END", payload: newEndTime });
    }

    if (callback) {
      callback();
    }
  }, [state.startTime, state.endTime, dispatch, callback]);

  const value = { state, dispatch };
  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
}

function useAlarm() {
  const context = React.useContext(AlarmContext);

  if (context === undefined) {
    throw new Error("useAlarm must be called from within an AlarmProvider");
  }

  return context;
}

export { AlarmProvider, useAlarm };
