export const Colors = {
  background: '#0B1426',
  backgroundSecondary: '#152038',
  card: '#1C2D4A',
  cardLight: '#243550',
  accent: '#C9A84C',
  accentLight: '#F0C040',
  accentDim: 'rgba(201,168,76,0.15)',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#8A9BBE',
  textMuted: '#4A5A7A',
  success: '#4CAF50',
  successDim: 'rgba(76,175,80,0.15)',
  danger: '#F44336',
  streak: '#FFD700',
  border: 'rgba(255,255,255,0.08)',
  overlay: 'rgba(11,20,38,0.92)',
};

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    base: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    xxxl: 38,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  accent: {
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
};
