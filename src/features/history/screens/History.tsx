import React from "react";

import { FlatList } from "react-native";

import { HistoryItem } from "../components/HistoryItem";

import { HistoryContainer } from "./history.styles";

import { Divider } from "@/components";

const LIST_ITEMS: DrinkingItem[] = [
  {
    unit: "mL",
    volume: 250,
    createdAt: new Date(Date.now()),
  },
  {
    unit: "mL",
    volume: 100,
    createdAt: new Date(Date.now() + 60000),
  },
  {
    unit: "mL",
    volume: 50,
    createdAt: new Date(Date.now() + 120000),
  },
];

export const HistoryScreen: RNElement<HistoryScreenProps> = () => {
  const renderHistoryItem: FlatListRenderItem<DrinkingItem> = ({ item }) => {
    return <HistoryItem {...item} />;
  };

  return (
    <HistoryContainer>
      <FlatList
        data={LIST_ITEMS}
        alwaysBounceVertical={false}
        renderItem={renderHistoryItem}
        ItemSeparatorComponent={Divider}
        keyExtractor={({ createdAt }) => createdAt.toString().replace(/ /g, "")}
      />
    </HistoryContainer>
  );
};
