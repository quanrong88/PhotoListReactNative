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
import { Platform } from 'react-native';

const PAGE_SIZE = Platform.OS === 'web' ? 50 : 10;

const PhotoListScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async (reset = false) => {
    console.log('Loading photos... reset:', reset);
    setLoading(true);
    try {
      const start = reset ? 0 : page * PAGE_SIZE;

      const result = await getPhotos(start, PAGE_SIZE);
      setPhotos(prev => (reset ? result : [...prev, ...result]));
      setPage(prev => (reset ? 1 : prev + 1));
      setHasMore(result.length === PAGE_SIZE);
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
        loadPhotos(true);
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

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadPhotos();
    }
  };

  const renderFooter = () =>
    loading ? <ActivityIndicator style={styles.loader} /> : null;

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
      
      <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
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
