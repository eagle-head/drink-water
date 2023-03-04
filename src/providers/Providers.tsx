/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { PropsWithChildren } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/contexts";

export const AllProviders: RNElement<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};
