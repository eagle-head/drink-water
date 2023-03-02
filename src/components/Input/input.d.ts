import type { FieldValues, UseControllerProps } from "react-hook-form";
import type { TextInputProps } from "react-native";

export {};

declare global {
  interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
    textInputProps?: TextInputProps | undefined;
  }
}
