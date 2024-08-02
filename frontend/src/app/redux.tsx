import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import reductorGlobal from "@/estado";
import { api } from "@/estado/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* PERSISTENCIA PARA REDUX */
const creaAlmacenNOOP = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const almacenamiento =
  typeof window === "undefined" ? creaAlmacenNOOP() : createWebStorage("local");

const configPersistencia = {
  key: "root",
  storage: almacenamiento,
  whitelist: ["global"],
};
const reductorRaiz = combineReducers({
  global: reductorGlobal,
  [api.reducerPath]: api.reducer,
});
const reductorConPersistencia = persistReducer(
  configPersistencia,
  reductorRaiz
);

/* REDUX STORE */
export const crearAlmacen = () => {
  return configureStore({
    reducer: reductorConPersistencia,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* TIPOS REDUX */
export type AppStore = ReturnType<typeof crearAlmacen>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVEEDOR */
export default function ProveedorAlmacen({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = crearAlmacen();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
