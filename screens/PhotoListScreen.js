import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';
import { getPhotos, searchPhotos } from '../api/apiService';
import PhotoItem from '../components/PhotoItem';
import { FontAwesome } from '@expo/vector-icons';

const PhotoListScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (err) {
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    debounce(async (text) => {
      setSearchTerm(text);
      if (text.trim() === '') {
        loadPhotos(); // reload default list
        return;
      }

      setLoading(true);
      try {
        const results = await searchPhotos(text);
        setPhotos(results);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { id: item.id })}>
      <PhotoItem title={item.title} thumbnailUrl={item.thumbnailUrl} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Photos</Text>
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
        <TextInput
        placeholder="Search photos..."
        onChangeText={handleSearch}
        defaultValue={searchTerm}
        style={styles.searchInput}
      />
        </View>  
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default PhotoListScreen;
