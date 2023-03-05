/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { PropsWithChildren } from "react";

import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/contexts";

export const AllProviders: RNElement<PropsWithChildren> = ({ children }) => {
  const theme = useColorScheme();

  return (
    <>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>{children}</ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
};
