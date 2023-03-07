import type { PropsWithChildren } from "react";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { TouchableOpacityProps, ViewProps } from "react-native";

export {};

type SettingsBottomTabProps = BottomTabScreenProps<RootBottomTabsParamList, "Settings">;

declare global {
  type SettingsScreenProps = Prettify<SettingsBottomTabProps & ViewProps>;
  type SettingsItemProps = Prettify<
    TouchableOpacityProps & PropsWithChildren<{ title: string; isPressed?: boolean | undefined | null }>
  >;
}
