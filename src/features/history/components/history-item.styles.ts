import styled from "styled-components/native";

export const HistoryItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing[1]};
  padding-bottom: ${({ theme }) => theme.spacing[1]};
`;

export const TextView = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

export const TextInnerView = styled.View`
  flex-direction: row;
`;
