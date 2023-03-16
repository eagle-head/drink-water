import React from "react";

import { FlatList } from "react-native";

import { HistoryItem } from "../components/HistoryItem";

import { HistoryContainer } from "./history.styles";

import { Divider } from "@/components";
import { useDrinking } from "@/contexts";

export const HistoryScreen: RNElement<HistoryScreenProps> = () => {
  const {
    state: { listItems },
  } = useDrinking();

  const renderHistoryItem: FlatListRenderItem<DrinkingItem> = ({ item }) => {
    return <HistoryItem {...item} />;
  };

  return (
    <HistoryContainer>
      <FlatList
        data={listItems}
        alwaysBounceVertical={false}
        renderItem={renderHistoryItem}
        ItemSeparatorComponent={Divider}
        keyExtractor={({ createdAt }) => createdAt.toString().replace(/ /g, "")}
      />
    </HistoryContainer>
  );
};
