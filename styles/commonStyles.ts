import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from './designSystem';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background.card,
    paddingTop: Platform.select({
      ios: 44,
      android: 0,
      web: 0,
    }),
  },

  header: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    fontFamily: typography.fontFamily.primary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    marginBottom: spacing[4],
  },

  searchIcon: {
    marginRight: spacing[2],
  },

  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
    fontFamily: typography.fontFamily.primary,
  },

  photoItemWrapper: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },

  photoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral[200],
  },

  textContainer: {
    flex: 1,
  },

  photoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
    lineHeight: typography.lineHeight.base,
    fontFamily: typography.fontFamily.primary,
  },

  chevron: {
    color: colors.neutral[400],
  },

  loader: {
    padding: spacing[4],
  },

  spinner: {
    color: colors.primary[500],
  },

  cardContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[6],
    marginBottom: spacing[6],
    ...shadows.md,
  },

  photoImage: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral[50],
  },

  photoDetailTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
    lineHeight: typography.lineHeight.lg,
    textAlign: 'center',
    fontFamily: typography.fontFamily.primary,
  },

  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    marginTop: spacing[4],
  },

  metaItem: {
    alignItems: 'center',
    gap: spacing[1],
  },

  metaLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    fontWeight: typography.fontWeight.medium,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily.primary,
  },

  metaValue: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[900],
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.primary,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },

  actionButtonPrimary: {
    flex: 1,
    backgroundColor: colors.primary[500],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },

  actionButtonSecondary: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[300],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },

  actionButtonPrimaryText: {
    color: colors.background.card,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.primary,
  },

  actionButtonSecondaryText: {
    color: colors.neutral[700],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.primary,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },

  errorText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.error[500],
    textAlign: 'center',
    fontFamily: typography.fontFamily.primary,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },

  // Web-specific styles
  webContainer: Platform.select({
    web: {
      maxWidth: 1024,
      marginHorizontal: 'auto',
      padding: spacing[8],
      minHeight: '100vh',
    },
    default: {},
  }),

  webHeader: Platform.select({
    web: {
      textAlign: 'center',
      marginBottom: spacing[12],
      color: colors.background.card,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    default: {},
  }),

  webSearchSection: Platform.select({
    web: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius['2xl'],
      padding: spacing[8],
      marginBottom: spacing[8],
      ...shadows.lg,
    },
    default: {},
  }),

  webPhotoGrid: Platform.select({
    web: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[6],
      justifyContent: 'space-between',
    },
    default: {},
  }),

  webPhotoCard: Platform.select({
    web: {
      width: '48%',
      minWidth: 300,
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.neutral[200],
      ...shadows.default,
    },
    default: {},
  }),
});

export default commonStyles;