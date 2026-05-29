import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { Colors, Typography, Spacing, Radii } from '../theme';

const goals = [
  { id: 'procrastination', label: 'Stop procrastinating', icon: 'timer-outline' },
  { id: 'discipline', label: 'Build discipline', icon: 'barbell-outline' },
  { id: 'distractions', label: 'Reduce distractions', icon: 'notifications-off-outline' },
  { id: 'routine', label: 'Create a routine', icon: 'calendar-outline' },
  { id: 'control', label: 'Feel in control again', icon: 'compass-outline' },
];

export default function GoalSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleContinue = async () => {
    if (selected.length === 0) {
      Alert.alert('Select at least one goal', 'Choose what you want to work on first.');
      return;
    }
    await setItem(StorageKeys.USER_GOALS, selected);
    router.replace('/notification-setup');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>What do you want to{'\n'}improve first?</Text>
          <Text style={styles.subtitle}>Select all that apply</Text>
        </View>

        <View style={styles.goals}>
          {goals.map(goal => {
            const isSelected = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                onPress={() => toggle(goal.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.goalIcon, isSelected && styles.goalIconSelected]}>
                  <Ionicons name={goal.icon as any} size={22} color={isSelected ? Colors.background : Colors.textSecondary} />
                </View>
                <Text style={[styles.goalLabel, isSelected && styles.goalLabelSelected]}>{goal.label}</Text>
                {isSelected && (
                  <View style={styles.check}>
                    <Ionicons name="checkmark" size={16} color={Colors.background} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleContinue} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.ctaGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.ctaText}>Continue</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.background} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.xl, paddingTop: 80, paddingBottom: 120 },
  header: { marginBottom: Spacing.xxl },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    lineHeight: 40,
    marginBottom: Spacing.sm,
  },
  subtitle: { fontSize: Typography.sizes.md, color: Colors.textSecondary },
  goals: { gap: Spacing.md },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  goalCardSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentDim,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconSelected: { backgroundColor: Colors.accent },
  goalLabel: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  goalLabelSelected: { color: Colors.textPrimary },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 48,
    paddingTop: Spacing.base,
    backgroundColor: Colors.background,
  },
  ctaButton: { borderRadius: Radii.full, overflow: 'hidden' },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
  },
  ctaText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.background },
});
