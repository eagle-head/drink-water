import React from "react";
import type { PropsWithChildren } from "react";

import { render } from "@testing-library/react-native";

import { ThemeProvider } from "@/contexts";

type Options = Parameters<typeof render>[1];

const AllTheProviders: RNElement<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<Options, "wrapper">) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
