import React from "react";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Icon from "react-native-vector-icons/FontAwesome5";

import { HistoryItemContainer, TextView } from "./history-item.styles";

import { IconButton, ModalDialog, ModalInput, Typography } from "@/components";
import { useTheme } from "@/contexts";

export const HistoryItem: RNElement<DrinkingItem> = ({ volume, unit, createdAt }) => {
  const { theme } = useTheme();
  const [isUpdateModalOpened, setIsUpdateModalOpened] = React.useState<boolean>(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = React.useState<boolean>(false);

  return (
    <>
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
        <IconButton onPress={() => setIsUpdateModalOpened(true)}>
          <Icon name="edit" size={30} color={theme.colors.successText} />
        </IconButton>
        <IconButton onPress={() => setIsDeleteModalOpened(true)}>
          <Icon name="trash-alt" size={30} color={theme.colors.errorText} />
        </IconButton>
      </HistoryItemContainer>
      <ModalDialog
        title="Warning"
        paragraphy="Are you sure you want to delete this item?"
        animationType="fade"
        createdAt={createdAt}
        visible={isDeleteModalOpened}
        onVisible={setIsDeleteModalOpened}
      />
      <ModalInput
        min={50}
        max={500}
        title="Warning"
        animationType="fade"
        typeDispatch="history"
        drinkingItem={{ volume, unit, createdAt }}
        visible={isUpdateModalOpened}
        onVisible={setIsUpdateModalOpened}
        paragraphy="Insert your desired volume"
      />
    </>
  );
};
