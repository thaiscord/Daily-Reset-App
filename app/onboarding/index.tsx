import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  FlatList, Animated, ViewToken,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../../theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    headline: 'Take back control of your life — one action per day.',
    subheadline: 'Daily Reset helps you stop procrastinating, rebuild discipline and create real progress.',
    cta: 'Start My Reset',
    icon: 'sunny' as const,
    gradient: ['#0B1426', '#152038'] as const,
  },
  {
    id: '2',
    headline: 'Stop procrastinating.\nStart moving again.',
    subheadline: "Every day you'll receive one simple action to rebuild focus and momentum.",
    cta: 'Continue',
    icon: 'flash' as const,
    gradient: ['#0B1426', '#1a2844'] as const,
  },
  {
    id: '3',
    headline: 'Small steps.\nReal progress.',
    subheadline: "You don't need to change everything today. You just need to complete today's reset.",
    cta: 'Begin Today',
    icon: 'rocket' as const,
    gradient: ['#0B1426', '#152038'] as const,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index ?? 0);
  }).current;

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      router.replace('/goal-selection');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <LinearGradient colors={item.gradient} style={styles.slide}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={80} color={Colors.accent} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headline}>{item.headline}</Text>
              <Text style={styles.subheadline}>{item.subheadline}</Text>
            </View>
          </LinearGradient>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({ inputRange, outputRange: [8, 24, 8], extrapolate: 'clamp' });
            const opacity = scrollX.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });
            return (
              <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />
            );
          })}
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={handleNext} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.accent, Colors.accentLight]} style={styles.ctaGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.ctaText}>{slides[activeIndex].cta}</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.background} />
          </LinearGradient>
        </TouchableOpacity>

        {activeIndex < slides.length - 1 && (
          <TouchableOpacity onPress={() => router.replace('/goal-selection')} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: height * 0.1,
    paddingBottom: 160,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.25)',
  },
  textContainer: { alignItems: 'center' },
  headline: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.heavy,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: Spacing.lg,
  },
  subheadline: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 48,
    paddingTop: Spacing.lg,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  dots: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  dot: { height: 8, borderRadius: 4, backgroundColor: Colors.accent },
  ctaButton: { width: '100%', borderRadius: Radii.full, overflow: 'hidden' },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.background,
    letterSpacing: 0.5,
  },
  skipButton: { marginTop: Spacing.md },
  skipText: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
});
