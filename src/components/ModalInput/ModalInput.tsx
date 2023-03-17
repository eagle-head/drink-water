import React from "react";

import { useForm } from "react-hook-form";
import type { ModalProps } from "react-native";
import { Keyboard } from "react-native";
import styled from "styled-components/native";

import { ModalBasis } from "../ModalBasis/ModalBasis";

import { Divider, Input, Typography, Button } from "@/components";
import { useAlarm, useDrinking } from "@/contexts";

interface ModalInputProps extends ModalProps {
  max: number;
  min: number;
  title: string;
  paragraphy: string;
  onVisible: React.Dispatch<React.SetStateAction<boolean>>;
  typeDispatch: "home" | "history" | "settings" | "interval";
  drinkingItem?: DrinkingItem;
}

type InputData = {
  volume: string;
};

const defaultValues: InputData = {
  volume: "",
};

export const ModalInput: RNElement<ModalInputProps> = ({
  typeDispatch,
  max,
  min,
  title,
  paragraphy,
  onVisible,
  visible,
  drinkingItem,
}) => {
  const { state, dispatch: drinkingDispatch } = useDrinking();
  const { dispatch: alarmDispatch } = useAlarm();
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitSuccessful },
  } = useForm<InputData>({ defaultValues });

  const onSubmit = handleSubmit(({ volume }) => {
    if (typeDispatch === "home") {
      const newDrinkItem = { volume: Number(volume), unit: state.unit };
      drinkingDispatch({ type: "DRINKING/ADDED", payload: newDrinkItem });
      return;
    }

    if (typeDispatch === "history" && drinkingItem) {
      const updatedDrinkingItem = { ...drinkingItem, volume: Number(volume) };
      drinkingDispatch({ type: "DRINKING/UPDATED", payload: updatedDrinkingItem });
      return;
    }

    if (typeDispatch === "settings") {
      drinkingDispatch({ type: "DRINKING/GOAL_CHANGED", payload: Number(volume) });
      return;
    }

    if (typeDispatch === "interval") {
      alarmDispatch({ type: "ALARM/INTERVAL", payload: Number(volume) });
      return;
    }
  });

  const handleClose = React.useCallback(() => {
    Keyboard.dismiss();
    onVisible(false);
    clearErrors();
    reset();
  }, [clearErrors, onVisible, reset]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      handleClose();
    }
  }, [isSubmitSuccessful, handleClose]);

  return (
    <ModalBasis visible={visible} onDismiss={handleClose}>
      <ModalInputContainer>
        <TitleView>
          <Typography variant="title">{title}</Typography>
        </TitleView>
        <Divider />
        <BodyView>
          <Typography variant="paragraph">{paragraphy}</Typography>
          <Input
            name="volume"
            control={control}
            defaultValue=""
            rules={{
              required: "This is required",
              pattern: { message: "Only number are allowed", value: /^\d*[1-9]\d*$/ },
              max: { message: `Maximum volume allowed is ${max}`, value: max },
              min: { message: `Minimum volume allowed is ${min}`, value: min },
            }}
          />
        </BodyView>
        <Divider />
        <ButtonView>
          <Button variant="outlined" size="small" label="confirm" onPress={onSubmit} />
          <SpacingView />
          <Button variant="outlined" size="small" label="cancel" onPress={handleClose} />
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
`;

const ButtonView = styled.View`
  flex-direction: row-reverse;
  padding: ${({ theme }) => theme.spacing[3]};
`;

const SpacingView = styled.View`
  height: ${({ theme }) => theme.spacing[1]};
  width: ${({ theme }) => theme.spacing[5]};
`;
