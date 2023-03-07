import { ListRenderItemInfo } from "react-native";

/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  type RNElement<T = unknown> = (props: T) => JSX.Element;
  type FlatListRenderItem<T> = ({ item }: ListRenderItemInfo<T>) => JSX.Element;
  type ObjectValues<T> = T[keyof T];
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}
