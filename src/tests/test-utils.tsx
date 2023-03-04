/* eslint-disable react-native/no-inline-styles */
import React from "react";
import type { PropsWithChildren } from "react";

import { render } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/contexts";

type Options = Parameters<typeof render>[1];

const AllTheProviders: RNElement<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<Options, "wrapper">) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
