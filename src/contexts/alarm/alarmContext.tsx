import React, { type PropsWithChildren } from "react";

import { addMinutes, differenceInMinutes } from "date-fns";
import { useImmerReducer } from "use-immer";

import { getObjectFromAlarmStorage, setObjectToAlarmStorage } from "@/storage";

const AlarmContext = React.createContext<AlarmContextType>(undefined);

const initialState: AlarmState = (() => {
  const alarmStoraged = getObjectFromAlarmStorage<AlarmState>();

  if (alarmStoraged === undefined) {
    return {
      startTime: new Date(),
      endTime: addMinutes(new Date(), 15),
      interval: 60,
      isItOn: false,
    };
  }

  setObjectToAlarmStorage(alarmStoraged);
  return alarmStoraged;
})();

function alarmReducer(draft: AlarmState, action: AlarmAction): void {
  switch (action.type) {
    case "TOOGLED":
      draft.isItOn = !draft.isItOn;
      break;
    case "TIME/START":
      draft.startTime = action.payload;
      break;
    case "TIME/END":
      draft.endTime = action.payload;
      break;
    case "TIME/INTERVAL":
      draft.interval = action.payload;
      break;
    default:
      throw new Error("Unhandled action!");
  }

  setObjectToAlarmStorage(draft);
}

function AlarmProvider(props: PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(alarmReducer, initialState);

  React.useEffect(() => {
    if (
      state.startTime >= state.endTime ||
      differenceInMinutes(new Date(state.endTime), new Date(state.startTime)) < 15
    ) {
      const newEndTime = addMinutes(new Date(state.startTime), 15);
      dispatch({ type: "TIME/END", payload: newEndTime });
    }
  }, [state.startTime, state.endTime, dispatch]);

  const value = { state, dispatch };
  return <AlarmContext.Provider value={value} {...props} />;
}

function useAlarm() {
  const context = React.useContext(AlarmContext);

  if (context === undefined) {
    throw new Error("useAlarm must be called from within an AlarmProvider");
  }

  return context;
}

export { AlarmProvider, useAlarm };
