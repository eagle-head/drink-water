import styled from "styled-components/native";

export const Text = styled.Text<TypographyVariants>`
  /* variant styles */
  ${({ theme, variant }) =>
    variant === "title" &&
    `
      font-size: 24px;
      font-weight: bold;
      color: ${theme.colors.title};
    `}

  ${({ theme, variant }) =>
    variant === "subtitle" &&
    `
      font-size: 20px;
      font-weight: bold;
      color: ${theme.colors.subtitle};
    `}

  ${({ theme, variant }) =>
    variant === "paragraph" &&
    `
      font-size: 16px;
      font-weight: normal;
      text-align: justify;
      color: ${theme.colors.paragraph};
  `}
`;
