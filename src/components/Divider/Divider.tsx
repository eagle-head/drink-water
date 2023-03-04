import React from "react";

import styled from "styled-components/native";

const View = styled.View`
  border-color: ${({ theme }) => theme.colors.divider};
  border-bottom-width: 1px;
  width: 100%;
`;

const Divider: RNElement = () => <View testID="divider" />;

const MemoizedDivider = React.memo(Divider);
export { MemoizedDivider as Divider };
