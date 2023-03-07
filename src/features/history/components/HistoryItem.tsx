import React from "react";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Icon from "react-native-vector-icons/FontAwesome5";

import { HistoryItemContainer, TextView } from "./history-item.styles";

import { IconButton, Typography } from "@/components";
import { useTheme } from "@/contexts";

const HistoryItem: RNElement<DrinkingItem> = ({ volume, unit, createdAt }) => {
  const { theme } = useTheme();

  return (
    <HistoryItemContainer>
      <IconButton>
        <Icon name="glass-whiskey" size={30} color={theme.colors.primary} />
      </IconButton>
      <TextView>
        <Typography variant="title">{`${volume} ${unit}`}</Typography>
        <Typography variant="subtitle">
          {format(new Date(createdAt), "hh:mm aa", {
            locale: enUS,
          })}
        </Typography>
      </TextView>
      <IconButton>
        <Icon name="edit" size={30} color={theme.colors.successText} />
      </IconButton>
      <IconButton>
        <Icon name="trash-alt" size={30} color={theme.colors.errorText} />
      </IconButton>
    </HistoryItemContainer>
  );
};

export default HistoryItem;
