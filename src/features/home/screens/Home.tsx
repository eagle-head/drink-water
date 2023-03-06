import React from "react";

import CircularProgress from "react-native-circular-progress-indicator";

import { ButtonView, CircularProgressBarView, HomeContainer } from "./home.styles";

import { Button } from "@/components";
import { useTheme } from "@/contexts";

export const HomeScreen: RNElement<HomeScreenProps> = () => {
  const { theme } = useTheme();

  return (
    <HomeContainer>
      <CircularProgressBarView>
        <CircularProgress
          value={42}
          duration={1000}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeColor={theme.colors.primary}
          activeStrokeColor={theme.colors.primaryDark}
          progressValueColor={theme.colors.primary}
          radius={150}
          title={"1050/2500 mL"}
          valueSuffix={"%"}
          titleFontSize={20}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          // eslint-disable-next-line react-native/no-inline-styles
          titleStyle={{ fontWeight: "500" }}
          titleColor={theme.colors.primaryDark}
        />
      </CircularProgressBarView>
      <ButtonView>
        <Button label="Drink" size="large" variant="contained" />
      </ButtonView>
    </HomeContainer>
  );
};
