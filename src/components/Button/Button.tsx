import React from "react";

import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/assets";
import { compact } from "@/utils";

type ButtonProps = {
  label: string;
  size: "small" | "medium" | "large";
  variant: "contained" | "outlined";
  isPressed?: boolean | undefined | null;
  isDisabled?: boolean | undefined | null;
  isLoading?: boolean | undefined | null;
};

export const Button: RNElement<ButtonProps> = React.memo(
  ({ isDisabled, size, label, isPressed, isLoading, variant }) => {
    const disabledButtonStyles = isDisabled || isLoading ? disabled[variant].button : null;

    return (
      <Pressable
        style={({ pressed }) =>
          compact([
            styles.button,
            sizes[size].button,
            variants[variant].button,
            disabledButtonStyles,
            pressed ? styles.pressed : null,
          ])
        }
        android_ripple={{ color: Colors.PrimaryDark }}
        disabled={isDisabled || isLoading}
        testOnly_pressed={isPressed}
        accessibilityRole="button">
        {isLoading ? (
          <ActivityIndicator
            testID="button-activity-indicator"
            size={size === "large" ? "large" : "small"}
            color={variant === "contained" ? Colors.White : Colors.Disabled}
          />
        ) : (
          <Text
            testID="button-label"
            style={compact([styles.label, sizes[size].label, variants[variant].label])}
            accessibilityRole="text">
            {label}
          </Text>
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    letterSpacing: 1,
    fontWeight: "normal",
    textTransform: "uppercase",
  },
});

const contained = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary,
  },
  label: {
    color: Colors.White,
  },
});

const outlined = StyleSheet.create({
  button: {
    borderColor: Colors.Primary,
    borderWidth: 2.5,
    backgroundColor: "transparent",
  },
  label: {
    color: Colors.Primary,
    letterSpacing: 0.5,
  },
});

const small = StyleSheet.create({
  button: {
    height: 40,
    width: "35%",
  },
  label: {
    fontSize: 18,
  },
});

const medium = StyleSheet.create({
  button: {
    height: 50,
    width: "50%",
  },
  label: {
    fontSize: 22,
  },
});

const large = StyleSheet.create({
  button: {
    height: 60,
    width: "100%",
  },
  label: {
    fontSize: 26,
    letterSpacing: 1.5,
  },
});

const containedDisabled = StyleSheet.create({
  button: {
    backgroundColor: Colors.Disabled,
  },
});

const outlinedDisabled = StyleSheet.create({
  button: {
    borderColor: Colors.Disabled,
  },
});

const disabled = {
  contained: containedDisabled,
  outlined: outlinedDisabled,
};

const variants = {
  contained,
  outlined,
};

const sizes = {
  small,
  medium,
  large,
};
