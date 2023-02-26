import React from "react";

import { View } from "react-native";
import styled from "styled-components/native";

import { Typography } from "@/components";
import { AllProviders } from "@/providers";

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
        <Typography variant="title">Example of title</Typography>
        <View style={{ height: 10, width: 2 }} />
        <Typography variant="subtitle">Example of subtitle</Typography>
        <View style={{ height: 10, width: 2 }} />
        <Typography variant="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At id accusantium temporibus porro cupiditate error
          tenetur distinctio sequi nesciunt blanditiis amet in nihil praesentium unde, quaerat dolorem rem accusamus
          aliquam!
        </Typography>
      </StyledView>
    </AllProviders>
  );
};

export default App;
