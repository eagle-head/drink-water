import React from "react";

import styled from "styled-components/native";

import { Button, Toast } from "@/components";

export const ToastTestComponent = ({
  message,
  toastVariant,
}: {
  message: string;
  toastVariant: "error" | "success";
}) => {
  const [visible, setVisible] = React.useState(false);

  const showToast = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hideToast = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <StyledView>
      <Button size="large" variant="contained" label="Show Toast" onPress={showToast} />
      {visible ? <Toast variant={toastVariant} message={message} onHide={hideToast} /> : null}
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;
