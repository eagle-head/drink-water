import notifee, { AndroidImportance, TriggerType, AuthorizationStatus, RepeatFrequency } from "@notifee/react-native";
import { Alert, Linking, Platform } from "react-native";

import { clearAlarmStorage } from "@/storage";

type ScheduleNotificationConfig = {
  startTime: Date;
  endTime: Date;
  interval: number;
};

export async function requestNotificationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === AuthorizationStatus.NOT_DETERMINED) {
    Alert.alert(
      "Notification Permission",
      "To receive water reminder notifications, please enable notifications in your device settings.",
      [
        {
          text: "Cancel",
          onPress: () => console.warn("Permission request canceled"),
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: async () => {
            if (Platform.OS === "android" && Platform.Version >= 31) {
              await notifee.openAlarmPermissionSettings();
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  }
}

export async function createWaterReminderNotifications(config: ScheduleNotificationConfig) {
  // Cancel all existing notifications
  clearAlarmStorage();
  await notifee.cancelAllNotifications();

  const channelId = await notifee.createChannel({
    id: "water_reminder",
    name: "Water Reminder",
    importance: AndroidImportance.HIGH,
  });

  const notifications = calculateNotificationDates(config);

  for (const triggerDate of notifications) {
    // Check if the timestamp is in the past
    while (triggerDate.getTime() <= Date.now()) {
      // If it's in the past, add a day to the timestamp
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    await notifee.createTriggerNotification(
      {
        title: "Drink Water",
        body: "Time to drink some water!",
        android: {
          channelId,
          smallIcon: "ic_launcher",
          color: "#1E90FF",
          vibrationPattern: [500, 1000],
          importance: AndroidImportance.HIGH,
          actions: [
            {
              title: "Snooze",
              pressAction: {
                id: "snooze",
              },
            },
            {
              title: "Skip",
              pressAction: {
                id: "skip",
              },
            },
          ],
        },
        ios: {
          categoryId: "water_reminder",
          sound: "default",
          critical: true,
          criticalVolume: 1,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
        repeatFrequency: RepeatFrequency.DAILY, // Repeat daily
        alarmManager: {
          allowWhileIdle: true,
        },
      }
    );
  }
}

export async function cancelAllWaterReminderNotifications() {
  clearAlarmStorage();
  await notifee.cancelAllNotifications();
}

function calculateNotificationDates(config: ScheduleNotificationConfig): Date[] {
  const notifications: Date[] = [];

  const currentTime = config.startTime;
  while (currentTime <= config.endTime) {
    notifications.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + config.interval);
  }

  return notifications;
}

// if (__DEV__) {
//   notifee.getTriggerNotificationIds().then(ids => {
//     console.log("Length: ", ids.length);
//     console.log("All trigger notifications: ", ids);
//   });
// }
