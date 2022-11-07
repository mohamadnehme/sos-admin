import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const userPersistedReducer = persistReducer(persistConfig, userReducer);
// const loadingPersistedReducer = persistReducer(persistConfig, loadingReducer);

export const store = configureStore({
  reducer: {
    userSlice: userPersistedReducer,
    // loadingSlice: loadingPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
