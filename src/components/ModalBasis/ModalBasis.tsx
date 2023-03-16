/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { BlurView } from "@react-native-community/blur";
import { Dimensions, Modal, Platform, StyleSheet, View } from "react-native";
import type { ModalProps } from "react-native";

type ModalBasisProps = Omit<ModalProps, "style">;

const isIos = Platform.OS === "ios";
const { height } = Dimensions.get("window");

export const ModalBasis: RNElement<ModalBasisProps> = ({ children, visible, ...rest }) => {
  return (
    <Modal {...rest} visible={visible} transparent hardwareAccelerated>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.container}>
        <View style={[styles.innerContainer, isIos ? { top: height / 3.5 } : { justifyContent: "center" }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
