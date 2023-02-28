import React from "react";

import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

import { useTheme } from "@/contexts";

type CircularProgressBarProps = {
  progress: number;
  size: number;
  strokeWidth: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Rules to clampedProgress variable:
 * Clamp progress value between 0 and 1
 */
export const CircularProgressBar: RNElement<CircularProgressBarProps> = ({ progress, size, strokeWidth }) => {
  const { theme } = useTheme();
  const clampedProgress = React.useMemo(() => Math.min(Math.max(progress, 0), 1), [progress]);
  const progressValue = useSharedValue(clampedProgress);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  React.useEffect(() => {
    progressValue.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [progress, progressValue]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progressValue.value);
    return {
      strokeDashoffset,
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.round(progressValue.value * 100)}%`;
  });

  const memoizedAnimatedProps = React.useMemo(() => animatedProps, [animatedProps]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ReText text={progressText} style={[styles.text, { color: theme.colors.title }]} accessibilityRole="search" />
      <Svg height="100%" width="100%" style={styles.svg}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.35}
        />
        <AnimatedCircle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={[circumference, circumference]}
          animatedProps={memoizedAnimatedProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
  },
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    opacity: 0.35,
  },
});
