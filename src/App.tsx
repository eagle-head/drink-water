import React from "react";

import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";

import { IconButton } from "@/components";
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
        <IconButton>
          <Icon name="glass-whiskey" size={60} color="#44a9f0" />
        </IconButton>
      </View>
    </AllProviders>
  );
};

export default App;
