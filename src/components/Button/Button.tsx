import React from "react";

import { ActivityIndicator } from "react-native";

import { Pressable, Label } from "./button.styles";

import { useTheme } from "@/contexts";
import { compact } from "@/utils";

const Button: RNElement<StyledButton> = ({ size, label, variant, isDisabled, isLoading, isPressed, ...rest }) => {
  const { theme } = useTheme();

  const activityIndicatorColor = (() => {
    if (variant === "outlined") {
      return isDisabled || isLoading ? theme.colors.disabled : theme.colors.primary;
    }

    return theme.colors.secondary;
  })();

  return (
    <Pressable
      {...rest}
      android_ripple={{ color: isDisabled || isLoading ? "transparent" : theme.colors.primaryDark }}
      style={({ pressed }) => compact([pressed ? { opacity: 0.75 } : null])}
      testOnly_pressed={isPressed}
      variant={variant}
      isDisabled={isDisabled}
      disabled={isDisabled || isLoading}
      isLoading={isLoading}
      size={size}
      accessibilityRole="button">
      {isLoading ? (
        <ActivityIndicator
          size={size === "large" ? "large" : "small"}
          color={activityIndicatorColor}
          testID="button-activity-indicator"
        />
      ) : (
        <Label size={size} variant={variant} isDisabled={isDisabled} isLoading={isLoading} accessibilityRole="text">
          {label}
        </Label>
      )}
    </Pressable>
  );
};

const MemoizedButton = React.memo<StyledButton>(Button);
export { MemoizedButton as Button };
