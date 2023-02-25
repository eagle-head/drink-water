import React from "react";
import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@/contexts";

export const AllProviders: RNElement<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
