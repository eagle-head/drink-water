import React from "react";

import styled from "styled-components/native";

const Text = styled.Text`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
`;

export const Typography = () => {
  return <Text>Typography</Text>;
};
