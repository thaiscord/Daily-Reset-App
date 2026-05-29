import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';

export interface ProgressState {
  currentDay: number;
  completedDays: number[];
  streak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  isPremium: boolean;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    currentDay: 1,
    completedDays: [],
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    isPremium: false,
  });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [currentDay, completedDays, streak, bestStreak, lastCompletedDate, isPremium] = await Promise.all([
      getItem<number>(StorageKeys.CURRENT_DAY, 1),
      getItem<number[]>(StorageKeys.COMPLETED_DAYS, []),
      getItem<number>(StorageKeys.STREAK, 0),
      getItem<number>(StorageKeys.BEST_STREAK, 0),
      getItem<string | null>(StorageKeys.LAST_COMPLETED_DATE, null),
      getItem<boolean>(StorageKeys.IS_PREMIUM, false),
    ]);
    setProgress({ currentDay, completedDays, streak, bestStreak, lastCompletedDate, isPremium });
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const completeDay = useCallback(async (day: number) => {
    const today = new Date().toDateString();
    const newCompleted = progress.completedDays.includes(day)
      ? progress.completedDays
      : [...progress.completedDays, day];

    let newStreak = progress.streak;
    let newBestStreak = progress.bestStreak;

    if (progress.lastCompletedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = progress.lastCompletedDate === yesterday.toDateString();
      newStreak = wasYesterday ? progress.streak + 1 : 1;
      newBestStreak = Math.max(newStreak, progress.bestStreak);
    }

    const nextDay = Math.max(day + 1, progress.currentDay);

    await Promise.all([
      setItem(StorageKeys.COMPLETED_DAYS, newCompleted),
      setItem(StorageKeys.STREAK, newStreak),
      setItem(StorageKeys.BEST_STREAK, newBestStreak),
      setItem(StorageKeys.LAST_COMPLETED_DATE, today),
      setItem(StorageKeys.CURRENT_DAY, nextDay),
    ]);

    setProgress(prev => ({
      ...prev,
      completedDays: newCompleted,
      streak: newStreak,
      bestStreak: newBestStreak,
      lastCompletedDate: today,
      currentDay: nextDay,
    }));

    return { isFirstCompletion: !progress.completedDays.includes(day) };
  }, [progress]);

  const unlockPremium = useCallback(async () => {
    await setItem(StorageKeys.IS_PREMIUM, true);
    setProgress(prev => ({ ...prev, isPremium: true }));
  }, []);

  const weeklyScore = progress.completedDays.filter(d => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    return d >= progress.currentDay - dayOfWeek && d <= progress.currentDay;
  }).length;

  const monthlyScore = progress.completedDays.filter(d => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    return d >= progress.currentDay - dayOfMonth && d <= progress.currentDay;
  }).length;

  return { progress, loading, completeDay, unlockPremium, reload: load, weeklyScore, monthlyScore };
}
