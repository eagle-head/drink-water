import React from "react";

import { Controller, FieldError, FieldValues } from "react-hook-form";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";

import { useTheme } from "@/contexts";

export function Input<T extends FieldValues>({ control, name, rules, defaultValue, textInputProps }: InputProps<T>) {
  const { theme } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
        <InputContainer>
          <TextInput
            {...textInputProps}
            error={error}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Insert here ..."
            placeholderTextColor={error ? theme.colors.errorText : theme.colors.placeholder}
            accessibilityRole="search"
          />
          {error ? (
            <ErrorContainer>
              <ErrorIcon size={12} name="error-outline" />
              <ErrorText accessibilityRole="text">{error?.message}</ErrorText>
            </ErrorContainer>
          ) : null}
        </InputContainer>
      )}
    />
  );
}

export default Input;

const ErrorIcon = styled(MaterialIcons)`
  margin-right: 2px;
  color: ${({ theme }) => theme.colors.errorText};
`;

const InputContainer = styled.View`
  width: 100%;
  margin-top: 8px;
  justify-content: center;
`;

const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.errorText};
  font-size: 12px;
`;

const TextInput = styled.TextInput<{ error: FieldError | undefined }>`
  min-height: 50px;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 6px;
  font-size: 20px;
  border-color: ${({ theme }) => theme.colors.placeholder};
  border-width: 1px;
  color: ${({ theme }) => theme.colors.placeholder};

  /* error styles */
  ${({ error, theme }) =>
    error &&
    `
      border-color: ${theme.colors.errorText};
      background-color: ${theme.colors.errorBackground};
      font-weight: 300;
    `}
`;
