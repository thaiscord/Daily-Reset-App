import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing, Radii } from '../theme';

const FOCUS_DURATIONS = [15, 25, 45, 60];
const DETOX_DURATIONS = [15, 30, 60, 120];

interface TimerProps {
  visible: boolean;
  onClose: () => void;
  mode: 'focus' | 'detox';
}

function TimerRing({ progress, size, color }: { progress: number; size: number; color: string }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke={Colors.backgroundSecondary} strokeWidth={strokeWidth} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function FocusTimerModal({ visible, onClose, mode }: TimerProps) {
  const durations = mode === 'focus' ? FOCUS_DURATIONS : DETOX_DURATIONS;
  const [selectedMinutes, setSelectedMinutes] = useState(durations[1]);
  const [secondsLeft, setSecondsLeft] = useState(durations[1] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const selectDuration = (mins: number) => {
    if (isRunning) return;
    setSelectedMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsComplete(false);
  };

  const toggle = () => setIsRunning(prev => !prev);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(selectedMinutes * 60);
    setIsComplete(false);
  };

  const progress = secondsLeft / (selectedMinutes * 60);
  const accentColor = mode === 'focus' ? Colors.accent : '#00BCD4';

  const title = mode === 'focus' ? 'Focus Timer' : 'Digital Detox';
  const completedMessage = mode === 'focus'
    ? 'Focus completed. You stayed in control.'
    : 'You stayed in control.';
  const runningMessage = mode === 'focus'
    ? 'Stay focused. You\'re in control.'
    : 'Stay with yourself. Don\'t escape the moment.';

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name={mode === 'focus' ? 'timer-outline' : 'phone-portrait-outline'} size={20} color={accentColor} />
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.durationRow}>
          {durations.map(d => (
            <TouchableOpacity
              key={d}
              style={[styles.durationChip, selectedMinutes === d && { backgroundColor: accentColor, borderColor: accentColor }]}
              onPress={() => selectDuration(d)}
            >
              <Text style={[styles.durationText, selectedMinutes === d && styles.durationTextActive]}>
                {d < 60 ? `${d}m` : `${d / 60}h`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timerContainer}>
          <View style={styles.timerRingWrapper}>
            <TimerRing progress={progress} size={220} color={accentColor} />
            <View style={styles.timerCenter}>
              <Text style={[styles.timerText, { color: accentColor }]}>{formatTime(secondsLeft)}</Text>
              {isComplete ? (
                <Text style={styles.completedLabel}>{completedMessage}</Text>
              ) : isRunning ? (
                <Text style={styles.runningLabel}>{runningMessage}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {!isComplete ? (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
              <Ionicons name="refresh" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playBtn, { borderColor: accentColor }]} onPress={toggle} activeOpacity={0.85}>
              <LinearGradient
                colors={[accentColor, mode === 'focus' ? Colors.accentLight : '#29E0F0']}
                style={styles.playBtnGradient}
              >
                <Ionicons name={isRunning ? 'pause' : 'play'} size={30} color={Colors.background} />
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ width: 52 }} />
          </View>
        ) : (
          <TouchableOpacity style={[styles.doneBtn, { borderColor: accentColor }]} onPress={reset}>
            <Text style={[styles.doneBtnText, { color: accentColor }]}>Start Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
  closeBtn: { padding: Spacing.sm },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  durationChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  durationText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textSecondary },
  durationTextActive: { color: Colors.background },
  timerContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  timerRingWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  timerCenter: { position: 'absolute', alignItems: 'center', paddingHorizontal: Spacing.lg },
  timerText: { fontSize: 52, fontWeight: Typography.weights.heavy, letterSpacing: 2 },
  completedLabel: { fontSize: Typography.sizes.sm, color: Colors.success, textAlign: 'center', marginTop: Spacing.sm },
  runningLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.sm },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    gap: Spacing.xl,
  },
  resetBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    overflow: 'hidden',
    borderWidth: 2,
  },
  playBtnGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  doneBtn: {
    marginHorizontal: Spacing.xl,
    marginBottom: 60,
    paddingVertical: Spacing.base,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  doneBtnText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
});
