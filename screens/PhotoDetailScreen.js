import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getPhotoItem } from '../api/apiService';

const PhotoDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const result = await getPhotoItem(id);
        setPhoto(result);
      } catch (error) {
        console.error('Failed to load photo detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (!photo) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Photo not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: photo.url }}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{photo.title}</Text>
      </View>

      {/* Optional: You can add more details here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    aspectRatio: 1.5, // 🖼️ Maintain aspect ratio
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center', // Ensures child (Text) is centered horizontally
   },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default PhotoDetailScreen;
