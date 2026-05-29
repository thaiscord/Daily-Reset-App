import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getItem, setItem, removeItem, StorageKeys } from '../../hooks/useStorage';
import { useProgress } from '../../hooks/useProgress';
import { Colors, Typography, Spacing, Radii } from '../../theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { progress, unlockPremium } = useProgress();
  const [name, setName] = useState('');
  const [notifTime, setNotifTime] = useState('morning');
  const [goals, setGoals] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const [n, t, g] = await Promise.all([
        getItem<string>(StorageKeys.USER_NAME, ''),
        getItem<string>(StorageKeys.NOTIFICATION_TIME, 'morning'),
        getItem<string[]>(StorageKeys.USER_GOALS, []),
      ]);
      setName(n); setNotifTime(t); setGoals(g);
    })();
  }, []);

  const saveName = async () => {
    await setItem(StorageKeys.USER_NAME, name);
    setEditing(false);
  };

  const handleRestorePurchase = () => {
    Alert.alert('Restore Purchase', 'No previous purchase found to restore.');
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will delete all your progress. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset', style: 'destructive', onPress: async () => {
            await Promise.all([
              removeItem(StorageKeys.ONBOARDING_DONE),
              removeItem(StorageKeys.COMPLETED_DAYS),
              removeItem(StorageKeys.STREAK),
              removeItem(StorageKeys.BEST_STREAK),
              removeItem(StorageKeys.CURRENT_DAY),
              removeItem(StorageKeys.IS_PREMIUM),
            ]);
            router.replace('/splash');
          }
        },
      ]
    );
  };

  const rows: { icon: string; label: string; value?: string; onPress?: () => void; isDestructive?: boolean }[] = [
    { icon: 'notifications-outline', label: 'Notification Time', value: notifTime.charAt(0).toUpperCase() + notifTime.slice(1) },
    { icon: 'language-outline', label: 'Language', value: 'English' },
    { icon: 'refresh-outline', label: 'Restore Purchase', onPress: handleRestorePurchase },
    { icon: 'document-text-outline', label: 'Privacy Policy' },
    { icon: 'reader-outline', label: 'Terms of Service' },
    { icon: 'trash-outline', label: 'Reset App', onPress: handleResetApp, isDestructive: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#152038', Colors.background]} style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.avatar}>
              <Ionicons name="person" size={36} color={Colors.background} />
            </LinearGradient>
            {editing ? (
              <View style={styles.nameEditRow}>
                <TextInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor={Colors.textMuted}
                  autoFocus
                />
                <TouchableOpacity onPress={saveName} style={styles.saveBtn}>
                  <Ionicons name="checkmark" size={20} color={Colors.accent} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setEditing(true)} style={styles.nameRow}>
                <Text style={styles.name}>{name || 'Set your name'}</Text>
                <Ionicons name="pencil-outline" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {progress.isPremium ? (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={14} color={Colors.background} />
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.upgradeButton} onPress={() => router.push('/paywall')} activeOpacity={0.85}>
              <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.upgradeGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Ionicons name="star-outline" size={16} color={Colors.background} />
                <Text style={styles.upgradeText}>Access the Full Experience</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {goals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            <View style={styles.goalsRow}>
              {goals.map(g => (
                <View key={g} style={styles.goalChip}>
                  <Text style={styles.goalChipText}>{g.replace('-', ' ')}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {rows.map(row => (
            <TouchableOpacity
              key={row.label}
              style={styles.row}
              onPress={row.onPress}
              activeOpacity={row.onPress ? 0.7 : 1}
            >
              <View style={[styles.rowIcon, row.isDestructive && styles.rowIconDanger]}>
                <Ionicons name={row.icon as any} size={18} color={row.isDestructive ? Colors.danger : Colors.textSecondary} />
              </View>
              <Text style={[styles.rowLabel, row.isDestructive && styles.rowLabelDanger]}>{row.label}</Text>
              {row.value && <Text style={styles.rowValue}>{row.value}</Text>}
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>Daily Reset v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 60 },
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.xl, alignItems: 'center' },
  avatarContainer: { alignItems: 'center', marginBottom: Spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  name: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
  nameEditRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  nameInput: {
    fontSize: Typography.sizes.xl,
    color: Colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    minWidth: 160,
    paddingVertical: 4,
  },
  saveBtn: { padding: Spacing.sm },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radii.full,
  },
  premiumBadgeText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.heavy, color: Colors.background, letterSpacing: 1 },
  upgradeButton: { width: '100%', borderRadius: Radii.full, overflow: 'hidden' },
  upgradeGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md, gap: Spacing.sm },
  upgradeText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.background },
  section: { paddingHorizontal: Spacing.xl, marginTop: Spacing.xl },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  goalsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  goalChip: { backgroundColor: Colors.accentDim, borderRadius: Radii.full, paddingHorizontal: Spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: Colors.accent },
  goalChipText: { fontSize: Typography.sizes.xs, color: Colors.accent, fontWeight: Typography.weights.medium, textTransform: 'capitalize' },
  row: {
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
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconDanger: { backgroundColor: 'rgba(244,67,54,0.1)' },
  rowLabel: { flex: 1, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textPrimary },
  rowLabelDanger: { color: Colors.danger },
  rowValue: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
  version: { textAlign: 'center', fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: Spacing.xxl },
});
