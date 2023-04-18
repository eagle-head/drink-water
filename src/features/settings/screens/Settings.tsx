import React from "react";

import notifee from "@notifee/react-native";
import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

import { SettingsList } from "../components/SettingsList/SettingsList";

import { Divider, ModalInput, Typography } from "@/components";
import { useAlarm, useDrinking } from "@/contexts";
import { requestNotificationPermission } from "@/notifications";

export const SettingsScreen: RNElement<SettingsScreenProps> = () => {
  const { state: alarmState, dispatch: alarmDispatch } = useAlarm();
  const { state: drinkingState, dispatch: drinkingDispatch } = useDrinking();
  const [isGoalVolumeModalOpened, setIsGoalVolumeModalOpened] = React.useState<boolean>(false);
  const [isIntervalTimeModalOpened, setIsIntervalTimeModalOpened] = React.useState<boolean>(false);
  const [isStartTimeModalOpened, setIsStartTimeModalOpened] = React.useState<boolean>(false);
  const [isEndTimeModalOpened, setIsEndTimeModalOpened] = React.useState<boolean>(false);
  const [isUnitSwitchEnabled, setIsUnitSwitchEnabled] = React.useState<boolean>(
    drinkingState.unit === "mL" ? false : true
  );
  const [isAlarmSwitchEnabled, setIsAlarmSwitchEnabled] = React.useState<boolean>(
    alarmState.power === "OFF" ? false : true
  );

  function toogleUnitSwitch() {
    setIsUnitSwitchEnabled(prevState => !prevState);
    drinkingDispatch({ type: "DRINKING/TOGGLED" });
  }

  function toogleAlarmSwitch() {
    setIsAlarmSwitchEnabled(prevState => !prevState);
    alarmDispatch({ type: "ALARM/TOGGLED" });
  }

  useFocusEffect(
    React.useCallback(() => {
      const executeRequestNotificationPermission = async () => {
        await requestNotificationPermission();
      };

      executeRequestNotificationPermission();
    }, [])
  );

  React.useEffect(() => {
    notifee.getTriggerNotificationIds().then(ids => {
      console.log(" ");
      console.log("Trigger notifications length: ", ids.length);
      console.log("All trigger notifications: ", ids);
      console.log(" ");
    });
  }, [alarmState, drinkingState]);

  return (
    <>
      <SettingsList>
        <View style={styles.root}>
          <View>
            <Typography variant="title">Power</Typography>
            <Typography variant="subtitle">{alarmState.power}</Typography>
          </View>
          <View style={styles.containerToggle}>
            <Switch
              trackColor={{ false: "#f3e9ec" }}
              value={isAlarmSwitchEnabled}
              onChange={toogleAlarmSwitch}
              accessibilityRole="togglebutton"
            />
          </View>
        </View>
        <Divider />
        <View style={styles.root}>
          <View>
            <Typography variant="title">Unit</Typography>
            <Typography variant="subtitle">{drinkingState.unit}</Typography>
          </View>
          <View style={styles.containerToggle}>
            <Switch
              trackColor={{ false: "#f3e9ec" }}
              value={isUnitSwitchEnabled}
              onChange={toogleUnitSwitch}
              accessibilityRole="togglebutton"
            />
          </View>
        </View>
        <Divider />
        {/* Goal Volume Item */}
        <TouchableOpacity style={styles.root} onPress={() => setIsGoalVolumeModalOpened(true)}>
          <View>
            <Typography variant="title">Goal Volume</Typography>
            <Typography variant="subtitle">{`${drinkingState.goal} ${drinkingState.unit}`}</Typography>
          </View>
        </TouchableOpacity>
        {/* Goal Volume Item */}
        <Divider />
        {/* Alarm Settings Item */}
        <TouchableOpacity style={styles.root} onPress={() => setIsStartTimeModalOpened(true)}>
          <View>
            <Typography variant="title">Start time</Typography>
            <Typography variant="subtitle">{`${format(new Date(alarmState.startTime), "hh:mm aa", {
              locale: enUS,
            })}`}</Typography>
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.root} onPress={() => setIsEndTimeModalOpened(true)}>
          <View>
            <Typography variant="title">End time</Typography>
            <Typography variant="subtitle">{`${format(new Date(alarmState.endTime), "hh:mm aa", {
              locale: enUS,
            })}`}</Typography>
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.root} onPress={() => setIsIntervalTimeModalOpened(true)}>
          <View>
            <Typography variant="title">Interval time</Typography>
            <Typography variant="subtitle">{`${alarmState.interval} minutes`}</Typography>
          </View>
        </TouchableOpacity>
        {/* Alarm Settings Item */}
      </SettingsList>
      {isStartTimeModalOpened ? (
        <DatePicker
          modal
          open={isStartTimeModalOpened}
          date={new Date(alarmState.startTime)}
          mode="time"
          locale="en-US"
          onConfirm={date => {
            setIsStartTimeModalOpened(false);
            alarmDispatch({ type: "ALARM/START", payload: date });
          }}
          onCancel={() => {
            setIsStartTimeModalOpened(false);
          }}
        />
      ) : null}
      {isEndTimeModalOpened ? (
        <DatePicker
          modal
          open={isEndTimeModalOpened}
          date={new Date(alarmState.endTime)}
          mode="time"
          locale="en-US"
          onConfirm={date => {
            setIsEndTimeModalOpened(false);
            alarmDispatch({ type: "ALARM/END", payload: date });
          }}
          onCancel={() => {
            setIsEndTimeModalOpened(false);
          }}
        />
      ) : null}
      <ModalInput
        min={1000}
        max={5000}
        animationType="fade"
        visible={isGoalVolumeModalOpened}
        typeDispatch="settings"
        title="What is your goal?"
        onVisible={setIsGoalVolumeModalOpened}
        paragraphy="Update your new goal"
      />
      <ModalInput
        min={15}
        max={120}
        animationType="fade"
        visible={isIntervalTimeModalOpened}
        typeDispatch="interval"
        title="Interval time"
        onVisible={setIsIntervalTimeModalOpened}
        paragraphy="Update your interval time"
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    flexDirection: "row",
  },
  containerToggle: {
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
