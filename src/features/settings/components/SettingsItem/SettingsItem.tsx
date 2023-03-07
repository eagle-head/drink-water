import React from "react";

import styled from "styled-components/native";

import { Typography } from "@/components";
import { compact } from "@/utils";

export const SettingsItem: RNElement<SettingsItemProps> = ({ children, title, isPressed }) => {
  return (
    <SettingItemContainer
      android_ripple={{ color: "transparent" }}
      testOnly_pressed={isPressed}
      style={({ pressed }) => compact([pressed ? { opacity: 0.75 } : null])}
      accessibilityRole="button">
      <Typography variant="title">{title}</Typography>
      <Typography variant="subtitle">{children}</Typography>
    </SettingItemContainer>
  );
};

const SettingItemContainer = styled.Pressable`
  border-bottom-color: ${({ theme }) => theme.colors.divider};
  border-bottom-width: 1px;
  padding-top: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
`;
