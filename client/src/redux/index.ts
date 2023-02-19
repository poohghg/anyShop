import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import stateReducer from "./stateReducer";
import userReducer from "./userReducer";
import localReducer from "./localReducer";

// config 작성
const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  // whiteList:[]
  // 제외할 리듀서
  blacklist: ["userReducer", "stateReducer"],
};

const rootReducer = combineReducers({
  stateReducer,
  userReducer,
  localReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export const persistor = persistStore(store); // persist store 내보내기
// 타입스크립트 타입관련
// https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; //
