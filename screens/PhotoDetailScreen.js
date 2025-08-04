import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { getPhotoItem } from '../api/apiService';

const PhotoDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhoto();
  }, []);

  const loadPhoto = async () => {
    try {
      const data = await getPhotoItem(id);
      setPhoto(data);
    } catch (err) {
      console.error('Failed to load photo details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!photo) return <Text>Error loading photo.</Text>;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Image source={{ uri: photo.url }} style={{ width: '100%', height: 300 }} />
      <Text style={{ marginTop: 20 }}>{photo.title}</Text>
    </View>
  );
};

export default PhotoDetailScreen;
