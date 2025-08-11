import React, { useEffect, useCallback, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, searchPhotosAsync } from '../store/slices/photosSlice';
import PhotoItem from '../components/PhotoItem';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../styles/designSystem';
import commonStyles from '../styles/commonStyles';

const PhotoListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: photos, status, page, hasMore } = useSelector((state) => state.photos);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initial load
    dispatch(fetchPhotos({ page: 0, reset: true }));
  }, [dispatch]);

  const handleSearch = useCallback(
    debounce((text) => {
      if (text.trim() === '') {
        dispatch(fetchPhotos({ page: 0, reset: true }));
      } else {
        dispatch(searchPhotosAsync(text));
      }
    }, 400),
    [dispatch]
  );

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      dispatch(fetchPhotos({ page }));
    }
  };

  const renderFooter = () =>
    status === 'loading' ? <ActivityIndicator style={commonStyles.loader} color={colors.primary[500]} /> : null;

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
            onChangeText={(text) => {
              setSearchTerm(text);
              handleSearch(text);
            }}
            value={searchTerm}
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
