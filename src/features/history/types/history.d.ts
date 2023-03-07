import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { ScrollViewProps } from "react-native";

export {};

type HistoryScreenBottomTabProps = BottomTabScreenProps<RootBottomTabsParamList, "History">;

declare global {
  type HistoryScreenProps = Prettify<ScrollViewProps & HistoryScreenBottomTabProps>;
}
