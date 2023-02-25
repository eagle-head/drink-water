import React from "react";

import { View } from "react-native";
import styled from "styled-components/native";

import { Button } from "./components";
import { AllProviders } from "./providers";

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

const App: RNElement = () => {
  return (
    <AllProviders>
      <StyledView>
        <Button size="small" variant="contained" label="Press" />
        <View style={{ height: 10, width: 2 }} />
        <Button size="medium" variant="contained" label="Press" />
        <View style={{ height: 10, width: 2 }} />
        <Button size="large" variant="contained" label="Press" />
      </StyledView>
    </AllProviders>
  );
};

export default App;
