/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { type SubmitHandler, useForm, UseFormClearErrors, FieldValues, UseFormReset } from "react-hook-form";
import { Keyboard, View } from "react-native";
import styled from "styled-components/native";

import { Button, Input } from "@/components";

type InputData = {
  volume: string;
};

type InputTestProps = {
  clearErrors: UseFormClearErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
};

export const InputTestComponent: RNElement<InputTestProps> = ({ clearErrors, reset }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm<InputData>();

  const onSubmit: SubmitHandler<InputData> = data => {
    return console.log(data);
  };

  const onCancel = React.useCallback(() => {
    const dismissKeyboard = Keyboard.dismiss();
    const clearErrorsFunc = clearErrors();
    const resetFunc = reset();
    return { dismissKeyboard, clearErrorsFunc, resetFunc };
  }, [clearErrors, reset]);

  React.useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    onCancel();
  }, [isSubmitSuccessful, onCancel]);

  const MIN = 50;
  const MAX = 500;

  return (
    <StyledView>
      <Input
        name="volume"
        control={control}
        defaultValue=""
        rules={{
          required: "This is required.",
          pattern: { message: "Only number are allowed.", value: /^\d*[1-9]\d*$/ },
          max: { message: `Maximum volume allowed is ${MAX}.`, value: MAX },
          min: { message: `Minimum volume allowed is ${MIN}.`, value: MIN },
        }}
      />
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Button label="Cancel" size="small" variant="outlined" onPress={onCancel} />
        <View style={{ height: 20, width: 20 }} />
        <Button label="Confirm" size="small" variant="outlined" onPress={handleSubmit(onSubmit)} />
      </View>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;
