import React from "react";

import styled from "styled-components/native";

const View = styled.View`
  border-color: ${({ theme }) => theme.colors.divider};
  border-bottom-width: 1px;
  width: 100%;
`;

export const Divider: RNElement = React.memo(() => {
  return <View testID="divider" />;
});
