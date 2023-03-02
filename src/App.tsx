import React from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import styled from "styled-components/native";

import { Button, Input } from "./components";

import { AllProviders } from "@/providers";

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

type InputData = {
  volume: string;
};

const App: RNElement = () => {
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { isSubmitSuccessful },
  } = useForm<InputData>();

  const MIN = 50;
  const MAX = 500;

  const onSubmit: SubmitHandler<InputData> = React.useCallback(data => {
    console.log(data);
  }, []);

  const onCancel = React.useCallback(() => {
    Keyboard.dismiss();
    clearErrors();
    reset();
  }, [clearErrors, reset]);

  React.useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    onCancel();
  }, [isSubmitSuccessful, onCancel]);

  return (
    <AllProviders>
      <StyledView>
        <Input
          name="volume"
          control={control}
          defaultValue=""
          rules={{
            required: "This is required",
            pattern: { message: "Only number are allowed", value: /^\d*[1-9]\d*$/ },
            max: { message: `Maximum volume allowed is ${MAX}`, value: MAX },
            min: { message: `Minimum volume allowed is ${MIN}`, value: MIN },
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Button label="Cancel" size="small" variant="outlined" onPress={onCancel} />
          <View style={{ height: 20, width: 20 }} />
          <Button label="Confirm" size="small" variant="outlined" onPress={handleSubmit(onSubmit)} />
        </View>
      </StyledView>
    </AllProviders>
  );
};

export default App;
