import React from "react";

import { StyleSheet } from "react-native";
import type { PressableProps } from "react-native";
import styled from "styled-components/native";

import { compact } from "@/utils";

type IconButtonProps = Prettify<
  {
    isPressed?: boolean | undefined | null;
  } & Omit<PressableProps, "style">
>;

export const IconButton = React.memo(({ isPressed, ...rest }: IconButtonProps) => {
  return (
    <Pressable
      {...rest}
      testOnly_pressed={isPressed}
      style={({ pressed }) => compact([pressed ? styles.pressed : null])}
      accessibilityRole="button"
    />
  );
});

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});

const Pressable = styled.Pressable`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 6px;
  padding-left: 6px;
  border-radius: 6px;
`;
