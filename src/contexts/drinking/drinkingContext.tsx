import React, { type PropsWithChildren } from "react";

import { isSameDay } from "date-fns";
import { useImmerReducer } from "use-immer";

import { getObjectFromDrinkingStorage, setObjectToDrinkingStorage } from "@/storage";
import { cloneObject } from "@/utils";

// This export should be used strictly for unit testing.
export const DrinkingContext = React.createContext<DrinkingContextType>(undefined);

const initialState: DrinkingState = (() => {
  const drinkingItemsList = getObjectFromDrinkingStorage<DrinkingState>();

  if (drinkingItemsList === undefined) {
    return {
      goal: 2000,
      unit: "mL",
      listItems: [],
    };
  }

  function filterOnlyTodaysItems(obj: DrinkingState): DrinkingState {
    const filteredList = obj.listItems.filter(({ createdAt }) => isSameDay(new Date(createdAt), Date.now()));
    const newDrinkingItemList = cloneObject<DrinkingState>(obj);
    newDrinkingItemList.listItems = filteredList;

    setObjectToDrinkingStorage(newDrinkingItemList);
    return newDrinkingItemList;
  }

  return filterOnlyTodaysItems(drinkingItemsList);
})();

function drinkingReducer(draft: DrinkingState, action: DrinkingAction): void {
  switch (action.type) {
    case "DRINKING/TOOGLED":
      draft.unit = draft.unit === "mL" ? "fl oz" : "mL";
      break;
    case "DRINKING/GOAL_CHANGED":
      draft.goal = action.payload;
      break;
    case "DRINKING/ADDED":
      const newDrinkingItem = { ...action.payload, createdAt: new Date() };
      draft.listItems.push(newDrinkingItem);
      break;
    case "DRINKING/DELETED":
      draft.listItems = draft.listItems.filter(item => item.createdAt !== action.payload);
      break;
    case "DRINKING/UPDATED":
      const objIndex = draft.listItems.findIndex(item => item.createdAt === action.payload.createdAt);
      draft.listItems[objIndex].volume = action.payload.volume;
      break;
    default:
      throw new Error("Unhandled action!");
  }

  setObjectToDrinkingStorage(draft);
}

function DrinkingProvider(props: PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(drinkingReducer, initialState);

  const value = { state, dispatch };
  return <DrinkingContext.Provider value={value} {...props} />;
}

function useDrinking() {
  const context = React.useContext(DrinkingContext);

  if (context === undefined) {
    throw new Error("useDrinking must be called from within a DrinkingProvider");
  }

  return context;
}

export { DrinkingProvider, useDrinking };
