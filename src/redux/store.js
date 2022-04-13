import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/auth/authSlice';
import directoryReducer from './features/directory/directorySlice';
import shopReducer from './features/shop/shopSlice';
import favoriteReducer from './features/favorite/favoriteSlice';
import cartReducer from './features/cart/cartSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'favorite'],
};

const reducers = combineReducers({
  user: authReducer,
  directory: directoryReducer,
  shop: shopReducer,
  favorite: favoriteReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
