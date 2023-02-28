import React from "react";

import styled from "styled-components/native";

import { CircularProgressBar } from "@/components";
import { AllProviders } from "@/providers";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

const App: RNElement = () => {
  return (
    <AllProviders>
      <View>
        <CircularProgressBar progress={0.25} size={250} strokeWidth={20} />
      </View>
    </AllProviders>
  );
};

export default App;
