import styled from "styled-components/native";

export const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const CircularProgressBarView = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
`;

export const ButtonView = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
`;
