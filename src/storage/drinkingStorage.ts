import { MMKV } from "react-native-mmkv";

const DrinkingStorage = new MMKV({
  id: "drinking-storage",
  encryptionKey: "makaha",
});

const STORAGE_KEY = "@drink-water";

export function setObjectToDrinkingStorage(obj: object): void {
  DrinkingStorage.set(STORAGE_KEY, JSON.stringify(obj));
}

export function getObjectFromDrinkingStorage<T>(): T | undefined {
  const STORAGED_OBJECT = DrinkingStorage.getString(STORAGE_KEY);

  if (STORAGED_OBJECT === undefined) {
    return undefined;
  }

  return JSON.parse(STORAGED_OBJECT) as T;
}

export const clearDrinkingStorage = () => {
  DrinkingStorage.clearAll();
};
