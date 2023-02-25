import styled from "styled-components/native";

export const Pressable = styled.Pressable<LocalButtonProps>`
  /* default styles */
  border-radius: ${({ theme }) => theme.spacing[1]};
  align-items: center;
  justify-content: center;

  /* variant styles */
  ${({ theme, isDisabled, isLoading, variant }) =>
    variant === "contained" &&
    `
      background-color: ${isDisabled || isLoading ? theme.colors.disabled : theme.colors.primary};
      border: none;
  `}

  ${({ theme, isDisabled, isLoading, variant }) =>
    variant === "outlined" &&
    `
      background-color: transparent;
      border: 2px solid ${isDisabled || isLoading ? theme.colors.disabled : theme.colors.primary};
  `}

  /* size styles*/
  ${({ size }) =>
    size === "small" &&
    `
      height: 40px;
      width: 35%;
  `}

  ${({ size }) =>
    size === "medium" &&
    `
      height: 50px;
      width: 50%;
    `}

  ${({ size }) =>
    size === "large" &&
    `
      height: 60px;
      width: 100%;
    `}
`;

export const Label = styled.Text<LocalButtonProps>`
  /* default styles */
  letter-spacing: 1px;
  font-weight: normal;
  text-transform: uppercase;

  /* variant styles */
  ${({ theme, variant }) =>
    variant === "contained" &&
    `
      color: ${theme.colors.secondary};
  `}

  ${({ theme, isDisabled, isLoading, variant }) =>
    variant === "outlined" &&
    `
      color: ${isDisabled || isLoading ? theme.colors.disabled : theme.colors.primary};
  `}

    /* size styles*/
  ${({ size }) =>
    size === "small" &&
    `
      font-size: 18px;
  `}

  ${({ size }) =>
    size === "medium" &&
    `
      font-size: 22px;
  `}

  ${({ size }) =>
    size === "large" &&
    `
      font-size: 26px;
      letter-spacing: 1.5px;
  `}
`;
