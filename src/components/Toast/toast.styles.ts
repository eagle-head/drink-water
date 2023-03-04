import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

type Variant = "success" | "error";

export const ToastContainer = styled.View`
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const ToastIcon = styled(Icon)<{ variant: Variant }>`
  font-size: 20px;
  margin-right: 3px;
  color: ${({ theme, variant }) => (variant === "error" ? theme.colors.errorText : theme.colors.successText)};
`;

export const ToastButton = styled.View<{ variant: Variant }>`
  flex-direction: row;
  background-color: #333;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing[3]};
  width: ${width - 32}px;
  align-items: center;
  justify-content: flex-start;
  border-width: 1px;
  background-color: ${({ theme, variant }) =>
    variant === "error" ? theme.colors.errorBackground : theme.colors.successBackground};
  border-color: ${({ theme, variant }) =>
    variant === "error" ? theme.colors.errorBorder : theme.colors.successBorder};
`;

export const ToastText = styled.Text<{ variant: Variant }>`
  font-size: 16px;
  color: ${({ theme, variant }) => (variant === "error" ? theme.colors.errorText : theme.colors.successText)};
`;
