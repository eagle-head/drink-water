/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { PropsWithChildren } from "react";

import { render } from "@testing-library/react-native";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/contexts";

type Options = Parameters<typeof render>[1];

const AllTheProviders: RNElement<PropsWithChildren> = ({ children }) => {
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

const customRender = (ui: React.ReactElement, options?: Omit<Options, "wrapper">) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "react-native-gesture-handler/jest-utils";
export * from "@testing-library/react-native";
export { customRender as render };
