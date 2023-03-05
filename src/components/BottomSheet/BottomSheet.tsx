import React from "react";
import type { PropsWithChildren } from "react";

import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type BottomSheetProps = PropsWithChildren;

export type BottomSheetRefProps = {
  scrollTo: (param: number) => void;
  isActive: () => boolean;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
  const active = useSharedValue(false);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = React.useCallback(
    (destination: number) => {
      "worklet";
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    },
    [active, translateY]
  );

  const isActive = React.useCallback(() => {
    "worklet";
    return active.value;
  }, [active.value]);

  React.useImperativeHandle(
    ref,
    () => {
      return { scrollTo, isActive };
    },
    [isActive, scrollTo]
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      }

      if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(-SCREEN_HEIGHT);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT],
      [25, 0],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View testID="bottom-sheet" style={[styles.container, animatedStyle]}>
        <View testID="bottom-sheet-line" style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
