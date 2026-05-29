import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useProgress } from '../../hooks/useProgress';
import { useHabits } from '../../hooks/useHabits';
import { Colors, Typography, Spacing, Radii } from '../../theme';

function CircularProgress({ size, strokeWidth, progress, color }: {
  size: number; strokeWidth: number; progress: number; color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={Colors.backgroundSecondary}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

export default function ProgressScreen() {
  const { progress, weeklyScore, monthlyScore } = useProgress();
  const { completionRate } = useHabits();

  const dailyProgress = Math.round(completionRate);
  const completedTotal = progress.completedDays.length;
  const overallProgress = Math.round((completedTotal / 365) * 100);

  const stats = [
    { label: 'Current Streak', value: progress.streak, icon: 'flame', color: Colors.streak, suffix: 'days' },
    { label: 'Best Streak', value: progress.bestStreak, icon: 'trophy', color: Colors.accent, suffix: 'days' },
    { label: 'Days Completed', value: completedTotal, icon: 'checkmark-circle', color: Colors.success, suffix: '' },
    { label: 'Weekly Score', value: weeklyScore, icon: 'calendar', color: '#4A90D9', suffix: '/7' },
    { label: 'Monthly Score', value: monthlyScore, icon: 'stats-chart', color: '#7B68EE', suffix: 'days' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#152038', Colors.background]} style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
          <Text style={styles.headerSub}>Your consistency, visualized</Text>
        </LinearGradient>

        <View style={styles.circleSection}>
          <View style={styles.circleWrapper}>
            <CircularProgress size={180} strokeWidth={12} progress={overallProgress} color={Colors.accent} />
            <View style={styles.circleCenter}>
              <Text style={styles.circleValue}>{overallProgress}%</Text>
              <Text style={styles.circleLabel}>Journey</Text>
            </View>
          </View>

          <View style={styles.circleSmallWrapper}>
            <View style={styles.circleSmall}>
              <CircularProgress size={100} strokeWidth={8} progress={dailyProgress} color={Colors.success} />
              <View style={styles.circleCenterSmall}>
                <Text style={styles.circleValueSmall}>{dailyProgress}%</Text>
                <Text style={styles.circleLabelSmall}>Today</Text>
              </View>
            </View>
            <View style={styles.circleSmall}>
              <CircularProgress size={100} strokeWidth={8} progress={Math.round((weeklyScore / 7) * 100)} color='#4A90D9' />
              <View style={styles.circleCenterSmall}>
                <Text style={styles.circleValueSmall}>{weeklyScore}/7</Text>
                <Text style={styles.circleLabelSmall}>Week</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={22} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}{stat.suffix}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.journeySection}>
          <Text style={styles.sectionTitle}>365-Day Journey</Text>
          <Text style={styles.journeyStatus}>
            Day {progress.currentDay} of 365 — {365 - progress.currentDay} days remaining
          </Text>
          <View style={styles.journeyBar}>
            <LinearGradient
              colors={[Colors.accent, Colors.accentLight]}
              style={[styles.journeyFill, { width: `${overallProgress}%` as any }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
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
  headerSub: { fontSize: Typography.sizes.md, color: Colors.textSecondary },
  circleSection: { alignItems: 'center', paddingVertical: Spacing.xl, paddingHorizontal: Spacing.xl },
  circleWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl },
  circleCenter: { position: 'absolute', alignItems: 'center' },
  circleValue: { fontSize: Typography.sizes.xxxl, fontWeight: Typography.weights.heavy, color: Colors.accent },
  circleLabel: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
  circleSmallWrapper: { flexDirection: 'row', gap: Spacing.xl },
  circleSmall: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  circleCenterSmall: { position: 'absolute', alignItems: 'center' },
  circleValueSmall: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.heavy, color: Colors.textPrimary },
  circleLabelSmall: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    width: '47%',
    gap: Spacing.sm,
  },
  statIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy, color: Colors.textPrimary },
  statLabel: { fontSize: Typography.sizes.xs, color: Colors.textSecondary, textAlign: 'center' },
  journeySection: { paddingHorizontal: Spacing.xl },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  journeyStatus: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, marginBottom: Spacing.md },
  journeyBar: {
    height: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radii.full,
    overflow: 'hidden',
  },
  journeyFill: { height: '100%', borderRadius: Radii.full },
});
