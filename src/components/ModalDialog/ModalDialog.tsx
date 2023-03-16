import React from "react";

import { Keyboard } from "react-native";
import type { ModalProps } from "react-native";
import styled from "styled-components/native";

import { ModalBasis } from "../ModalBasis/ModalBasis";

import { Divider, Typography, Button } from "@/components";
import { useDrinking } from "@/contexts";

interface ModalDialogProps extends ModalProps {
  title: string;
  paragraphy: string;
  createdAt: Date;
  onVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDialog: RNElement<ModalDialogProps> = ({
  title,
  paragraphy,
  onVisible,
  visible,
  createdAt,
  ...rest
}) => {
  const { dispatch } = useDrinking();

  const handleClose = React.useCallback(() => {
    Keyboard.dismiss();
    onVisible(false);
  }, [onVisible]);

  const handleDeletingAction = React.useCallback(() => {
    dispatch({ type: "DRINKING/DELETED", payload: createdAt });
    handleClose();
  }, [dispatch, handleClose, createdAt]);

  return (
    <ModalBasis {...rest} visible={visible} onRequestClose={handleClose}>
      <ModalInputContainer>
        <TitleView>
          <Typography variant="title">{title}</Typography>
        </TitleView>
        <Divider />
        <BodyView>
          <Typography variant="paragraph">{paragraphy}</Typography>
        </BodyView>
        <Divider />
        <ButtonView>
          <Button variant="outlined" size="small" label="Confirm" onPress={handleDeletingAction} />
          <SpacingView />
          <Button variant="outlined" size="small" label="Cancel" onPress={handleClose} />
        </ButtonView>
      </ModalInputContainer>
    </ModalBasis>
  );
};

const ModalInputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  border-radius: 6px;
`;

const TitleView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]};
`;

const BodyView = styled.View`
  padding: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ButtonView = styled.View`
  flex-direction: row-reverse;
  padding: ${({ theme }) => theme.spacing[3]};
`;

const SpacingView = styled.View`
  height: ${({ theme }) => theme.spacing[1]};
  width: ${({ theme }) => theme.spacing[5]};
`;
