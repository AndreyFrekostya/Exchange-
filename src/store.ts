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
import { CoinApi } from './pages/MainPage/api/CoinApi';
import CoinReducer from './modules/MenuSettings/slices/CoinSlice';
import AllCoinsReducer from './pages/MainPage/slices/AllCoinsSlice';
import CoinChoosedListReducer from './pages/MainPage/slices/CoinChoosedListSlice';
import { CoinInListApi } from './pages/MainPage/api/CoinInListApi';
import AllCoinsInListReducer from './pages/MainPage/slices/AllCoinsInListSlice';
import { klinesSymbolApi } from './modules/Graphics/api/KlinesSymbolApi';
const rootReducer = combineReducers({
    modeGraphic: GraphicModeReducer,
    graphics: GraphicReducer,
    distance: DistanceReducer,
    drawing: DrawigReducer, 
    preset: PresetReducer,
    coin: CoinReducer,
    lastMode: GraphicRememberLastModeReducer,
    coins: AllCoinsReducer,
    coinInList: CoinChoosedListReducer,
    [CoinApi.reducerPath]:CoinApi.reducer,
    [CoinInListApi.reducerPath]:CoinInListApi.reducer,
    coinsInListInGraphics:AllCoinsInListReducer,
    [klinesSymbolApi.reducerPath]:klinesSymbolApi.reducer
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist:[CoinApi.reducerPath, 'coins', CoinInListApi.reducerPath,'coinsInListInGraphics','coinInList',klinesSymbolApi.reducerPath]
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>(
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false,
    })).concat(CoinApi.middleware).concat(CoinInListApi.middleware).concat(klinesSymbolApi.middleware)
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;