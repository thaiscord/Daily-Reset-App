import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
      ]),
      Animated.delay(400),
      Animated.timing(subtitleFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.delay(1200),
    ]).start(() => {
      router.replace('/onboarding');
    });
  }, []);

  return (
    <LinearGradient colors={['#060E1E', Colors.background, '#152038']} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <SunriseIcon />
        <Text style={styles.title}>DAILY RESET</Text>
      </Animated.View>
      <Animated.Text style={[styles.subtitle, { opacity: subtitleFade }]}>
        Refocus. Realign. Rebuild.
      </Animated.Text>
    </LinearGradient>
  );
}

function SunriseIcon() {
  return (
    <View style={styles.iconWrapper}>
      <View style={styles.horizon} />
      <View style={styles.sun} />
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180);
        const r = 104;
        const x = 80 + r * Math.cos(angle);
        const y = 80 + r * Math.sin(angle);
        const rayLen = i % 2 === 0 ? 28 : 16;
        const ex = 80 + (r + rayLen) * Math.cos(angle);
        const ey = 80 + (r + rayLen) * Math.sin(angle);
        if (y > 82) return null;
        return (
          <View
            key={i}
            style={[
              styles.ray,
              {
                left: x - 1,
                top: y - 1,
                width: Math.sqrt((ex - x) ** 2 + (ey - y) ** 2),
                transform: [{ rotate: `${i * 45 - 90}deg` }],
                transformOrigin: 'left center',
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconWrapper: {
    width: 160,
    height: 160,
    position: 'relative',
    marginBottom: Spacing.md,
  },
  sun: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accentLight,
    left: 52,
    top: 52,
    shadowColor: Colors.accentLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 32,
    elevation: 24,
  },
  horizon: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    opacity: 0.8,
  },
  ray: {
    position: 'absolute',
    height: 2,
    backgroundColor: Colors.accentLight,
    borderRadius: 2,
    opacity: 0.7,
  },
  title: {
    fontSize: 58,
    fontWeight: Typography.weights.heavy,
    color: Colors.accent,
    letterSpacing: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
