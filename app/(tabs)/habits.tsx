import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../../hooks/useHabits';
import { Colors, Typography, Spacing, Radii } from '../../theme';

export default function HabitsScreen() {
  const { habits, todayCompleted, completionRate, toggleHabit } = useHabits();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#152038', Colors.background]} style={styles.header}>
          <Text style={styles.headerTitle}>Habits</Text>
          <Text style={styles.headerSub}>Build your daily system</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Today's Progress</Text>
              <Text style={styles.progressPercent}>{Math.round(completionRate)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[Colors.accent, Colors.accentLight]}
                style={[styles.progressFill, { width: `${completionRate}%` as any }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressCount}>
              {todayCompleted.length} of {habits.length} completed
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Habits</Text>
          {habits.map(habit => {
            const done = todayCompleted.includes(habit.id);
            return (
              <TouchableOpacity
                key={habit.id}
                style={[styles.habitRow, done && styles.habitRowDone]}
                onPress={() => toggleHabit(habit.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.habitIcon, done && styles.habitIconDone]}>
                  <Ionicons
                    name={habit.icon as any}
                    size={20}
                    color={done ? Colors.background : Colors.textSecondary}
                  />
                </View>
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitName, done && styles.habitNameDone]}>{habit.name}</Text>
                </View>
                <View style={[styles.toggle, done && styles.toggleDone]}>
                  {done && <Ionicons name="checkmark" size={16} color={Colors.background} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xxl },
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.xl },
  headerTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  headerSub: { fontSize: Typography.sizes.md, color: Colors.textSecondary, marginBottom: Spacing.lg },
  progressContainer: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  progressLabel: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, fontWeight: Typography.weights.medium },
  progressPercent: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.heavy, color: Colors.accent },
  progressBar: {
    height: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: { height: '100%', borderRadius: Radii.full },
  progressCount: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  section: { paddingHorizontal: Spacing.xl, marginTop: Spacing.lg },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  habitRowDone: {
    borderColor: Colors.success,
    backgroundColor: Colors.successDim,
  },
  habitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitIconDone: { backgroundColor: Colors.success },
  habitInfo: { flex: 1 },
  habitName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  habitNameDone: { color: Colors.textPrimary, textDecorationLine: 'line-through' },
  toggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleDone: { backgroundColor: Colors.success, borderColor: Colors.success },
});
