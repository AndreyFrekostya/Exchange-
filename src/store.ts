import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import GraphicModeReducer from './modules/MenuSettings/slices/GraphicModeSlice';
import GraphicReducer from './pages/MainPage/slices/GraphicSlice';
import DistanceReducer from './modules/MenuSettings/slices/DistanceSetSlice';
import DrawigReducer from './modules/MenuSettings/slices/DrawigSetSlice';
import PresetReducer from './modules/MenuSettings/slices/PresetSlice';
import GraphicRememberLastModeReducer from './modules/MenuSettings/slices/GraphicRememberLastMode';

const rootReducer = combineReducers({
    modeGraphic: GraphicModeReducer,
    graphics: GraphicReducer,
    distance: DistanceReducer,
    drawing: DrawigReducer, 
    preset: PresetReducer,
    lastMode: GraphicRememberLastModeReducer
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist:['']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;