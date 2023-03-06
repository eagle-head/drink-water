import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";

import { ROUTES } from "@/enum";
import { HistoryScreen, HomeScreen, SettingsScreen } from "@/features";

const { Navigator, Screen } = createBottomTabNavigator<RootBottomTabsParamList>();

export const Router: RNElement = () => {
  const handleTabBarIcon: TabBarIcon = React.useCallback(({ color, iconName, size }) => {
    return <Fontisto name={iconName} size={size} color={color} />;
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0884db" },
        headerTintColor: "#ffffff",
        tabBarActiveTintColor: "#0884db",
        tabBarInactiveTintColor: "#6bbbf4",
        tabBarShowLabel: false,
      }}>
      <Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => handleTabBarIcon({ color, iconName: "home", size }),
          title: "Drink Water",
        }}
      />
      <Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => handleTabBarIcon({ color, iconName: "history", size }),
        }}
      />
      <Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => handleTabBarIcon({ color, iconName: "player-settings", size }),
        }}
      />
    </Navigator>
  );
};
