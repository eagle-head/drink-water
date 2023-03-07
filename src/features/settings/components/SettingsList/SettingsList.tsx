import React from "react";
import type { PropsWithChildren } from "react";

import styled from "styled-components/native";

export const SettingsList: RNElement<PropsWithChildren> = ({ children }) => {
  return <SettingListContainer alwaysBounceVertical={false}>{children}</SettingListContainer>;
};

const SettingListContainer = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;
