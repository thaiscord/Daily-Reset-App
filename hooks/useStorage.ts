import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  ONBOARDING_DONE: 'onboarding_done',
  USER_NAME: 'user_name',
  USER_GOALS: 'user_goals',
  NOTIFICATION_TIME: 'notification_time',
  CURRENT_DAY: 'current_day',
  COMPLETED_DAYS: 'completed_days',
  HABITS: 'habits',
  HABIT_LOG: 'habit_log',
  STREAK: 'streak',
  BEST_STREAK: 'best_streak',
  LAST_COMPLETED_DATE: 'last_completed_date',
  IS_PREMIUM: 'is_premium',
  LANGUAGE: 'language',
};

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val === null) return fallback;
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // silently fail
  }
}
