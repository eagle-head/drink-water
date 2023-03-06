import { MMKV } from "react-native-mmkv";

const AlarmStorage = new MMKV({
  id: "alarm-storage",
  encryptionKey: "makaha",
});

const STORAGE_KEY = "@drink-water";

export function setObjectToAlarmStorage(obj: object): void {
  AlarmStorage.set(STORAGE_KEY, JSON.stringify(obj));
}

export function getObjectFromAlarmStorage<T>(): T | undefined {
  const STORAGED_OBJECT = AlarmStorage.getString(STORAGE_KEY);

  if (STORAGED_OBJECT === undefined) {
    return undefined;
  }

  return JSON.parse(STORAGED_OBJECT) as T;
}
