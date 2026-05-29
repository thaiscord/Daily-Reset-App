import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProgress } from '../hooks/useProgress';
import { Colors, Typography, Spacing, Radii, Shadows } from '../theme';

const benefits = [
  { icon: 'calendar', label: '365 Daily Resets' },
  { icon: 'flash', label: 'Daily actions & guidance' },
  { icon: 'checkmark-circle', label: 'Habit tracker' },
  { icon: 'timer', label: 'Focus timer' },
  { icon: 'stats-chart', label: 'Progress dashboard' },
  { icon: 'bulb', label: 'Mindset library' },
  { icon: 'flame', label: 'Streak tracking' },
  { icon: 'notifications', label: 'Daily reminders' },
];

const plans = [
  {
    id: 'annual',
    label: 'Annual',
    price: '$29.99',
    perMonth: '$2.50/mo',
    badge: 'BEST VALUE',
    saving: 'Save 50%',
    isPopular: true,
  },
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$4.99',
    perMonth: 'per month',
    badge: null,
    saving: null,
    isPopular: false,
  },
];

export default function PaywallScreen() {
  const router = useRouter();
  const { unlockPremium } = useProgress();
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    await unlockPremium();
    setLoading(false);
    Alert.alert(
      'Welcome to Premium!',
      'Your full 365-day reset journey is now unlocked.',
      [{ text: 'Start My Journey', onPress: () => router.replace('/(tabs)/today') }]
    );
  };

  const handleSkip = () => {
    router.replace('/(tabs)/today');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#060E1E', Colors.background, '#152038']} style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="star" size={44} color={Colors.accent} />
          </View>
          <Text style={styles.heroTitle}>Unlock Your Full{'\n'}Reset Journey</Text>
          <Text style={styles.heroSub}>
            Get access to 365 daily resets, focus tools, habit tracking and progress insights designed to help you rebuild discipline one day at a time.
          </Text>
        </LinearGradient>

        <View style={styles.benefits}>
          {benefits.map(b => (
            <View key={b.label} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Ionicons name={b.icon as any} size={18} color={Colors.accent} />
              </View>
              <Text style={styles.benefitLabel}>{b.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          {plans.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, selectedPlan === plan.id && styles.planCardSelected]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.85}
            >
              {plan.badge && (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{plan.badge}</Text>
                </View>
              )}
              <View style={styles.planContent}>
                <View style={styles.planLeft}>
                  <View style={[styles.radio, selectedPlan === plan.id && styles.radioSelected]}>
                    {selectedPlan === plan.id && <View style={styles.radioInner} />}
                  </View>
                  <View>
                    <Text style={[styles.planLabel, selectedPlan === plan.id && styles.planLabelSelected]}>{plan.label}</Text>
                    {plan.saving && <Text style={styles.planSaving}>{plan.saving}</Text>}
                  </View>
                </View>
                <View style={styles.planRight}>
                  <Text style={[styles.planPrice, selectedPlan === plan.id && styles.planPriceSelected]}>{plan.price}</Text>
                  <Text style={styles.planPerMonth}>{plan.perMonth}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.disclaimer}>
          Cancel anytime. Secure payment via App Store / Google Play.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleSubscribe}
          activeOpacity={0.85}
          disabled={loading}
        >
          <LinearGradient
            colors={[Colors.accent, Colors.accentLight]}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <Text style={styles.ctaText}>Processing...</Text>
            ) : (
              <>
                <Ionicons name="star" size={20} color={Colors.background} />
                <Text style={styles.ctaText}>Start My Reset Journey</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Continue with limited free access</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 160 },
  hero: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 80,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  heroIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
  },
  heroTitle: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: Spacing.md,
  },
  heroSub: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  benefits: {
    marginHorizontal: Spacing.xl,
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    marginTop: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, color: Colors.textPrimary },
  plans: { paddingHorizontal: Spacing.xl, marginTop: Spacing.lg, gap: Spacing.md },
  planCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'visible',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentDim,
  },
  planBadge: {
    position: 'absolute',
    top: -12,
    left: Spacing.base,
    backgroundColor: Colors.accent,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 3,
  },
  planBadgeText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.heavy, color: Colors.background },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    paddingTop: Spacing.lg,
  },
  planLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
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
  planLabel: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.textSecondary },
  planLabelSelected: { color: Colors.textPrimary },
  planSaving: { fontSize: Typography.sizes.xs, color: Colors.success, fontWeight: Typography.weights.medium },
  planRight: { alignItems: 'flex-end' },
  planPrice: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy, color: Colors.textSecondary },
  planPriceSelected: { color: Colors.accent },
  planPerMonth: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  disclaimer: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    lineHeight: 18,
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
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
    gap: Spacing.md,
  },
  ctaButton: { width: '100%', borderRadius: Radii.full, overflow: 'hidden', ...Shadows.accent },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
  },
  ctaText: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.background },
  skipButton: { padding: Spacing.sm },
  skipText: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textDecorationLine: 'underline' },
});
