import React from "react";

import CircularProgress from "react-native-circular-progress-indicator";

import { ButtonView, CircularProgressBarView, HomeContainer } from "./home.styles";

import { Button, ModalInput } from "@/components";
import { useDrinking, useTheme } from "@/contexts";

export const HomeScreen: RNElement<HomeScreenProps> = () => {
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
  const { theme } = useTheme();
  const {
    state: { goal, listItems, unit },
  } = useDrinking();

  const handleTotalVolume = listItems.reduce((acc, item) => acc + item.volume, 0);
  const totalVolumePercentage = (handleTotalVolume / goal) * 100;

  return (
    <HomeContainer>
      <CircularProgressBarView>
        <CircularProgress
          radius={150}
          duration={1000}
          valueSuffix={"%"}
          titleFontSize={20}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          inActiveStrokeOpacity={0.2}
          titleColor={theme.colors.subtitle}
          progressValueColor={theme.colors.title}
          inActiveStrokeColor={theme.colors.primary}
          activeStrokeColor={theme.colors.primaryDark}
          title={`${handleTotalVolume}/${goal} ${unit}`}
          valuePrefix={totalVolumePercentage > 100 ? "+" : ""}
          value={totalVolumePercentage > 100 ? 100 : totalVolumePercentage}
        />
      </CircularProgressBarView>
      <ButtonView>
        <Button label="drink" size="large" variant="contained" onPress={() => setIsModalOpened(true)} />
      </ButtonView>
      <ModalInput
        max={500}
        min={50}
        typeDispatch="home"
        animationType="fade"
        title="Insert Volume"
        visible={isModalOpened}
        onVisible={setIsModalOpened}
        paragraphy="How much did you drink?"
      />
    </HomeContainer>
  );
};
