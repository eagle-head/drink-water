import React from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";

import { Button } from "./components";

import { Colors } from "@/assets";

const App: RNElement = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button size="small" variant="contained" label="Press" />
      <View style={{ height: 10, width: 2 }} />
      <Button size="medium" variant="contained" label="Press" />
      <View style={{ height: 10, width: 2 }} />
      <Button size="large" variant="contained" label="Press" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
  },
});

export default App;
