import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './slices/photosSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {photos: PhotosState}
export type AppDispatch = typeof store.dispatch;