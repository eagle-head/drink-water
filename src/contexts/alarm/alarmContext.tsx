import React from "react";
import type { PropsWithChildren } from "react";

import { addMinutes, differenceInMinutes } from "date-fns";
import { useImmerReducer } from "use-immer";

import { cancelAllWaterReminderNotifications, createWaterReminderNotifications } from "@/notifications";
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

function checkRequirementsBeforeSaving(state: AlarmState) {
  if (state.power === "OFF") {
    cancelAllWaterReminderNotifications();
    return;
  }

  createWaterReminderNotifications({
    startTime: new Date(state.startTime),
    endTime: new Date(state.endTime),
    interval: state.interval,
  });
}

function alarmReducer(draft: AlarmState, action: AlarmAction): void {
  switch (action.type) {
    case "ALARM/TOGGLED":
      draft.power = draft.power === "ON" ? "OFF" : "ON";
      checkRequirementsBeforeSaving(draft);
      break;
    case "ALARM/START":
      draft.startTime = action.payload;
      checkRequirementsBeforeSaving(draft);
      break;
    case "ALARM/END":
      draft.endTime = action.payload;
      checkRequirementsBeforeSaving(draft);
      break;
    case "ALARM/INTERVAL":
      // Calculate the difference between start and end times
      const timeDifference = differenceInMinutes(new Date(draft.endTime), new Date(draft.startTime));

      // Only update the interval if it's less than or equal to the time difference
      if (action.payload > timeDifference || action.payload < 15) {
        return;
      }

      draft.interval = action.payload;
      checkRequirementsBeforeSaving(draft);
      break;
    default:
      throw new Error("Unhandled action!");
  }

  setObjectToAlarmStorage(draft);
}

function AlarmProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(alarmReducer, initialState);

  React.useEffect(() => {
    const timeDifference = differenceInMinutes(new Date(state.endTime), new Date(state.startTime));
    const minInterval = Math.max(15, timeDifference);

    if (state.startTime >= state.endTime || timeDifference < 15) {
      const newEndTime = addMinutes(new Date(state.startTime), 15);
      dispatch({ type: "ALARM/END", payload: newEndTime });
    } else if (state.interval > timeDifference) {
      // Update the interval if it's greater than the time difference
      dispatch({ type: "ALARM/INTERVAL", payload: minInterval });
    }
  }, [state.startTime, state.endTime, state.interval, dispatch]);

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
