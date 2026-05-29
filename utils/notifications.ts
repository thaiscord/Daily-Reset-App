import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyNotification(time: 'morning' | 'afternoon' | 'evening') {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const timeMap = {
    morning: { hour: 7, minute: 0 },
    afternoon: { hour: 12, minute: 0 },
    evening: { hour: 20, minute: 0 },
  };

  const messages = {
    morning: {
      title: 'Daily Reset',
      body: 'Your Daily Reset is ready. One action can change your day.',
    },
    afternoon: {
      title: 'Time to Refocus',
      body: 'Time to refocus. Start your reset.',
    },
    evening: {
      title: 'Before the day ends',
      body: 'Before the day ends, complete your reset.',
    },
  };

  const { hour, minute } = timeMap[time];
  const { title, body } = messages[time];

  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: false },
    trigger: {
      hour,
      minute,
      repeats: true,
      ...(Platform.OS === 'android' ? { channelId: 'daily-reset' } : {}),
    } as any,
  });
}
