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
          radius={150}
          duration={1000}
          valueSuffix={"%"}
          titleFontSize={20}
          title={"1050/2500 mL"}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeColor={theme.colors.primary}
          activeStrokeColor={theme.colors.primaryDark}
          progressValueColor={theme.colors.primary}
          titleColor={theme.colors.primary}
        />
      </CircularProgressBarView>
      <ButtonView>
        <Button label="Drink" size="large" variant="contained" />
      </ButtonView>
    </HomeContainer>
  );
};
