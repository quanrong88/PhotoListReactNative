import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import debounce from 'lodash.debounce';
import { getPhotos, searchPhotos } from '../api/apiService';
import PhotoItem from '../components/PhotoItem';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/designSystem';
import commonStyles from '../styles/commonStyles';

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
    loading ? <ActivityIndicator style={commonStyles.loader} color={colors.primary[500]} /> : null;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { id: item.id })}>
      <PhotoItem title={item.title} thumbnailUrl={item.thumbnailUrl} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.card} />
      <View style={styles.container}>
        <Text style={styles.header}>Photos</Text>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={16} color={colors.neutral[400]} style={styles.searchIcon} />
          <TextInput
            placeholder="Search photos..."
            placeholderTextColor={colors.neutral[400]}
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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing[3],
    paddingTop: spacing[4],
  },
  header: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[3],
    color: colors.neutral[900],
    fontFamily: typography.fontFamily.primary,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    alignItems: 'center',
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
});

export default PhotoListScreen;
