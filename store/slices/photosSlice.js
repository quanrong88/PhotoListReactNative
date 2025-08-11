
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPhotos, searchPhotos, getPhotoItem } from '../../api/apiService';

const PAGE_SIZE = 10;

// Async thunk for fetching a paginated list of photos
export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async ({ page, reset = false }, { rejectWithValue }) => {
    try {
      const start = reset ? 0 : page * PAGE_SIZE;
      const response = await getPhotos(start, PAGE_SIZE);
      return { photos: response, page: reset ? 1 : page + 1, reset };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for searching photos
export const searchPhotosAsync = createAsyncThunk(
  'photos/searchPhotos',
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchPhotos(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for fetching a single photo item
export const fetchPhotoById = createAsyncThunk(
  'photos/fetchPhotoById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPhotoItem(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  items: [],
  currentPhoto: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  page: 0,
  hasMore: true,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for fetchPhotos
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { photos, page, reset } = action.payload;
        state.items = reset ? photos : [...state.items, ...photos];
        state.page = page;
        state.hasMore = photos.length === PAGE_SIZE;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Reducers for searchPhotosAsync
      .addCase(searchPhotosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPhotosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.hasMore = false; // Disable infinite scroll after search
      })
      .addCase(searchPhotosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Reducers for fetchPhotoById
      .addCase(fetchPhotoById.pending, (state) => {
        state.status = 'loading';
        state.currentPhoto = null;
      })
      .addCase(fetchPhotoById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPhoto = action.payload;
      })
      .addCase(fetchPhotoById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default photosSlice.reducer;
