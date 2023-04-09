import { configureStore } from '@reduxjs/toolkit';
import GraphicModeReducer from './modules/MenuSettings/slices/GraphicModeSlice';
const store = configureStore({
  reducer: {
    modeGraphic: GraphicModeReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;