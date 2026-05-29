import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { setItem, StorageKeys } from '../hooks/useStorage';
import { Colors, Typography, Spacing, Radii } from '../theme';

const options = [
  { id: 'morning', label: 'Morning', sublabel: '7:00 AM', icon: 'sunny-outline', gradient: ['#C9A84C', '#F0C040'] as const },
  { id: 'afternoon', label: 'Afternoon', sublabel: '12:00 PM', icon: 'partly-sunny-outline', gradient: ['#4A90D9', '#6BB0F0'] as const },
  { id: 'evening', label: 'Evening', sublabel: '8:00 PM', icon: 'moon-outline', gradient: ['#7B68EE', '#9B8EF0'] as const },
];

export default function NotificationSetup() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('morning');

  const handleContinue = async () => {
    await Promise.all([
      setItem(StorageKeys.NOTIFICATION_TIME, selected),
      setItem(StorageKeys.ONBOARDING_DONE, true),
    ]);
    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>When should we send{'\n'}your daily reset?</Text>
          <Text style={styles.subtitle}>We'll remind you at the best time for your routine</Text>
        </View>

        <View style={styles.options}>
          {options.map(opt => {
            const isSelected = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isSelected ? opt.gradient : ['transparent', 'transparent']}
                  style={styles.optionIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons
                    name={opt.icon as any}
                    size={28}
                    color={isSelected ? Colors.background : Colors.textSecondary}
                  />
                </LinearGradient>
                <View style={styles.optionText}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>{opt.label}</Text>
                  <Text style={styles.optionSublabel}>{opt.sublabel}</Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleContinue} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.ctaGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.ctaText}>Start My Reset</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.background} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: 80 },
  header: { marginBottom: Spacing.xxl },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    lineHeight: 40,
    marginBottom: Spacing.sm,
  },
  subtitle: { fontSize: Typography.sizes.md, color: Colors.textSecondary },
  options: { gap: Spacing.md },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  optionSelected: { borderColor: Colors.accent },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
  },
  optionText: { flex: 1 },
  optionLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  optionLabelSelected: { color: Colors.textPrimary },
  optionSublabel: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginTop: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.accent },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 48,
    paddingTop: Spacing.base,
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
