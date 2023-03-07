import styled from "styled-components/native";

export const HistoryContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
`;
