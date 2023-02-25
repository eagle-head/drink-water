import { PressableProps } from "react-native";

export {};

declare global {
  type LocalButtonProps = Prettify<
    {
      variant: "contained" | "outlined";
      size: "small" | "medium" | "large";
      isDisabled?: boolean | undefined | null;
      isLoading?: boolean | undefined | null;
      isPressed?: boolean | undefined | null;
    } & PressableProps
  >;

  type StyledButton = Prettify<
    {
      label: string;
    } & LocalButtonProps
  >;
}
