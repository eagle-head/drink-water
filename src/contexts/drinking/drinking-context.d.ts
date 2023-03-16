import { VolumeUnit } from "@/enum";

export {};

declare global {
  type DrinkingAction =
    | { type: "DRINKING/TOOGLED" }
    | { type: "DRINKING/DELETED"; payload: Date }
    | { type: "DRINKING/GOAL_CHANGED"; payload: number }
    | { type: "DRINKING/UPDATED"; payload: DrinkingItem }
    | { type: "DRINKING/ADDED"; payload: Omit<DrinkingItem, "createdAt"> };

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
