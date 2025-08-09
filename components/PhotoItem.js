import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../styles/designSystem';

const PhotoItem = ({ title, thumbnailUrl }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesome name="chevron-right" size={16} color={colors.neutral[400]} />
        </View>
      </View>

      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  container: {
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
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[900],
    lineHeight: typography.lineHeight.base,
    fontFamily: typography.fontFamily.primary,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  separator: {
    height: 0,
  },
});

export default PhotoItem;
