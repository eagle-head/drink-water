import React from "react";

import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";

import { SettingsList } from "../components/SettingsList/SettingsList";

import { Divider, Typography } from "@/components";

export const SettingsScreen: RNElement<SettingsScreenProps> = () => {
  const [isSwitchEnabled, setIsSwitchEnabled] = React.useState<boolean>(false);

  function toogleSwitch() {
    setIsSwitchEnabled(prevState => !prevState);
  }

  return (
    <SettingsList>
      <View style={styles.root}>
        <View>
          <Typography variant="title">Unit</Typography>
          <Typography variant="subtitle">mL</Typography>
        </View>
        <View style={styles.containerUnit}>
          <Switch
            trackColor={{ false: "#f3e9ec" }}
            value={isSwitchEnabled}
            onChange={toogleSwitch}
            accessibilityRole="togglebutton"
          />
        </View>
      </View>
      <Divider />
      {/* Goal Volume Item */}
      <TouchableOpacity style={styles.root}>
        <View>
          <Typography variant="title">Goal Volume</Typography>
          <Typography variant="subtitle">2500 mL</Typography>
        </View>
      </TouchableOpacity>
      {/* Goal Volume Item */}
      <Divider />
      {/* Alarm Settings Item */}
      <TouchableOpacity style={styles.root}>
        <View>
          <Typography variant="title">Start time</Typography>
          <Typography variant="subtitle">08:00 AM</Typography>
        </View>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.root}>
        <View>
          <Typography variant="title">End time</Typography>
          <Typography variant="subtitle">06:00 PM</Typography>
        </View>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.root}>
        <View>
          <Typography variant="title">Interval time</Typography>
          <Typography variant="subtitle">60 minutes</Typography>
        </View>
      </TouchableOpacity>
      {/* Alarm Settings Item */}
    </SettingsList>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    flexDirection: "row",
  },
  containerUnit: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  unitTitle: {
    fontSize: 22,
    color: "grey",
    fontWeight: "bold",
  },
});
