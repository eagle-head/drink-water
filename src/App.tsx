/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";

import { SafeAreaView, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const App: RNElement = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AntDesign name="customerservice" color="blue" size={50} />
      <AntDesign name="windows" color="blue" size={50} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
