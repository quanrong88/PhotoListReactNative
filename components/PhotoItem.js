import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
          {/* <FontAwesome name="star" size={20} color="black" style={styles.icon} /> */}
          <FontAwesome name="chevron-right" size={16} color="gray" />
        </View>
      </View>

      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
});

export default PhotoItem;
