import React from "react";

import styled from "styled-components/native";

import { Button, Toast } from "./components";

import { AllProviders } from "@/providers";

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

const App: RNElement = () => {
  const [visible, setVisible] = React.useState(false);

  const showToast = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hideToast = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <AllProviders>
      <StyledView>
        <Button size="large" variant="contained" label="Show Toast" onPress={showToast} />
        {visible ? <Toast variant="error" message="This is required." onHide={hideToast} /> : null}
      </StyledView>
    </AllProviders>
  );
};

export default App;
