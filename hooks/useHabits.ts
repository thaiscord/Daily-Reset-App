import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
}

export interface HabitLog {
  [dateKey: string]: string[];
}

const defaultHabits: Habit[] = [
  { id: 'morning', name: 'Morning Routine', icon: 'sunny-outline', isDefault: true },
  { id: 'workout', name: 'Workout', icon: 'barbell-outline', isDefault: true },
  { id: 'deepwork', name: 'Deep Work', icon: 'laptop-outline', isDefault: true },
  { id: 'read', name: 'Read 20 Pages', icon: 'book-outline', isDefault: true },
  { id: 'water', name: 'Drink Water', icon: 'water-outline', isDefault: true },
  { id: 'nodistractions', name: 'No Distractions', icon: 'notifications-off-outline', isDefault: true },
  { id: 'sleep', name: 'Sleep Earlier', icon: 'moon-outline', isDefault: true },
  { id: 'plan', name: 'Plan Tomorrow', icon: 'calendar-outline', isDefault: true },
  { id: 'gratitude', name: 'Gratitude', icon: 'heart-outline', isDefault: true },
  { id: 'detox', name: 'Digital Detox', icon: 'phone-portrait-outline', isDefault: true },
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [habitLog, setHabitLog] = useState<HabitLog>({});
  const [loading, setLoading] = useState(true);

  const todayKey = new Date().toDateString();

  const load = useCallback(async () => {
    const [savedHabits, savedLog] = await Promise.all([
      getItem<Habit[]>(StorageKeys.HABITS, defaultHabits),
      getItem<HabitLog>(StorageKeys.HABIT_LOG, {}),
    ]);
    setHabits(savedHabits);
    setHabitLog(savedLog);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleHabit = useCallback(async (habitId: string) => {
    const todayCompleted = habitLog[todayKey] || [];
    const updated = todayCompleted.includes(habitId)
      ? todayCompleted.filter(id => id !== habitId)
      : [...todayCompleted, habitId];
    const newLog = { ...habitLog, [todayKey]: updated };
    await setItem(StorageKeys.HABIT_LOG, newLog);
    setHabitLog(newLog);
  }, [habitLog, todayKey]);

  const todayCompleted = habitLog[todayKey] || [];
  const completionRate = habits.length > 0 ? (todayCompleted.length / habits.length) * 100 : 0;

  return { habits, habitLog, todayCompleted, completionRate, loading, toggleHabit };
}
