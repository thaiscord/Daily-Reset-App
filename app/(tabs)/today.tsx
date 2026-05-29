import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Alert, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { dailyResets } from '../../data/dailyResets';
import { useProgress } from '../../hooks/useProgress';
import FocusTimerModal from '../../components/FocusTimer';
import { Colors, Typography, Spacing, Radii, Shadows } from '../../theme';

const checklist = [
  { id: 'morning', label: 'Morning Routine', icon: 'sunny-outline' },
  { id: 'action', label: "Today's Action", icon: 'flash-outline' },
  { id: 'deepwork', label: 'Deep Work', icon: 'laptop-outline' },
  { id: 'nodistractions', label: 'No Distractions', icon: 'notifications-off-outline' },
  { id: 'evening', label: 'Evening Reflection', icon: 'moon-outline' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function TodayScreen() {
  const router = useRouter();
  const { progress, completeDay } = useProgress();
  const [completed, setCompleted] = useState(false);
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [timerMode, setTimerMode] = useState<'focus' | 'detox' | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const dayData = dailyResets.find(d => d.day === progress.currentDay) ?? dailyResets[0];
  const isFreeDay = progress.currentDay <= 7;
  const canAccess = isFreeDay || progress.isPremium;

  const toggleCheck = (id: string) => {
    setCheckItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleComplete = async () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    const result = await completeDay(progress.currentDay);
    setCompleted(true);

    if (result.isFirstCompletion && progress.completedDays.length === 0) {
      setTimeout(() => router.push('/paywall'), 1500);
    }
  };

  const handleLockedPress = () => {
    router.push('/paywall');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#152038', Colors.background]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.headerTitle}>Take back control{'\n'}of your life.</Text>
              <Text style={styles.headerSub}>One action today can change your day.</Text>
            </View>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={20} color={Colors.streak} />
              <Text style={styles.streakText}>{progress.streak}</Text>
            </View>
          </View>
        </LinearGradient>

        {!canAccess ? (
          <LockedCard day={progress.currentDay} onUnlock={handleLockedPress} />
        ) : completed ? (
          <CompletedCard day={dayData.day} />
        ) : (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <DailyResetCard data={dayData} />
          </Animated.View>
        )}

        {canAccess && !completed && (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete} activeOpacity={0.85}>
            <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.completeGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Ionicons name="checkmark-circle" size={22} color={Colors.background} />
              <Text style={styles.completeText}>Complete Today's Reset</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionBtn} onPress={() => setTimerMode('focus')} activeOpacity={0.8}>
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(201,168,76,0.12)' }]}>
              <Ionicons name="timer-outline" size={20} color={Colors.accent} />
            </View>
            <Text style={styles.quickActionLabel}>Focus Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn} onPress={() => setTimerMode('detox')} activeOpacity={0.8}>
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0,188,212,0.12)' }]}>
              <Ionicons name="phone-portrait-outline" size={20} color="#00BCD4" />
            </View>
            <Text style={styles.quickActionLabel}>Digital Detox</Text>
          </TouchableOpacity>
        </View>

        {timerMode && (
          <FocusTimerModal
            visible={!!timerMode}
            mode={timerMode}
            onClose={() => setTimerMode(null)}
          />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Checklist</Text>
          {checklist.map(item => {
            const done = checkItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.checkItem, done && styles.checkItemDone]}
                onPress={() => toggleCheck(item.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkIcon, done && styles.checkIconDone]}>
                  <Ionicons
                    name={done ? 'checkmark' : item.icon as any}
                    size={18}
                    color={done ? Colors.background : Colors.textSecondary}
                  />
                </View>
                <Text style={[styles.checkLabel, done && styles.checkLabelDone]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function DailyResetCard({ data }: { data: typeof dailyResets[0] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View style={styles.resetCard}>
      <View style={styles.dayBadge}>
        <Text style={styles.dayNumber}>Day {data.day}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColors[data.category] }]}>
          <Text style={styles.categoryText}>{data.category}</Text>
        </View>
      </View>

      <Text style={styles.message}>{data.message}</Text>

      <View style={styles.divider} />

      <CardSection
        icon="flash-outline"
        title="Today's Action"
        content={data.action}
        expanded={expanded === 'action'}
        onToggle={() => setExpanded(expanded === 'action' ? null : 'action')}
      />
      <CardSection
        icon="information-circle-outline"
        title="Why it matters"
        content={data.why}
        expanded={expanded === 'why'}
        onToggle={() => setExpanded(expanded === 'why' ? null : 'why')}
      />
      <CardSection
        icon="chatbubble-outline"
        title="Reflection"
        content={data.reflection}
        expanded={expanded === 'reflection'}
        onToggle={() => setExpanded(expanded === 'reflection' ? null : 'reflection')}
      />
    </View>
  );
}

function CardSection({ icon, title, content, expanded, onToggle }: {
  icon: string; title: string; content: string; expanded: boolean; onToggle: () => void;
}) {
  return (
    <TouchableOpacity style={styles.cardSection} onPress={onToggle} activeOpacity={0.8}>
      <View style={styles.cardSectionHeader}>
        <View style={styles.cardSectionIcon}>
          <Ionicons name={icon as any} size={16} color={Colors.accent} />
        </View>
        <Text style={styles.cardSectionTitle}>{title}</Text>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} />
      </View>
      {expanded && <Text style={styles.cardSectionContent}>{content}</Text>}
    </TouchableOpacity>
  );
}

function CompletedCard({ day }: { day: number }) {
  return (
    <View style={styles.completedCard}>
      <View style={styles.completedIcon}>
        <Ionicons name="checkmark-circle" size={56} color={Colors.success} />
      </View>
      <Text style={styles.completedTitle}>Reset completed.</Text>
      <Text style={styles.completedSub}>You showed up today.</Text>
      <Text style={styles.completedDay}>Day {day} done</Text>
    </View>
  );
}

function LockedCard({ day, onUnlock }: { day: number; onUnlock: () => void }) {
  return (
    <TouchableOpacity style={styles.lockedCard} onPress={onUnlock} activeOpacity={0.85}>
      <View style={styles.lockedIconContainer}>
        <Ionicons name="lock-closed" size={40} color={Colors.accent} />
      </View>
      <Text style={styles.lockedTitle}>Day {day} Locked</Text>
      <Text style={styles.lockedSub}>Unlock your full reset journey to continue your progress.</Text>
      <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.unlockButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.unlockText}>Unlock Full Access</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const categoryColors: Record<string, string> = {
  focus: 'rgba(74,144,217,0.25)',
  discipline: 'rgba(201,168,76,0.25)',
  confidence: 'rgba(123,104,238,0.25)',
  productivity: 'rgba(76,175,80,0.25)',
  emotional: 'rgba(244,67,54,0.25)',
  detox: 'rgba(0,188,212,0.25)',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xxl },
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.xxl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, letterSpacing: 1, marginBottom: Spacing.sm },
  headerTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    lineHeight: 36,
    marginBottom: Spacing.sm,
  },
  headerSub: { fontSize: Typography.sizes.md, color: Colors.textSecondary },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  streakText: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.streak },
  resetCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.base,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  dayBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  dayNumber: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.accent, letterSpacing: 2, textTransform: 'uppercase' },
  categoryBadge: { borderRadius: Radii.full, paddingHorizontal: Spacing.md, paddingVertical: 3 },
  categoryText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.medium, color: Colors.textPrimary, textTransform: 'capitalize' },
  message: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: Spacing.md,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.md },
  cardSection: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cardSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardSectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSectionTitle: { flex: 1, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.textPrimary },
  cardSectionContent: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: Spacing.sm,
    paddingLeft: 40,
  },
  completeButton: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    borderRadius: Radii.full,
    overflow: 'hidden',
    ...Shadows.accent,
  },
  completeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
  },
  completeText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.background },
  section: { marginHorizontal: Spacing.xl, marginTop: Spacing.xl },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkItemDone: { borderColor: Colors.success, backgroundColor: Colors.successDim },
  checkIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconDone: { backgroundColor: Colors.success },
  checkLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textSecondary },
  checkLabelDone: { color: Colors.textPrimary, textDecorationLine: 'line-through' },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, color: Colors.textSecondary },
  completedCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.base,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.successDim,
  },
  completedIcon: { marginBottom: Spacing.lg },
  completedTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  completedSub: { fontSize: Typography.sizes.md, color: Colors.textSecondary, marginBottom: Spacing.sm },
  completedDay: { fontSize: Typography.sizes.sm, color: Colors.accent, fontWeight: Typography.weights.semibold },
  lockedCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.base,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accentDim,
  },
  lockedIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  lockedTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  lockedSub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  unlockButton: {
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  unlockText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.background },
});
