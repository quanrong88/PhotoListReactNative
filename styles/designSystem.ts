import { Platform } from 'react-native';

export const colors = {
  primary: {
    50: '#F8FAFC',
    100: '#F1F5F9', 
    500: '#6366F1',
    600: '#5B5BF6',
    700: '#4F46E5',
    900: '#312E81',
  },
  secondary: {
    500: '#8B5CF6',
    600: '#7C3AED', 
    700: '#6D28D9',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B', 
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  success: {
    500: '#10B981',
    600: '#059669',
  },
  warning: {
    500: '#F59E0B',
    600: '#D97706',
  },
  error: {
    500: '#EF4444', 
    600: '#DC2626',
  },
  background: {
    card: '#FFFFFF',
    secondary: '#F8FAFC',
  },
};

export const typography = {
  fontFamily: {
    primary: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28, 
    xl: 28,
    '2xl': 32,
    '3xl': 36,
  },
  fontWeight: {
    normal: '400',
    medium: '500', 
    semibold: '600',
    bold: '700',
  } as const,
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const borderRadius = {
  none: 0,
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
};

export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      borderRadius: borderRadius.lg,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
    },
    secondary: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.neutral[200],
      borderWidth: 1,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
    },
  },
  card: {
    default: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius['2xl'],
      padding: spacing[6],
      borderWidth: 1,
      borderColor: colors.neutral[200],
      ...shadows.default,
    },
  },
  searchInput: {
    default: {
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[200],
      borderWidth: 1,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      fontSize: typography.fontSize.sm,
    },
  },
};

export const gradients = Platform.select({
  web: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
    statusBar: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
  },
  default: null,
});

export default {
  colors,
  typography, 
  spacing,
  borderRadius,
  shadows,
  components,
  gradients,
};