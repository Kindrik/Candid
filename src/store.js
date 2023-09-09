import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './Slices/AppSlice';

export const store = configureStore({
  reducer: {
    AppSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});