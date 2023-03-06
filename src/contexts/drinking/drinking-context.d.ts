import { VolumeUnit } from "@/enum";

export {};

declare global {
  type DrinkingAction =
    | { type: "TOOGLED" }
    | { type: "DELETED"; payload: Date }
    | { type: "GOAL_CHANGED"; payload: number }
    | { type: "UPDATED"; payload: DrinkingItem }
    | { type: "ADDED"; payload: Omit<DrinkingItem, "createdAt"> };

  type DrinkingState = {
    unit: VolumeUnit;
    goal: number;
    listItems: DrinkingItem[];
  };

  type DrinkingItem = {
    unit: VolumeUnit;
    volume: number;
    createdAt: Date;
  };

  type DrinkingContextType =
    | {
        state: DrinkingState;
        dispatch: (action: DrinkingAction) => void;
      }
    | undefined;
}
