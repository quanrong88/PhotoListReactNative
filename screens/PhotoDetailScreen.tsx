import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPhotoById } from '../store/slices/photosSlice';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/designSystem';
import { FontAwesome } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { currentPhoto: photo, status } = useAppSelector((state) => state.photos);

  useEffect(() => {
    dispatch(fetchPhotoById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (status === 'failed' || !photo) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-triangle" size={64} color={colors.error[500]} />
        <Text style={styles.errorText}>Photo not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photo.url }}
            style={styles.image as import('react-native').ImageStyle}
            resizeMode="contain"
          />
          <View style={styles.photoContent}>
            <Text style={styles.title}>{photo.title}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Photo ID</Text>
                <Text style={styles.metaValue}>#{photo.id}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Album</Text>
                <Text style={styles.metaValue}>{photo.albumId}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Views</Text>
                <Text style={styles.metaValue}>1.2k</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <FontAwesome name="star" size={20} color={colors.neutral[700]} />
          <Text style={styles.actionButtonSecondaryText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <FontAwesome name="share" size={20} color={colors.background.card} />
          <Text style={styles.actionButtonPrimaryText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  scrollContainer: {
    flex: 1,
    padding: spacing[4],
  },
  photoContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
    marginBottom: spacing[6],
  },
  image: {
    width: '100%',
    aspectRatio: 1.5,
    backgroundColor: colors.neutral[50],
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  photoContent: {
    padding: spacing[6],
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium as '500',
    color: colors.neutral[900],
    lineHeight: typography.lineHeight.lg,
    textAlign: 'center',
    marginBottom: spacing[4],
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
    fontWeight: typography.fontWeight.medium as '500',
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily.primary,
  },
  metaValue: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[900],
    fontWeight: typography.fontWeight.semibold as '600',
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
    fontWeight: typography.fontWeight.semibold as '600',
    fontFamily: typography.fontFamily.primary,
  },
  actionButtonSecondaryText: {
    color: colors.neutral[700],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold as '600',
    fontFamily: typography.fontFamily.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
    padding: spacing[6],
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium as '500',
    color: colors.error[500],
    textAlign: 'center',
    marginTop: spacing[4],
    fontFamily: typography.fontFamily.primary,
  },
});

export default PhotoDetailScreen;