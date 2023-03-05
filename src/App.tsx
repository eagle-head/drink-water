import React from "react";

import { Dimensions, SafeAreaView, View } from "react-native";
import styled from "styled-components/native";

import { BottomSheet, BottomSheetRefProps, Button } from "./components";

import { AllProviders } from "@/providers";

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]}; */
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const App: RNElement = () => {
  const bottomSheetRef = React.useRef<BottomSheetRefProps>(null);

  const onPress = React.useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();

    bottomSheetRef?.current?.scrollTo(isActive ? 0 : -SCREEN_HEIGHT / 3);
  }, [bottomSheetRef]);

  return (
    <AllProviders>
      <SafeAreaView style={{ flex: 1 }}>
        <StyledView>
          <Button label="BottomSheet" size="medium" variant="contained" onPress={onPress} />
          <BottomSheet ref={bottomSheetRef}>
            <View style={{ flex: 1, backgroundColor: "orange" }} />
          </BottomSheet>
        </StyledView>
      </SafeAreaView>
    </AllProviders>
  );
};

export default App;
