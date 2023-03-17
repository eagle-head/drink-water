import React from "react";

import { BlurView } from "@react-native-community/blur";
import { Modal, StyleSheet } from "react-native";
import type { ModalProps } from "react-native";
import styled from "styled-components/native";

type ModalBasisProps = Omit<ModalProps, "style">;

export const ModalBasis: RNElement<ModalBasisProps> = ({ children, visible, ...rest }) => {
  return (
    <Modal {...rest} visible={visible} transparent hardwareAccelerated>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <ModalBasisView>
        <ModalBasisInnerView testID="modal-ModalBasisInnerView-container">{children}</ModalBasisInnerView>
      </ModalBasisView>
    </Modal>
  );
};

const ModalBasisView = styled.View`
  flex: 1;
`;

const ModalBasisInnerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;
