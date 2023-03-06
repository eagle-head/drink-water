import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export {};

declare global {
  type HomeScreenProps = BottomTabScreenProps<RootBottomTabsParamList, "Home">;
}
