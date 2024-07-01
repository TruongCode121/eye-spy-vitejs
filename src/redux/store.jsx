import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import productReducer from "./productSlice";
import adminReducer from "./adminSlice";
import globalReducer from "./globalSlice";
import authReducer from "./authSlice";
// import filterReducer from "./filterSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const reducer = combineReducers({
  accounts: accountReducer,
  products: productReducer,
  admins: adminReducer,
  globals: globalReducer,
  auth: authReducer,
  // filter: filterReducer,
});
// const store = configureStore({
//   reducer,
//   middleware: (gDM) => gDM().concat(logger),
// });

// export default store;
const persistConfig = {
  key: "EYE-SPY-VITEJS",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);
