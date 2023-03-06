/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AlarmProvider, DrinkingProvider, PortalProvider, ThemeProvider } from "@/contexts";
import { Router } from "@/routes";

export const AllProviders: RNElement = () => {
  const theme = useColorScheme();

  return (
    <>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PortalProvider>
            <DrinkingProvider>
              <AlarmProvider>
                <NavigationContainer>
                  <Router />
                </NavigationContainer>
              </AlarmProvider>
            </DrinkingProvider>
          </PortalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
};
