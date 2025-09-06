import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPhotos, searchPhotos, getPhotoItem, Photo } from '../../api/apiService';

const PAGE_SIZE = 10;

interface PhotosState {
  items: Photo[];
  currentPhoto: Photo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}

// Async thunk for fetching a paginated list of photos
export const fetchPhotos = createAsyncThunk<
  { photos: Photo[], page: number, reset: boolean },
  { page: number, reset?: boolean },
  { rejectValue: string }
>(
  'photos/fetchPhotos',
  async ({ page, reset = false }, { rejectWithValue }) => {
    try {
      const start = reset ? 0 : page * PAGE_SIZE;
      const response = await getPhotos(start, PAGE_SIZE);
      return { photos: response, page: reset ? 1 : page + 1, reset };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.toString());
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk for searching photos
export const searchPhotosAsync = createAsyncThunk<
  Photo[],
  string,
  { rejectValue: string }
>(
  'photos/searchPhotos',
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchPhotos(query);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.toString());
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async thunk for fetching a single photo item
export const fetchPhotoById = createAsyncThunk<
  Photo,
  number,
  { rejectValue: string }
>(
  'photos/fetchPhotoById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPhotoItem(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.toString());
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const initialState: PhotosState = {
  items: [],
  currentPhoto: null,
  status: 'idle',
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
        state.error = action.payload ?? null;
      })
      // Reducers for searchPhotosAsync
      .addCase(searchPhotosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPhotosAsync.fulfilled, (state, action: PayloadAction<Photo[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.hasMore = false; // Disable infinite scroll after search
      })
      .addCase(searchPhotosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? null;
      })
      // Reducers for fetchPhotoById
      .addCase(fetchPhotoById.pending, (state) => {
        state.status = 'loading';
        state.currentPhoto = null;
      })
      .addCase(fetchPhotoById.fulfilled, (state, action: PayloadAction<Photo>) => {
        state.status = 'succeeded';
        state.currentPhoto = action.payload;
      })
      .addCase(fetchPhotoById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? null;
      });
  },
});

export default photosSlice.reducer;