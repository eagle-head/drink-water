import React from "react";

import { Animated, Dimensions, StyleSheet } from "react-native";

import { ToastButton, ToastContainer, ToastIcon, ToastText } from "./toast.styles";

const { height } = Dimensions.get("window");

type Variant = "success" | "error";

interface ToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
  variant: Variant;
}

export const Toast: RNElement<ToastProps> = ({ message, duration = 5000, onHide, variant }) => {
  const translateY = React.useRef(new Animated.Value(-height)).current;

  const animate = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 20,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(translateY, {
        toValue: -height,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [duration, onHide, translateY]);

  React.useEffect(() => {
    animate();
  }, [animate]);

  return (
    <ToastContainer>
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <ToastButton variant={variant}>
          <ToastIcon
            name={variant === "error" ? "alert-circle-outline" : "checkmark-circle-outline"}
            variant={variant}
            testID={variant === "error" ? "toast-error-icon" : "toast-success-icon"}
          />
          <ToastText variant={variant} accessibilityRole="text">
            {message}
          </ToastText>
        </ToastButton>
      </Animated.View>
    </ToastContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});
